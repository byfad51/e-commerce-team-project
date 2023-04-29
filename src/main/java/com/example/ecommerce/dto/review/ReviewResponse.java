package com.example.ecommerce.dto.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Long id;

    private Long userId;

    private Long productId;

    private String content;

    private int rating;

    private LocalDateTime createdDate;
}
