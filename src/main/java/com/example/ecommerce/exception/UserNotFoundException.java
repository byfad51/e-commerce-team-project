package com.example.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long userId) {
        super("User with " + userId + " not found");
    }

    public UserNotFoundException(String username) {
        super(username +" not found");
    }

}