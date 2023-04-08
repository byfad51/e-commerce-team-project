package com.example.ecommerce.service;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductByProductName(String productName);
    ProductResponse getProductById(Long productId) ;
    String addProduct(ProductCreateRequest product);


    }

