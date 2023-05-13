package com.example.ecommerce.service;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.awt.print.Book;
import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductByProductName(String productName);
    Product getProductById(Long productId) ;
    String addProduct(ProductCreateRequest product);
    String updateProduct(Long productId, ProductCreateRequest request);
    String deleteProduct(Long productId);

    Page<ProductResponse> findBooksByFilters(String authorName, Integer startYear, Integer endYear, String publisherName, String sortByParam, Pageable pageable);
}

