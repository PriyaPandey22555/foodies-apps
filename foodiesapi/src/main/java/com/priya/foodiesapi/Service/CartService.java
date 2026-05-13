package com.priya.foodiesapi.Service;

import com.priya.foodiesapi.io.CartRequest;
import com.priya.foodiesapi.io.CartResponse;

public interface CartService {

   CartResponse addToCart(CartRequest request);

   CartResponse getCart();

   void clearCart();

   CartResponse removeFromCart(CartRequest cartRequest);
   void removeItemFromCart(CartRequest request);
}
