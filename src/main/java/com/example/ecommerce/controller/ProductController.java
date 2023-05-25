package com.example.ecommerce.controller;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.exception.ProductNotFoundException;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.service.ProductService;
import com.example.ecommerce.service.impl.ProductServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

   @Autowired
   public ProductController(ProductServiceImpl productService) {
       this.productService = productService;
   }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @GetMapping("/getProductById/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId){
        Product product = productService.getProductById(productId);
        if (product != null)
            return new ResponseEntity<>(new ProductResponse(product), HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getProductByProductName")
    public ResponseEntity<ProductResponse> getProductByProductName(@RequestParam String productName){
        ProductResponse response = productService.getProductByProductName(productName);
        if (response != null)
            return new ResponseEntity<>(response, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Object> addProduct(@Valid @RequestBody ProductCreateRequest request, Errors errors){

        if (errors.hasErrors()){
            return new ResponseEntity<>(errors.getFieldError().getDefaultMessage(), HttpStatus.EXPECTATION_FAILED);
        }

        if(productService.addProduct(request)!=null){
            return new ResponseEntity<>(productService.addProduct(request),HttpStatus.CREATED);
        }
        else
            return new ResponseEntity<>("There is a book with same name and author!", HttpStatus.CONFLICT);
    }

    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @RequestBody ProductCreateRequest request) {
        String result = productService.updateProduct(productId, request);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        String result = productService.deleteProduct(productId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/getProductsByParams")
    public Page<ProductResponse> findBooksByFilters(
            @RequestParam(required = false) String authorName,
            @RequestParam(required = false) Integer startYear,
            @RequestParam(required = false) Integer endYear,
            @RequestParam(required = false) String publisherName,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Double maxRating,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false, defaultValue = "NEWEST") String sortByParam,
            @RequestParam(required = false) Long categoryId,
            Pageable pageable) {

        return productService.findBooksByFilters(
                authorName, startYear, endYear, publisherName, language,
                minRating, maxRating, minPrice, maxPrice, categoryId, sortByParam, pageable);
    }

    @PostMapping("/addCategoriesToBook/{productId}")
    public ResponseEntity<String> addCategoriesToBook(
            @PathVariable("productId") Long productId,
            @RequestBody List<Long> categoryIds) {

        try {
            productService.addCategoriesToBook(productId, categoryIds);
            return ResponseEntity.ok("Categories added successfully");
        } catch (ProductNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> getAutocompleteSuggestions(@RequestParam String keyword) {
        List<String> suggestions = productService.getAutocompleteSuggestions(keyword);
        return new ResponseEntity<>(suggestions, HttpStatus.OK);
    }

    @GetMapping("/search")
    public Page<ProductResponse> getSearchResults(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "10") int size,
            Pageable page) {

        return productService.getSearchResults(keyword, page, size);
    }

}
