package com.example.ecommerce.service;

import com.example.ecommerce.dto.order.OrderResponse;
import com.example.ecommerce.dto.order.PostOrderRequest;
import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.OrderItem;

import java.util.List;

public interface OrderService {

    Integer getAllOrdersCount();
    OrderResponse postOrder(PostOrderRequest postOrderRequest);

    List<OrderResponse> getAllOrders(Integer page, Integer pageSize);

    List<OrderResponse> getUserOrders(Integer page, Integer pageSize);


}







