package com.example.ecommerce.dto.order;

import com.example.ecommerce.dto.product.ProductResponse;
import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private ProductResponse product;
    private Integer quantity;
}