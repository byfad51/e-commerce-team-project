package com.example.ecommerce.dto.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserLoginRequest {

    @NotNull
    @NotEmpty(message = "username may not be empty")
    private String username;

    @NotNull
    @NotEmpty(message = "password may not be empty")
    @Size(min = 5, max = 20, message = "password should be between 5 and 20 chars in length")
    @NotBlank
    private String password;

}
