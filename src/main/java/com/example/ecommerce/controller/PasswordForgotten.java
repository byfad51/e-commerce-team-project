package com.example.ecommerce.controller;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/passreset")
public class PasswordForgotten {
    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordForgotten(UserServiceImpl userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/getUserByEmail")
    public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null)
            return new ResponseEntity<>(user, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/getQuestionByEmail")
    public ResponseEntity<String> getQuestionByEmail(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null)
            return new ResponseEntity<>(user.getQuestion(), HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/getAnswerByEmail")
    public ResponseEntity<String> getQuestionByUser(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null)
            return new ResponseEntity<>(user.getAnswer(), HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/changePasswordByAnswer")
    public ResponseEntity changePasswordByAnswer(@RequestParam String email,@RequestParam String answer, @RequestParam String password) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            if (user.getAnswer().equals(answer)) {
                try {
                   user.setPassword(passwordEncoder.encode(password));
                   userService.updateUser(user );
                    return new ResponseEntity<>(HttpStatus.ACCEPTED);

                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
                }
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
            }
        }else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
    }

