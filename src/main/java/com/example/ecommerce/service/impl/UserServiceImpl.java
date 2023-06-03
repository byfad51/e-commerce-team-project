package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.Address;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
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
    public UserResponse updateUser(long userId, UserCreateRequest request) {

        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("user not found with ID: " + userId));

            if (!Objects.equals(user.getUsername(), request.getUsername()))
                if (userRepository.findByUsername(request.getUsername()).isEmpty())
                    user.setUsername(request.getUsername());
                else
                    throw new InvalidArgumentException("Username already taken!");

            if (!Objects.equals(user.getEmail(), request.getEmail()))
                if (userRepository.findByEmail(request.getEmail()).isEmpty())
                    user.setEmail(request.getEmail());
                else
                    throw new InvalidArgumentException("Email already taken!");

            user.setFirstname(request.getFirstname());
            user.setLastname(request.getLastname());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhone(request.getPhone());
            user.setQuestion(request.getQuestion());
            user.setAnswer(request.getAnswer());
            if (user.getAddresses().isEmpty())
                user.setAddresses(List.of(request.getAddress()));
            else
                user.getAddresses().add(request.getAddress());
            userRepository.save(user);
            return new UserResponse(user);

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
    public void deleteUserById(long userId){

        User user = userRepository.findById(userId).orElse(null);
        if (user == null)
            throw new UserNotFoundException("User not found with ID: " + userId);
        userRepository.deleteById(userId);
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

    @Override
    public Long getIdByUsername(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if(user!=null){
           return user.getId();
        }else{
            throw new UserNotFoundException("User not found with username :" + username);
        }
    }

    @Override
    public List<Address> getUserAddresses(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException("User not found with following id: " + userId));

        return user.getAddresses();
    }

}
