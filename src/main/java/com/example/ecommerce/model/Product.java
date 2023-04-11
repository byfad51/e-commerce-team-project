package com.example.ecommerce.model;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name")
    private String productName;
    @Column(name = "author_name")
    private String authorName;

    @Column(name = "description")
    @Lob
    private String description;

    @Column(name = "price")
    private double price;
    @Column(name = "ISBN")
    private String ISBN;
    @Column(name = "number_of_pages")
    private long numberOfPages;

    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "number_of_sales")
    private String numberOfSales;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "language")
    private String language;

    @Column(name = "is_featured")
    private boolean isFeatured;

    @Column(name = "is_available")
    private boolean isAvailable;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "published_date")
    private int publishedDate;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "stock")
    private long stock;

}
