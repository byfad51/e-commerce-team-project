package com.example.ecommerce.dto.order;

import com.example.ecommerce.model.User;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data

public class OrderResponse {
    private Long id;
    private Double totalPrice;
    private LocalDate date;
    private User user;
    private List<OrderItemResponse> orderItems;

}
