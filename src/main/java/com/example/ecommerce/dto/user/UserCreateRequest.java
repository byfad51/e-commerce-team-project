package com.example.ecommerce.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserCreateRequest {

    @NotNull
    @NotBlank(message = "First name cannot be empty")
    @Size(min = 2, max = 20, message = "First name must be between 2 and 20 characters long")
    private String firstname;

    @NotNull
    @NotBlank(message = "First name cannot be empty")
    @Size(min = 2, max = 20, message = "First name must be between 2 and 20 characters long")
    private String lastname;

    @NotBlank(message = "Username cannot be empty")
    @Size(min = 3, max = 16, message = "User name must be between 2 and 16 characters long")
    private String username;

    @Size(min = 5, max = 20, message = "The password must be between 5 and 20 characters long")
    private String password;

    @Email(message = "Incorrect mail")
    @NotBlank(message = "Email cannot be empty")
    private String email;

    @NotBlank
    @NotNull
    private String question;

    @NotNull
    @NotBlank
    private String answer;

    private String phone;

    private String address;

}
