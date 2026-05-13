package com.priya.foodiesapi.controller;


import com.priya.foodiesapi.Service.CartService;
import com.priya.foodiesapi.io.CartRequest;
import com.priya.foodiesapi.io.CartResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CartController {

    private final CartService cartService;
   @PostMapping
    public CartResponse addToCart(@RequestBody CartRequest request){
       String foodId = request.getFoodId();
       if(foodId == null || foodId.isEmpty()){
         throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"FoodId id not Found ");

       }
       return  cartService.addToCart(request);
   }
   @GetMapping
    public CartResponse getCart(){
       return cartService.getCart();
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearCart(){
       cartService.clearCart();
    }

    @PostMapping("/remove")
    public CartResponse removeFromCart( @RequestBody  CartRequest request){
        String foodId = request.getFoodId();
        if(foodId == null || foodId.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"FoodId id not Found ");

        }
        return cartService.removeFromCart(request);
    }
    @DeleteMapping("/item/{foodId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeItemFromCart(@PathVariable String foodId) {
        CartRequest request = new CartRequest();
        request.setFoodId(foodId);
        cartService.removeItemFromCart(request);
    }
}
