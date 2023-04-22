package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(UserResponse::new).collect(Collectors.toList());
    }


    public UserResponse getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if(user!=null)
            return new UserResponse(user);
        else return null;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }


    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user != null)
            return new UserResponse(user);
        else
            return null;
    }

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

    public List<ProductResponse> getFavProducts(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("There is no user with this Id"+userId));
        return user.getFavoriteProducts().stream().map(ProductResponse::new).collect(Collectors.toList());
    }

}
