package com.example.ecommerce.service;

import com.example.ecommerce.dto.review.ReviewRequest;
import com.example.ecommerce.dto.review.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getAllReviews();
    ReviewResponse getReviewById(Long reviewId);
    List<ReviewResponse> getProductReviews(Long productId);
    List<ReviewResponse> getUserReviewsByUserId(Long userId);
    ReviewResponse createReview(ReviewRequest reviewRequest);


}
