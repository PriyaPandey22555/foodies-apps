package com.priya.foodiesapi.Service;

import com.priya.foodiesapi.io.UserRequest;
import com.priya.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

     String findByUserId();

}
