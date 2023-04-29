package com.example.ecommerce.dto.product;
import com.example.ecommerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
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
        this.id = product.getId();
        this.productName = product.getProductName();
        this.authorName=product.getAuthorName();
        this.description = product.getDescription();
        this.price = product.getPrice();
       this.stock=product.getStock();
        this.imageUrl=product.getImageUrl();
        this.ISBN=product.getISBN();
        this.isAvailable=product.isAvailable();
        this.language=product.getLanguage();
        this.numberOfPages=product.getNumberOfPages();
        this.numberOfSales=product.getNumberOfSales();
        this.publisher=product.getPublisher();
    }

}