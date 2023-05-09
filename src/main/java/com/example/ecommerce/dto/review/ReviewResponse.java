package com.example.ecommerce.dto.review;

import com.example.ecommerce.model.Review;
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

    private String username;

    private Long productId;

    private String content;

    private int rating;

    private LocalDateTime createdDate;

    public ReviewResponse (Review review){
        this.id=review.getId();
        this.content= review.getContent();
        this.createdDate=review.getCreatedDate();
        this.rating= review.getRating();
    }
}

