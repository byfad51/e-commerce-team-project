package com.example.ecommerce.dto.user;
import com.example.ecommerce.enums.Role;
import com.example.ecommerce.model.Address;
import com.example.ecommerce.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private boolean active;
    private List<Address> addresses;
    private String question;
    private String phone;
    private Role role;
    private LocalDateTime registrationDate;
    private int numberOfReviews;
    private String answer;

    public UserResponse(User user) {
        this.id = user.getId();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.active = user.isActive();
        this.addresses = user.getAddresses();
        this.question = user.getQuestion();
        this.phone = user.getPhone();
        this.role = user.getRole();
        this.registrationDate = user.getRegistrationDate();
        this.answer = user.getAnswer();
        this.numberOfReviews = user.getReviews().size();
    }
}
