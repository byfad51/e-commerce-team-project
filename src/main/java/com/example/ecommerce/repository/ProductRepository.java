package com.example.ecommerce.repository;

import com.example.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
   // List<Product> findByCategory(String category);
   Optional<Product> findByProductName(String productName);
   List<Product> findByAuthorName(String authorName);
   Optional<Product>findByProductNameAndAuthorName(String productName,String authorName);
   // @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
   // List<Product> searchProducts(@Param("keyword") String keyword);

   @Query("SELECT b FROM Product b " +
           "WHERE (:authorName IS NULL OR b.authorName = :authorName) " +
           "AND (:startYear IS NULL OR b.publishedDate >= :startYear) " +
           "AND (:endYear IS NULL OR b.publishedDate <= :endYear) " +
           "AND (:publisherName IS NULL OR b.publisher = :publisherName) " +
           "ORDER BY " +
           "CASE WHEN :sortByParam = 'NEWEST' THEN b.createdAt END DESC, " +
           "CASE WHEN :sortByParam = 'OLDEST' THEN b.createdAt END ASC, " +
           "CASE WHEN :sortByParam = 'BEST_SELLING' THEN b.numberOfSales END DESC, " +
           "CASE WHEN :sortByParam = 'PRICE_HIGH_TO_LOW' THEN b.price END DESC, " +
           "CASE WHEN :sortByParam = 'PRICE_LOW_TO_HIGH' THEN b.price END ASC, " +
           "CASE WHEN :sortByParam = 'REVIEW_HIGH_TO_LOW' THEN SIZE(b.reviews) END DESC, " +
           "CASE WHEN :sortByParam = 'RATING_HIGH_TO_LOW' THEN b.averageRating END DESC")
   Page<Product> findBooksByFilters(@Param("authorName") String authorName,
                                    @Param("startYear") Integer startYear,
                                    @Param("endYear") Integer endYear,
                                    @Param("publisherName") String publisherName,
                                    @Param("sortByParam") String sortByParam,
                                    Pageable pageable);





}

