package com.example.ecommerce.service;

import com.example.ecommerce.dto.user.AuthResponse;
import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserLoginRequest;
import com.example.ecommerce.dto.user.UserResponse;

public interface AuthenticationService {

    AuthResponse register(UserCreateRequest request);

    AuthResponse login(UserLoginRequest request);

}
