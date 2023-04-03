package com.example.ecommerce.service;

import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserLoginRequest;
import com.example.ecommerce.dto.user.UserResponse;

public interface AuthenticationService {

    UserResponse register(UserCreateRequest request);

    String login(UserLoginRequest request);

}
