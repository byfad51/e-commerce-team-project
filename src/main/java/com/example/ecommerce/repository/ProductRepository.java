package com.example.ecommerce.repository;

import com.example.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
   // List<Product> findByCategory(String category);
   Optional<Product> findByProductName(String productName);
   List<Product> findByAuthorName(String authorName);
   Optional<Product>findByProductNameAndAuthorName(String productName,String authorName);
   // @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
   // List<Product> searchProducts(@Param("keyword") String keyword);
}

