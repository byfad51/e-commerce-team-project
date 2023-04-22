package com.example.ecommerce.service;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.model.User;

import java.util.List;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserByUsername(String username);

    UserResponse getUserById(Long userId);

    User getUserByEmail(String email);

    void updateUser(User user);

    void addOrDeleteFavoriteProduct(Long productId, Long userId);

    List<ProductResponse> getFavProducts(Long userId);

}
