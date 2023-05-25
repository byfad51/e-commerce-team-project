package com.example.ecommerce.service.impl;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.exception.ProductNotFoundException;
import com.example.ecommerce.model.Category;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
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
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElse(null);
    }

    public String addProduct(ProductCreateRequest request) {
        if(productRepository.findByProductNameAndAuthorName(request.getProductName(),
                request.getAuthorName()).isEmpty()){
            Product product= new Product();
            addProduct(request, product);
            product.setCreatedAt(LocalDateTime.now());

            productRepository.save(product);
            return ("Successfully added a product :)");
        }else{
            return null;
        }
    }

    private void addProduct(ProductCreateRequest request, Product product) {

        List<Category> categories = categoryRepository.findAllById(request.getCategory());
        product.setCategories(categories);

        product.setProductName(request.getProductName());
        product.setAuthorName(request.getAuthorName());
        product.setDescription(request.getDescription());
        product.setAvailable(request.getStock() > 0);
        product.setImageUrl(request.getImageUrl());
        product.setISBN(request.getISBN());
        product.setLanguage(request.getLanguage());
        product.setNumberOfPages(request.getNumberOfPages());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setPublisher(request.getPublisher());
        product.setPublishedDate(request.getPublishedDate());
    }


    @Override
    public String updateProduct(Long productId, ProductCreateRequest request) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            addProduct(request, product);
            product.setUpdatedAt(LocalDateTime.now());

            productRepository.save(product);
            return "Successfully updated the product :)";
        } else {
            return "Product not found.";
        }
    }

    @Override
    public String deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            productRepository.delete(product);
            return "Successfully deleted the product :)";
        } else {
            return "Product not found.";
        }
    }

    @Override
    public Page<ProductResponse> findBooksByFilters(
            String authorName, Integer startYear, Integer endYear,
            String publisherName, String language, Double minRating,
            Double maxRating, Double minPrice, Double maxPrice,
            Long categoryId, String sortByParam, Pageable pageable) {

        return productRepository.findBooksByFilters(authorName, startYear, endYear, publisherName, language,
                        minRating, maxRating, minPrice, maxPrice, categoryId, sortByParam, pageable)
                .map(ProductResponse::new);
    }


    @Override
    @Transactional
    public void addCategoriesToBook(Long productId, List<Long> categoryIds) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Book not found"));

        List<Category> categories = categoryRepository.findAllById(categoryIds);

        product.getCategories().addAll(categories);

        productRepository.save(product);
    }

    @Override
    public List<String> getAutocompleteSuggestions(String keyword) {
        Pageable pageable = PageRequest.of(0, 10);
        return productRepository.autocomplete(keyword, pageable);
    }


    @Override
    public Page<ProductResponse> getSearchResults(String keyword, Pageable pageable, int size) {
        Page<Product> productsPage = productRepository.searchProducts(keyword, pageable);
        return productsPage.map(ProductResponse::new);
    }

}

