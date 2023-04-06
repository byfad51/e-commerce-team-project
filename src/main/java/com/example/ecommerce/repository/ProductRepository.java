package com.example.ecommerce.repository;


import com.example.ecommerce.model.Product;
import com.example.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
   // List<Product> findByCategory(String category);
   Optional<Product> findByProductname(String productname);


   // @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
   // List<Product> searchProducts(@Param("keyword") String keyword);
}

