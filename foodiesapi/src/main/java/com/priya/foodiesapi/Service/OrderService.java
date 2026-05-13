package com.priya.foodiesapi.Service;

import com.priya.foodiesapi.io.OrderRequest;
import com.priya.foodiesapi.io.OrderResponse;
import com.razorpay.RazorpayException;

import java.util.List;
import java.util.Map;

public interface OrderService {
    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

   void verifyPayment(Map<String, String> paymentData, String status);
   List<OrderResponse> getUserOrders();

   void removeOrder(String orderId);

   List<OrderResponse>getOrdersOfAllUsers();


   void updateOrderStatus(String orderId, String status);
   Long getOrderCount();
   Long getDeliveredCount();
   Double getTotalRevenue();
}
