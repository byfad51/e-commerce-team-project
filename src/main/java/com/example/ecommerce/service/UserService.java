package com.example.ecommerce.service;

import com.example.ecommerce.dto.user.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserByUsername(String username);

    UserResponse getUserById(Long userId);

}
