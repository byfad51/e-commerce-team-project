package com.example.ecommerce.dto.user;

import com.example.ecommerce.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String firstname;
    private String lastname;
    private String username;

    public UserResponse(User user) {
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.username = user.getUsername();
    }
}
