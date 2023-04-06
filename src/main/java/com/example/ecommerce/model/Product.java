package com.example.ecommerce.model;


import jakarta.persistence.*;
import jdk.jfr.Category;
import lombok.*;

import java.time.LocalDateTime;

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

    @Column(name = "productname")
    private String productname;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private long price;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_featured")
    private boolean isFeatured;

    @Column(name = "is_available")
    private boolean isAvailable;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "stock")
    private long stock;

}
