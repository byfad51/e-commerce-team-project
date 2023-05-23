package com.example.ecommerce.exception;

public class CategoryNotFoundException extends RuntimeException{

    public CategoryNotFoundException(){
        super("Category not found!");
    }

}
