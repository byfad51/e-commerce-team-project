package com.example.ecommerce.controller;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.dto.user.UserCreateRequest;
import com.example.ecommerce.dto.user.UserResponse;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.UserNotFoundException;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
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
    @PostMapping("/check")
    public ResponseEntity checkOut() {
        return new ResponseEntity<>(true, HttpStatus.OK);
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

    @PostMapping("/updateUser/{userId}")
    public ResponseEntity<Object> updateUser(@PathVariable long userId,
                                             @Valid @RequestBody UserCreateRequest request, Errors errors){

        if (errors.hasErrors())
            return new ResponseEntity<>(errors.getFieldError().getDefaultMessage(), HttpStatus.EXPECTATION_FAILED);

        try {
            UserResponse response = userService.updateUser(userId, request);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (UserNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
        catch (InvalidArgumentException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
        }

    }

    @DeleteMapping("/deleteUserById/{userId}")
    public ResponseEntity<Object> deleteUserById(@PathVariable long userId){
        try {
            userService.deleteUserById(userId);
        }
        catch (UserNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/favProduct")
    public ResponseEntity<String>  addOrDeleteFavoriteProduct(@RequestParam Long productId,@RequestParam Long userId) {
        try{
            userService.addOrDeleteFavoriteProduct(productId,userId);
            return new ResponseEntity<>("addOrDeleteFavoriteProduct", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("You have to login firstly.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getFavProduct")
    public ResponseEntity<List<ProductResponse>>  getFavProducts(@RequestParam Long userId) {
       try{
           return new ResponseEntity<>(userService.getFavProducts(userId), HttpStatus.OK);
       }catch (Exception e){
           return new ResponseEntity<>(HttpStatus.FORBIDDEN);
       }
    }
}
