package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Override
    public User getUser(){

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (Objects.isNull(username)) {
            throw new AccessDeniedException("Invalid access");
        }

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }
        return user.get();
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(UserResponse::new).collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if(user!=null)
            return new UserResponse(user);
        else return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User saveUser(User user) {
        if (Objects.isNull(user)) {
            throw new InvalidArgumentException("Null user");
        }

        return userRepository.save(user);
    }

    @Override
    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user != null)
            return new UserResponse(user);
        else
            return null;
    }

    @Override
    public void addOrDeleteFavoriteProduct(Long productId, Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("There is no user with this Id"+userId));
        Product product = productRepository.getReferenceById(productId);
        if(user.getFavoriteProducts().contains(product)){
            user.getFavoriteProducts().remove(product);
            userRepository.save(user);
        }else{
            user.getFavoriteProducts().add(product);
            userRepository.save(user);
        }

    }

    @Override
    public List<ProductResponse> getFavProducts(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("There is no user with this Id"+userId));
        return user.getFavoriteProducts().stream().map(ProductResponse::new).collect(Collectors.toList());
    }

}
