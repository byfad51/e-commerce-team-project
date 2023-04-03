package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserLoginRequest;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.security.JwtTokenProvider;
import com.example.ecommerce.service.AuthenticationService;
import com.example.ecommerce.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(UserService userService, UserRepository userRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponse register(UserCreateRequest request){

        if(userRepository.findByUsername(request.getUsername()).isEmpty()
                && userRepository.findByEmail(request.getEmail()).isEmpty()) {

            User user = new User();
            user.setFirstname(request.getFirstname());
            user.setLastname(request.getLastname());
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            user.setRole("ROLE_USER");
            user.setActive(true);
            user.setPhone(request.getPhone());
            user.setQuestion(request.getQuestion());
            user.setAnswer(request.getAnswer());
            user.setAddress(request.getAddress());
            UserResponse response = new UserResponse(user);
            userRepository.save(user);
            return response;
        }
        else if(userRepository.findByUsername(request.getUsername()).isPresent())
            return null;
        else if(userRepository.findByEmail(request.getEmail()).isPresent())
            return null;

        else
            throw new UserNotFoundException(request.getUsername());
    }

    @Override
    public String login(UserLoginRequest request){

        if(userService.getUserByUsername(request.getUsername()) == null)
            throw new UserNotFoundException(request.getUsername() + " not found");

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

        Authentication auth =  authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        return "Bearer " + jwtToken;

    }
}
