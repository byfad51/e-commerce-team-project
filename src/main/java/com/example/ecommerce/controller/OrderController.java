package com.example.ecommerce.controller;


import com.example.ecommerce.dto.order.OrderResponse;
import com.example.ecommerce.dto.order.PostOrderRequest;
import com.example.ecommerce.dto.order.RejectOrderRequest;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.OrderNotFoundException;
import com.example.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping(value = "/getUserOrders/{userId}")
    public ResponseEntity<Page<OrderResponse>> getUserOrders(@PathVariable Long userId,
                                                             @RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                                             @RequestParam(value = "size", required = false, defaultValue = "10") Integer pageSize) {
        if (Objects.isNull(page) || page < 0) {
            throw new InvalidArgumentException("Invalid page");
        }
        if (Objects.isNull(pageSize) || pageSize < 0) {
            throw new InvalidArgumentException("Invalid pageSize");
        }
        Page<OrderResponse> orderPage = orderService.getUserOrders(userId, page, pageSize);

        return new ResponseEntity<>(orderPage, HttpStatus.OK);
    }


    @GetMapping("/getOrderById/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long orderId){

        try {
            OrderResponse response = orderService.getOrderById(orderId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (OrderNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/rejectOrder")
    public ResponseEntity<Object> rejectOrder(@RequestBody RejectOrderRequest request){

        try {
            orderService.rejectOrder(request);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (OrderNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }


    @PostMapping("/updateOrderStatusToCompleted/{orderId}")
    public ResponseEntity<Object> updateOrderStatusToCompleted(@PathVariable Long orderId) {
        try {
            orderService.updateOrderStatusToCompleted(orderId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/updateOrderStatusToApproved/{orderId}")
    public ResponseEntity<Object> updateOrderStatusToApproved(@PathVariable Long orderId) {
        try {
            orderService.updateOrderStatusToApproved(orderId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/updateOrderStatusToCancelled/{orderId}")
    public ResponseEntity<Object> updateOrderStatusToCancelled(@PathVariable Long orderId) {
        try {
            orderService.updateOrderStatusToCancelled(orderId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
