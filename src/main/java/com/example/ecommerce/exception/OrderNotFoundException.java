package com.example.ecommerce.exception;

public class OrderNotFoundException extends RuntimeException{

    public OrderNotFoundException(){
        super("Order not found!");
    }

}
