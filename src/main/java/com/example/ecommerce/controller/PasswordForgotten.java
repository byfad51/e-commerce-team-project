package com.example.ecommerce.controller;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/passreset")
public class PasswordForgotten {
    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;


    @Data
    static class AllRequest {

        @Size(min = 5, max = 20, message = "The password must be between 5 and 20 characters long")
        private String password;

        @Email(message = "Incorrect mail")
        @NotBlank(message = "Email cannot be empty")
        private String email;

        @NotBlank(message = "You need to answer!")
        private String answer;
    }
@Data
    static class MyResponse {

        private String question;


        public MyResponse(User user) {
            this.question = user.getQuestion();
        }
    }
    @Data
    static class EmailRequest {
        @Email(message = "Incorrect mail")
        @NotBlank(message = "Email cannot be empty")
        private String email;
    }
    @Autowired
    public PasswordForgotten(UserServiceImpl userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/getUserByEmail")
    public ResponseEntity<Object> getUserByEmail(@Valid @RequestBody EmailRequest emailRequest, Errors errors) {
        if(errors.hasErrors()){
            return new ResponseEntity<>(errors.getFieldError().getDefaultMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        User user = userService.getUserByEmail(emailRequest.email);
        if (user != null)
            return new ResponseEntity<>(new MyResponse(user), HttpStatus.OK);
        else
            return new ResponseEntity<>("Email was not found",HttpStatus.NOT_FOUND);
    }


    @PostMapping("/changePasswordByAnswer")
    public ResponseEntity<Object> changePasswordByAnswer(@Valid @RequestBody AllRequest allRequest, Errors errors) {
        if(errors.hasErrors()){
            return new ResponseEntity<>(errors.getFieldError().getDefaultMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        User user = userService.getUserByEmail(allRequest.email);
        if (user != null) {
            if (user.getAnswer().equals(allRequest.answer)) {
                try {
                   user.setPassword(passwordEncoder.encode(allRequest.password));
                   userService.saveUser(user);
                    return new ResponseEntity<>("Password changed",HttpStatus.OK);

                } catch (Exception e) {
                    return new ResponseEntity<>("Password Encoder error",HttpStatus.NOT_ACCEPTABLE);
                }
            }else{
                return new ResponseEntity<>("Answer was not correct.",HttpStatus.NOT_ACCEPTABLE);
            }
        }else {
                return new ResponseEntity<>("User not found",HttpStatus.NOT_FOUND);
            }
        }
    }

