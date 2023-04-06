package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream().map(ProductResponse::new).collect(Collectors.toList());
    }

    public ProductResponse getProductByProductname(String productname) {
        Product product = productRepository.findByProductname(productname).orElse(null);
        if(product!=null)
            return new ProductResponse(product);
        else return null;
    }
    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if(product != null)
            return new ProductResponse(product);
        else
            return null;
    }
}

