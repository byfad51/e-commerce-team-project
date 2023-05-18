package com.example.ecommerce.service;

import com.example.ecommerce.dto.review.ReviewRequest;
import com.example.ecommerce.dto.review.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getAllReviews();
    ReviewResponse getReviewById(Long reviewId);
    List<ReviewResponse> getProductReviews(Long productId);
    List<ReviewResponse> getUserReviews(Long userId);
    ReviewResponse createReview(ReviewRequest reviewRequest);
    Double getAverageRatingByProductId(Long productId);

    void deleteReviewById(Long reviewId, Long userId);
    ReviewResponse updateReview(Long reviewId, ReviewRequest reviewRequest);

    ReviewResponse getReviewByUserIdAndProcutId(Long productId, Long userId);

}
