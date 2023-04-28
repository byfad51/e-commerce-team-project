package com.example.ecommerce.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ReviewNotFoundException extends RuntimeException{
    public ReviewNotFoundException(Long userId, Long productId) {
        super("No review found for user with ID " + userId + " and product with ID " + productId);
    }

    public ReviewNotFoundException(Long productId) {
        super("No reviews found for product with ID " + productId);
    }
    public ReviewNotFoundException() {
        super("No reviews found. ");
    }
}
