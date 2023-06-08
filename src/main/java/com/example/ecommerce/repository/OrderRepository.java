package com.example.ecommerce.repository;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findAllByUserOrderByDateDesc(User user, Pageable pageable);

    Page<Order> findAllByOrderByDateDesc(Pageable pageable);

    Optional<Integer> countAllByUser(User user);

}
