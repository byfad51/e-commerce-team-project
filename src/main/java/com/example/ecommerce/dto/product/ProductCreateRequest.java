package com.example.ecommerce.dto.product;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductCreateRequest {
    @NotNull
    @NotBlank(message = "Product name cannot be empty")
    @Size(min=2, max = 100, message = "Product name must be between 2 and 100 characters long")
    private String productName;

    @NotNull
    @NotBlank(message = "Description cannot be empty")
    @Size(max = 5000, message = "Description long cannot over 5000 characters long")
    @Lob
    private String description;

    @NotNull
    @NotBlank(message = "Author name cannot be empty")
    @Size(min=2, max = 80, message = "Author name must be between 2 and 80 characters long")
    private String authorName;

    @NotNull
    @DecimalMin(value="0.0", inclusive = false, message = "Please enter a valid price")
    private Double price;

    @NotNull
    private Integer numberOfPages;

    private String category;

    private String publisher;
    private String language;
    private long stock;
    private String ISBN;
    private String imageUrl;
    private int publishedDate;

}
