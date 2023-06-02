package com.example.ecommerce.controller;


import com.example.ecommerce.dto.order.OrderResponse;
import com.example.ecommerce.dto.order.PostOrderRequest;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(value = "/count")
    public ResponseEntity<Integer> getAllOrdersCount() {
        Integer orderCount = orderService.getAllOrdersCount();
        return new ResponseEntity<>(orderCount, HttpStatus.OK);
    }

    @GetMapping(value = "/getAllOrders")
    public ResponseEntity<List<OrderResponse>> getAllOrders(@RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
                                                            @RequestParam(value = "size", required = false, defaultValue = "10") Integer pageSize) {
        if (Objects.isNull(page) || page < 0) {
            throw new InvalidArgumentException("Invalid page");
        }
        if (Objects.isNull(pageSize) || pageSize < 0) {
            throw new InvalidArgumentException("Invalid pageSize");
        }
        List<OrderResponse> orders = orderService.getAllOrders(page, pageSize);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PostMapping(value = "/postOrder")
    public ResponseEntity<OrderResponse> postOrder(@RequestBody @Valid PostOrderRequest postOrderRequest) {
        OrderResponse orderResponse = orderService.postOrder(postOrderRequest);
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

}
