package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.user.AuthResponse;
import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserLoginRequest;
import com.example.ecommerce.exception.InvalidCredentialsException;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.enums.Role;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.security.JwtTokenProvider;
import com.example.ecommerce.service.AuthenticationService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponse register(UserCreateRequest request){

        if(userRepository.findByUsername(request.getUsername()).isEmpty()
                && userRepository.findByEmail(request.getEmail()).isEmpty()) {

            User user = new User();
            user.setFirstname(request.getFirstname());
            user.setLastname(request.getLastname());
            user.setUsername(request.getUsername());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setEmail(request.getEmail());
            user.setRole(Role.USER);
            user.setActive(true);
            user.setPhone(request.getPhone());
            user.setQuestion(request.getQuestion());
            user.setAnswer(request.getAnswer());
            user.setRegistrationDate(LocalDateTime.now());
            AuthResponse response = new AuthResponse();
            userRepository.save(user);
            response.setMessage("Successfully registered!");
            response.setUserId(user.getId());
            response.setRole(user.getRole().toString());

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
    public AuthResponse login(UserLoginRequest request){

        Optional<User> user = userRepository.findByUsername(request.getUsername());

        if(user.isEmpty())
            throw new InvalidCredentialsException("The username or password you entered is incorrect. Please try again.");

        if(!passwordEncoder.matches(request.getPassword(),user.get().getPassword()))
            throw new InvalidCredentialsException("The username or password you entered is incorrect. Please try again.");

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

        Authentication auth =  authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        AuthResponse response = new AuthResponse();
        response.setMessage("Bearer " + jwtToken);
        response.setUserId(user.get().getId());
        response.setRole(user.get().getRole().toString());
        return response;

    }
}
