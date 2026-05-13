package com.priya.foodiesapi.Service;


import com.priya.foodiesapi.entity.OrderEntity;
import com.priya.foodiesapi.io.OrderRequest;
import com.priya.foodiesapi.io.OrderResponse;
import com.priya.foodiesapi.repository.CartRepository;
import com.priya.foodiesapi.repository.OrderRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service

public class OrderServiceImpl implements  OrderService {

    @Autowired
    private  OrderRepository orderRepository;
    @Autowired
    private   UserService userService;
    @Autowired
    private CartRepository cartRepository;

    @Value("${razorpay_key}")
    private String RAZORPAY_KEY;

    @Value("${razorpay_secret}")
    private String RAZORPAY_SECRET;

    @Override
    public OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException {
        OrderEntity newOrder = convertToEntity(request);
        newOrder =  orderRepository.save(newOrder);

//        create razorpay payment order

        RazorpayClient razorpayClient = new RazorpayClient(RAZORPAY_KEY,RAZORPAY_SECRET);
        JSONObject orderRequest = new JSONObject();
        double amount = newOrder.getAmount();
        int amountInPaise = (int) Math.round(amount * 100);
        orderRequest.put("amount", amountInPaise);;
        orderRequest.put("currency", "INR");
        orderRequest.put("payment_capture",1);

       Order razorpayOrder = razorpayClient.orders.create(orderRequest);
       newOrder.setRazorpayOrderId(razorpayOrder.get("id"));
       String loggedInUserId = userService.findByUserId();
       newOrder.setUserId(loggedInUserId);
        newOrder = orderRepository.save(newOrder);
        return convertToResponse(newOrder);
    }

    @Override
    public void verifyPayment(Map<String, String> paymentData, String status) {
        String razorpayOrderId = paymentData.get("razorpay_order_id");
        String razorpayPaymentId = paymentData.get("razorpay_payment_id");
        String razorpaySignature = paymentData.get("razorpay_signature");

        try {
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(
                    RAZORPAY_SECRET.getBytes(), "HmacSHA256"
            );
            mac.init(secretKey);
            byte[] hash = mac.doFinal(data.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            if (!hexString.toString().equals(razorpaySignature)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Payment verification failed!"
                );
            }
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Signature check error"
            );
        }

        OrderEntity existingOrder = orderRepository
                .findByRazorpayOrderId(razorpayOrderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        existingOrder.setPaymentStatus(status);
        existingOrder.setRazorpaySignature(razorpaySignature);
        existingOrder.setRazorpayPaymentId(razorpayPaymentId);
        orderRepository.save(existingOrder);

        if ("Paid".equalsIgnoreCase(status)) {
            cartRepository.deleteByUserId(existingOrder.getUserId());
        }
    }

    @Override
    public List<OrderResponse> getUserOrders() {
        String loggedInUserId = userService.findByUserId();
         List <OrderEntity> list = orderRepository.findByUserId(loggedInUserId);
         return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void removeOrder(String orderId) {
              orderRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getOrdersOfAllUsers() {
      List<OrderEntity> list = orderRepository.findAll();
      return list.stream().map(entity -> convertToResponse(entity)).collect(Collectors.toList());
    }

    @Override
    public void updateOrderStatus(String orderId, String status) {
    OrderEntity entity = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("order not found"));
    entity.setOrderStatus(status);
    orderRepository.save(entity);
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .id(newOrder.getId())
                .amount(newOrder.getAmount())
                .userAddress(newOrder.getUserAddress())
                .userId(newOrder.getUserId())
                .razorpayOrderId(newOrder.getRazorpayOrderId())
                .paymentStatus(newOrder.getPaymentStatus())
                .orderStatus(newOrder.getOrderStatus())
                .email(newOrder.getEmail())
                .phoneNumber(newOrder.getPhoneNumber())
                .orderedItems(newOrder.getOrderedItems())
                .build();

    }

    private OrderEntity convertToEntity(OrderRequest request) {
      return  OrderEntity.builder()
               .userAddress(request.getUserAddress())
               .amount(request.getAmount())
               .orderedItems(request.getOrderedItems())
              .email(request.getEmail())
              .phoneNumber(request.getPhoneNumber())
              .orderStatus(request.getOrderStatus())
              .paymentStatus("pending")
               .build();
    }

    @Override
    public Long getOrderCount() {
        return orderRepository.count();
    }

    @Override
    public Long getDeliveredCount() {
        return orderRepository.countByOrderStatus("Delivered");
    }

    @Override
    public Double getTotalRevenue() {
        return orderRepository.findAll()
                .stream()
                .mapToDouble(OrderEntity::getAmount)
                .sum();
    }
}
