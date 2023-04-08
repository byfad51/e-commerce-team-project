package com.example.ecommerce.dto.product;
import com.example.ecommerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private String productName;
    private String authorName;
    private String description;
    private double price;
    private long stock;
    private String imageUrl;
    private String ISBN;
    private long numberOfPages;
    private String numberOfSales;
    private String publisher;
    private String language;
    private boolean isAvailable;


    public ProductResponse(Product product) {
        this.productName = product.getProductName();
        this.description = product.getDescription();
        this.price = product.getPrice();
       this.stock=product.getStock();
        this.imageUrl=product.getImageUrl();
        this.ISBN=product.getISBN();
        this.isAvailable=product.isAvailable();
        this.language=product.getLanguage();
    }

}