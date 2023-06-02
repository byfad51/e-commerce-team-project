package com.example.ecommerce.controller;


import com.example.ecommerce.dto.review.ReviewRequest;
import com.example.ecommerce.dto.review.ReviewResponse;
import com.example.ecommerce.repository.UserRepository;
import com.example.ecommerce.service.impl.ReviewServiceImpl;
import com.example.ecommerce.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.ecommerce.security.JwtTokenProvider;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewServiceImpl reviewService;
    private final UserServiceImpl userServiceImpl;
    private final JwtTokenProvider jtp;
    @Autowired
    public ReviewController(ReviewServiceImpl reviewService, UserServiceImpl userService, UserRepository userRepository, UserServiceImpl userServiceImpl, JwtTokenProvider jtp){
        this.reviewService=reviewService;
        this.userServiceImpl = userServiceImpl;
        this.jtp = jtp;
    }
    @PostMapping("/createReview")
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest reviewRequest) {
        ReviewResponse response=reviewService.createReview(reviewRequest);
        if(response!=null){
            return new ResponseEntity<>(response,HttpStatus.CREATED);
        }
       else{
           return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/deleteReviewById/{reviewId}")
    public ResponseEntity<Object> deleteReviewById(@PathVariable Long reviewId, @RequestHeader("Authorization") String token){
        token = token.replace("Bearer ", "");
        String username = jtp.getUserNameFromJwtToken(token);
        Long userId = userServiceImpl.getIdByUsername(username);

        try {
            reviewService.deleteReviewById(reviewId, userId);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        return new ResponseEntity<>("Deleted",HttpStatus.OK);
    }

    @GetMapping("/getReviewByUserIdAndProcutId/{productId}")
    public  ResponseEntity<ReviewResponse> getReviewByUserIdAndProcutId(@PathVariable Long productId, @RequestHeader("Authorization") String token){

        token = token.replace("Bearer ", "");
        String username = jtp.getUserNameFromJwtToken(token);
        Long userId = userServiceImpl.getIdByUsername(username);
        return new ResponseEntity<>(reviewService.getReviewByUserIdAndProcutId(userId,productId),HttpStatus.OK);

    }

    @GetMapping("/getReviewById/{reviewId}")
    public ReviewResponse getReviewById(@PathVariable Long reviewId) {

        return reviewService.getReviewById(reviewId);
    }
    @GetMapping("/getAllReviews")
    public ResponseEntity<List<ReviewResponse>> getAllReviews() {
        return new ResponseEntity<>(reviewService.getAllReviews(), HttpStatus.OK);
    }


    @GetMapping("/getProductReviews/{productId}")
    public List<ReviewResponse> getProductReviews(@PathVariable Long productId) {
        return reviewService.getProductReviews(productId);
    }

    @GetMapping("/getUserReviews/{userId}")
    public List<ReviewResponse> getUserReviews(@PathVariable Long userId) {
        return reviewService.getUserReviews(userId);
    }
    @GetMapping("/getAverageRatingByProductId/{productId}")
    public  ResponseEntity<Double> getAverageRatingByProductId(@PathVariable Long productId){
        return new ResponseEntity<>(reviewService.getAverageRatingByProductId(productId),HttpStatus.OK);

    }
    @PutMapping("/updateReview/{reviewId}")
    public ResponseEntity<ReviewResponse> updateReview(@PathVariable Long reviewId, @RequestBody ReviewRequest reviewRequest) {
        ReviewResponse response = reviewService.updateReview(reviewId, reviewRequest);
        if (response != null) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
