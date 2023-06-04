package com.example.ecommerce.dto.order;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostOrderRequest {

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    private String city;

    @NotNull
    private String district;

    private String neighbourhood;

    @NotNull
    private String fullAddress;

    private String postalCode;

    @NotNull
    private String phoneNumber;

}
