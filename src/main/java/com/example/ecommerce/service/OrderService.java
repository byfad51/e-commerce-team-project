package com.example.ecommerce.service;

import com.example.ecommerce.dto.order.OrderResponse;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(Order order);
    List<OrderItem> getOrderItemsByOrderId(Long orderId);
    OrderResponse getOrderById(Long orderId);

    List<OrderResponse> getAllOrders();

    List<OrderResponse> getUserOrders(String email);
    List<Order> getAllOrdersByQuery();
    OrderResponse updateOrder(Order order);

    void deleteOrder(Long orderId);

}







