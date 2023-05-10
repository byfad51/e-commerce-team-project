package com.example.ecommerce.controller;

import com.example.ecommerce.dto.product.ProductCreateRequest;
import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.model.Product;
import com.example.ecommerce.service.ProductService;
import com.example.ecommerce.service.impl.ProductServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> addProduct(@Valid @RequestBody ProductCreateRequest request){
       if(productService.addProduct(request)!=null){
           return new ResponseEntity<>(productService.addProduct(request),HttpStatus.CREATED);

       }
       else
           return new ResponseEntity<>(HttpStatus.CONFLICT);
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
}
