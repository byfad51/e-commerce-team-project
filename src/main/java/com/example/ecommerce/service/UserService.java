package com.example.ecommerce.service;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.model.User;

import java.util.List;

public interface UserService {

    User getUser();

    List<UserResponse> getAllUsers();

    UserResponse getUserByUsername(String username);

    UserResponse getUserById(Long userId);

    User saveUser(User user);

    User getUserByEmail(String email);

    UserResponse updateUser(long userId, UserCreateRequest request);

    void deleteUserById(long userId);

    void addOrDeleteFavoriteProduct(Long productId, Long userId);

    List<ProductResponse> getFavProducts(Long userId);

}
