package com.example.ecommerce.dto.order;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponse {
    private Long id;
    private Double totalPrice;
    private LocalDateTime date;
    private Long userId;
    private List<OrderItemResponse> orderItems;

    public OrderResponse(Order order){
        this.id = order.getId();
        this.totalPrice = order.getTotalOrderPrice();
        this.date = order.getDate();
        this.userId = order.getUser().getId();
        this.orderItems = order.getOrderItems().stream().map(OrderItemResponse::new).collect(Collectors.toList());
    }

}
