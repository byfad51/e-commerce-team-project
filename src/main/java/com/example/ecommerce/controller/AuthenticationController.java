package com.example.ecommerce.controller;

import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserLoginRequest;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody UserLoginRequest request){

        String token = authenticationService.login(request);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody UserCreateRequest request, Errors errors){

        if(errors.hasErrors()){
            return new ResponseEntity<>(errors.getFieldError().getDefaultMessage(), HttpStatus.EXPECTATION_FAILED);
        }

        UserResponse response = authenticationService.register(request);
        if (response == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        else
            return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

}
