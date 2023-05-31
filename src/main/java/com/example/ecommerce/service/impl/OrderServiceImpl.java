package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.order.OrderResponse;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;
import com.example.ecommerce.service.OrderService;

import java.util.List;

public class OrderServiceImpl implements OrderService {
    @Override
    public OrderResponse createOrder(Order order) {
        return null;
    }

    @Override
    public List<OrderItem> getOrderItemsByOrderId(Long orderId) {
        return null;
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {
        return null;
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return null;
    }

    @Override
    public List<OrderResponse> getUserOrders(String email) {
        return null;
    }

    @Override
    public List<Order> getAllOrdersByQuery() {
        return null;
    }

    @Override
    public OrderResponse updateOrder(Order order) {
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {

    }
}
