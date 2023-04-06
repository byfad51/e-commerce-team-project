package com.example.ecommerce.service;

import com.example.ecommerce.dto.product.ProductResponse;


import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getProductByProductname(String productname);
    ProductResponse getProductById(Long productId) ;


    }

