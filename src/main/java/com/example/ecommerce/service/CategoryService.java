package com.example.ecommerce.service;

import com.example.ecommerce.model.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();

    Category addCategory(String categoryName);

    void deleteCategoryById(Long categoryId);

    Category updateCategory(Long categoryId, String name);

}
