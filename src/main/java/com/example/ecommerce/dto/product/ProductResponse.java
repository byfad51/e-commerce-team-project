package com.example.ecommerce.dto.product;
import com.example.ecommerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private String name;
    private String description;
    private double price;
    private long stock;
    private String imageUrl;

    public ProductResponse(Product product) {
        this.name = product.getProductname();
        this.description = product.getDescription();
        this.price = product.getPrice();
       this.stock=product.getStock();
        this.imageUrl=product.getImageUrl();
    }

}