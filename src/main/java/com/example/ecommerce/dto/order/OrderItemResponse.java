package com.example.ecommerce.dto.order;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.model.OrderItem;
import lombok.Data;

@Data
public class OrderItemResponse {
    private Long id;
    private ProductResponse product;
    private Integer quantity;

    public OrderItemResponse(OrderItem orderItem){
        this.id = orderItem.getId();
        this.product = new ProductResponse(orderItem.getProduct());
        this.quantity = orderItem.getQuantity();
    }
}