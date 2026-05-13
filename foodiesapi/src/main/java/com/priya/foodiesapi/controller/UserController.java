package com.priya.foodiesapi.controller;


import com.priya.foodiesapi.Service.UserService;
import com.priya.foodiesapi.io.UserRequest;
import com.priya.foodiesapi.io.UserResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final  UserService userService;
    ;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
        return userService.registerUser(request);

    }
}
