package com.example.ecommerce.service;

import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.model.User;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserByUsername(String username);

    UserResponse getUserById(Long userId);

    User getUserByEmail(String email);

    void updateUser(User user);

}
