package com.example.ecommerce.service.impl;

import com.example.ecommerce.exception.CategoryNotFoundException;
import com.example.ecommerce.model.Category;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category addCategory(String categoryName) {

        if(categoryRepository.findByName(categoryName) == null){
            Category category = new Category();
            category.setName(categoryName);
            categoryRepository.save(category);

            return category;
        }
        else
            return null;
    }



    @Override
    public void deleteCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        categoryRepository.delete(category);
    }

    @Override
    public Category updateCategory(Long categoryId, String name) {

        Category category = categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);

        category.setName(name);
        categoryRepository.save(category);

        return category;
    }

}
