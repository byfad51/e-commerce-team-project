package com.example.ecommerce.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CartItemDto {

    private Long id;

    private Integer amount;

    private String productName;

    private String authorName;

    private double price;

    private long stock;

    private String imageUrl;

    private String ISBN;

    private String publisher;

    private String language;

    private Long productId;


}
