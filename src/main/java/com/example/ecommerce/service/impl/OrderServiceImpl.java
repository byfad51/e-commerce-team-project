package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.order.OrderResponse;
import com.example.ecommerce.dto.order.PostOrderRequest;
import com.example.ecommerce.dto.order.RejectOrderRequest;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.exception.InvalidArgumentException;
import com.example.ecommerce.exception.OrderNotFoundException;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.model.*;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.CartService;
import com.example.ecommerce.service.OrderService;
import com.example.ecommerce.service.UserService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final CartService cartService;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            UserService userService,
                            CartService cartService, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.cartService = cartService;
        this.productRepository = productRepository;
    }

    @Override
    public Integer getAllOrdersCount() {
        User user = userService.getUser();
        return orderRepository.countAllByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("An error occurred whilst fetching orders count"));
    }

    @Override
    public OrderResponse postOrder(PostOrderRequest postOrderRequest) {
        User user = userService.getUser();
        Cart cart = user.getCart();

        if (Objects.isNull(cart) || Objects.isNull(cart.getCartItemList())) {
            throw new InvalidArgumentException("Cart is not valid");
        }

        if (cart.getCartItemList().stream().anyMatch(cartItem -> cartItem.getProduct().getStock() < cartItem.getAmount())) {
            throw new InvalidArgumentException("A product in your cart is out of stock.");
        }

        Order saveOrder = new Order();
        saveOrder.setUser(user);
        saveOrder.setDate(LocalDateTime.now());
        saveOrder.setFirstname(postOrderRequest.getFirstname());
        saveOrder.setLastname(postOrderRequest.getLastname());
        saveOrder.setCity(postOrderRequest.getCity());
        saveOrder.setDistrict(postOrderRequest.getDistrict());
        saveOrder.setNeighbourhood(postOrderRequest.getNeighbourhood());
        saveOrder.setFullAddress(postOrderRequest.getFullAddress());
        saveOrder.setPostalCode(postOrderRequest.getPostalCode());
        saveOrder.setPhoneNumber(postOrderRequest.getPhoneNumber());
        saveOrder.setStatus(OrderStatus.PENDING);
        saveOrder.setStatusMessage(OrderStatus.PENDING.getStatusMessage());

        saveOrder.setOrderItems(new ArrayList<>());

        cart.getCartItemList().forEach(cartItem -> {
            cartItem.getProduct().setNumberOfSales(cartItem.getProduct().getNumberOfSales() + cartItem.getAmount());
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(cartItem.getAmount());
            orderItem.setOrder(saveOrder);
            orderItem.setProduct(cartItem.getProduct());
            saveOrder.getOrderItems().add(orderItem);
        });

        saveOrder.setTotalOrderPrice(Double.valueOf(cart.getTotalPrice()));

        Order savedOrder = orderRepository.save(saveOrder);
        cartService.emptyCart();
        return new OrderResponse(savedOrder);
    }


    @Override
    public List<OrderResponse> getUserOrders(Integer page, Integer pageSize) {
        User user = userService.getUser();
        List<Order> orders = orderRepository.findAllByUserOrderByDateDesc(user, PageRequest.of(page, pageSize));
        return orders
                .stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
        return new OrderResponse(order);
    }

    @Override
    public void rejectOrder(RejectOrderRequest request) {
        Order order = orderRepository.findById(request.getOrderId()).orElseThrow(OrderNotFoundException::new);
        order.setStatus(OrderStatus.REJECTED);
        order.setStatusMessage(request.getRejectMessage());
        rollbackOrder(order);
        orderRepository.save(order);
    }

    @Override
    public void updateOrderStatusToCompleted(Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
        order.setStatus(OrderStatus.COMPLETED);
        order.setStatusMessage(OrderStatus.COMPLETED.getStatusMessage());
        orderRepository.save(order);
    }

    @Override
    public void updateOrderStatusToApproved(Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
        order.setStatus(OrderStatus.APPROVED);
        order.setStatusMessage(OrderStatus.APPROVED.getStatusMessage());
        orderRepository.save(order);
    }

    @Override
    public void updateOrderStatusToCancelled(Long orderId){
        Order order = orderRepository.findById(orderId).orElseThrow(OrderNotFoundException::new);
        order.setStatus(OrderStatus.CANCELLED);
        order.setStatusMessage(OrderStatus.CANCELLED.getStatusMessage());
        rollbackOrder(order);
        orderRepository.save(order);
    }

    @Override
    public List<OrderResponse> getAllOrders(Integer page, Integer pageSize) {
        List<Order> orders = orderRepository.findAll();
        return orders
                .stream()
                .map(OrderResponse::new)
                .collect(Collectors.toList());
    }

    private void rollbackOrder(Order order) {

        order.getOrderItems().forEach(orderItem -> {

            int amount = orderItem.getQuantity();
            Product product = orderItem.getProduct();
            product.setNumberOfSales(product.getNumberOfSales() - amount);

            productRepository.save(product);
        });

    }


}
