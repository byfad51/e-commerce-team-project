package com.example.ecommerce.service;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.model.Product;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductByProductName(String productName);
    Product getProductById(Long productId) ;
    String addProduct(ProductCreateRequest product);
    String updateProduct(Long productId, ProductCreateRequest request);
    String deleteProduct(Long productId);
}

