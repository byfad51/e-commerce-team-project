package com.example.ecommerce.controller;

import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.impl.UserServiceImpl;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long userId){
        UserResponse response = userService.getUserById(userId);
        if (response != null)
            return new ResponseEntity<>(response, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getUserByUsername")
    public ResponseEntity<UserResponse> getUserByUsername(@RequestParam String username){
        UserResponse response = userService.getUserByUsername(username);
        if (response != null)
            return new ResponseEntity<>(response, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/getUserByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam @Email String email){

        if(userService.getUserByEmail(email) != null)
            return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        List<UserResponse> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
