package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public ProductResponse getProductByProductName(String productName) {
        Product product = productRepository.findByProductName(productName).orElse(null);
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
    public String addProduct(ProductCreateRequest request) {
        if(productRepository.findByProductNameAndAuthorName(request.getProductName(), request.getAuthorName()).isEmpty()){
            Product product= new Product();
            product.setProductName(request.getProductName());
            product.setAuthorName(request.getAuthorName());
            product.setDescription(request.getDescription());
            product.setAvailable(true);
            product.setImageUrl(request.getImageUrl());
            product.setISBN(request.getISBN());
            product.setLanguage(request.getLanguage());
            product.setNumberOfPages(request.getNumberOfPages());
            product.setPrice(request.getPrice());
            product.setStock(request.getStock());
            product.setPublisher(request.getPublisher());
            product.setPublishedDate(request.getPublishedDate());
            product.setCreatedAt(LocalDateTime.now());

            productRepository.save(product);
            return ("Successfully added a product :)");
        }else{
            return null;
        }
    }

}

