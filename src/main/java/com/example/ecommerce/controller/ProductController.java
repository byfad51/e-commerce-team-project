package com.example.ecommerce.controller;

import com.example.ecommerce.dto.product.ProductResponse;
import com.example.ecommerce.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductServiceImpl productService;

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
        ProductResponse response = productService.getProductById(productId);
        if (response != null)
            return new ResponseEntity<>(response, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/getProductByProductname")
    public ResponseEntity<ProductResponse> getProductByProductname(@RequestParam String productname){
        ProductResponse response = productService.getProductByProductname(productname);
        if (response != null)
            return new ResponseEntity<>(response, HttpStatus.FOUND);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


  /*  @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }*/
}
