package com.example.ecommerce.dto.cart;

import lombok.Data;

import java.util.List;

@Data
public class CartResponse {

    private List<CartItemDto> cartItems;
    private Float totalCartPrice;
    //private Float totalCargoPrice;
    private Float totalPrice;

}
