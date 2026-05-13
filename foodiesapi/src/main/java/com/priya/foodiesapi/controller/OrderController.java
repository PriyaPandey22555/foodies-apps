package com.priya.foodiesapi.controller;


import com.priya.foodiesapi.Service.OrderService;
import com.priya.foodiesapi.io.OrderRequest;
import com.priya.foodiesapi.io.OrderResponse;
import com.razorpay.RazorpayException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;


    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrderWithPayment(@RequestBody OrderRequest request) throws RazorpayException {
     OrderResponse response =  orderService.createOrderWithPayment(request);
     return response;
    }

    @PostMapping("/verify")
    public  void verifyPayment(@RequestBody Map<String, String> paymentData){
         orderService.verifyPayment(paymentData, "Paid");
    }

    @GetMapping
    public List<OrderResponse> getOrders(){
        return orderService.getUserOrders();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId){
         orderService.removeOrder(orderId);
    }


//    this is for the admin panel
    @GetMapping("/all")
    public List<OrderResponse> getOrdersOfAllUsers(){
       return orderService.getOrdersOfAllUsers();
    }


//    admin panel
    @PatchMapping("/status/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateOrderStatus(@PathVariable String orderId, @RequestParam String status){
        orderService.updateOrderStatus(orderId, status);
    }

    //  dashboard
    @GetMapping("/count")
    public ResponseEntity<Long> getOrderCount(){
        return ResponseEntity.ok(orderService.getOrderCount());
    }

    @GetMapping("/delivered/count")
    public ResponseEntity<Long> getDeliveredCount(){
        return ResponseEntity.ok(orderService.getDeliveredCount());
    }

    @GetMapping("/revenue")
    public ResponseEntity<Double> getRevenue(){
        return ResponseEntity.ok(orderService.getTotalRevenue());
    }
}
