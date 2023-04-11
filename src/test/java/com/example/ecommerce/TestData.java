package com.example.ecommerce;

import com.example.ecommerce.model.User;

public class TestData {

    public static User testUser(){

        User user = new User();
        user.setUsername("testUser");
        user.setFirstname("Test");
        user.setLastname("User");
        user.setEmail("test@mail.com");
        user.setFirstname("Test");
        user.setPassword("password");
        return user;
    }

}
