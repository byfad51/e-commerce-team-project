package com.example.ecommerce.dto.order;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private Double totalOrderPrice;

    @NotNull
    private List<OrderItemRequest> orderItems;

    @NotNull
    private String city;

    @NotNull
    private String address;

    @NotNull
    private String email;

    @NotNull
    private String phoneNumber;

    @NotNull
    private Integer postIndex;

}
