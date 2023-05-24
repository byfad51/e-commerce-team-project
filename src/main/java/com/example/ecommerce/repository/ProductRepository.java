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

   @Query("SELECT p FROM Product p WHERE p.productName LIKE %:keyword% OR p.authorName LIKE %:keyword% OR p.publisher LIKE %:keyword%")
   Page<Product> searchProducts(@Param("keyword") String keyword, Pageable pageable);

   @Query("SELECT p.productName FROM Product p WHERE p.productName LIKE %:keyword% " +
           "UNION " +
           "SELECT p.authorName FROM Product p WHERE p.authorName LIKE %:keyword% " +
           "UNION " +
           "SELECT p.publisher FROM Product p WHERE p.publisher LIKE %:keyword%")
   List<String> autocomplete(@Param("keyword") String keyword, Pageable pageable);


   @Query("SELECT b FROM Product b " +
           "JOIN b.categories c " +
           "WHERE (:authorName IS NULL OR b.authorName LIKE %:authorName%) " +
           "AND (:startYear IS NULL OR b.publishedDate >= :startYear) " +
           "AND (:endYear IS NULL OR b.publishedDate <= :endYear) " +
           "AND (:publisherName IS NULL OR b.publisher LIKE %:publisherName%) " +
           "AND (:language IS NULL OR b.language LIKE %:language%) " +
           "AND (:minRating IS NULL OR b.averageRating >= :minRating) " +
           "AND (:maxRating IS NULL OR b.averageRating <= :maxRating) " +
           "AND (:minPrice IS NULL OR b.price >= :minPrice) " +
           "AND (:maxPrice IS NULL OR b.price <= :maxPrice) " +
           "AND (c.id = :categoryId OR :categoryId IS NULL) " +
           "ORDER BY " +
           "CASE WHEN :sortByParam = 'NEWEST' THEN b.createdAt END DESC, " +
           "CASE WHEN :sortByParam = 'OLDEST' THEN b.createdAt END ASC, " +
           "CASE WHEN :sortByParam = 'BEST_SELLING' THEN b.numberOfSales END DESC, " +
           "CASE WHEN :sortByParam = 'PRICE_HIGH_TO_LOW' THEN b.price END DESC, " +
           "CASE WHEN :sortByParam = 'PRICE_LOW_TO_HIGH' THEN b.price END ASC, " +
           "CASE WHEN :sortByParam = 'REVIEW_HIGH_TO_LOW' THEN SIZE(b.reviews) END DESC, " +
           "CASE WHEN :sortByParam = 'RATING_HIGH_TO_LOW' THEN b.averageRating END DESC, " +
           "CASE WHEN :sortByParam = 'NEWLY_PUBLISHED_TO_OLDLY_PUBLISHED' THEN b.publishedDate END DESC, " +
           "CASE WHEN :sortByParam = 'OLDLY_PUBLISHED_TO_NEWLY_PUBLISHED' THEN b.publishedDate END ASC")
   Page<Product> findBooksByFilters(
           @Param("authorName") String authorName,
           @Param("startYear") Integer startYear,
           @Param("endYear") Integer endYear,
           @Param("publisherName") String publisherName,
           @Param("language") String language,
           @Param("minRating") Double minRating,
           @Param("maxRating") Double maxRating,
           @Param("minPrice") Double minPrice,
           @Param("maxPrice") Double maxPrice,
           @Param("categoryId") Long categoryId,
           @Param("sortByParam") String sortByParam,
           Pageable pageable);





}

