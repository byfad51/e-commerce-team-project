package com.example.ecommerce.controller;

import com.example.ecommerce.model.Category;
import com.example.ecommerce.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("/getAllCategories")
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Object> addCategory(@RequestParam String categoryName){

        Category category = categoryService.addCategory(categoryName);

        if (category == null)
            return new ResponseEntity<>("Category already exists", HttpStatus.CONFLICT);

        else
            return new ResponseEntity<>(category, HttpStatus.CREATED);

    }

    @PostMapping("/updateCategory/{categoryId}")
    public ResponseEntity<Object> updateCategory(@PathVariable Long categoryId, @RequestParam String categoryName){
        try{
            Category category = categoryService.updateCategory(categoryId, categoryName);
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/deleteCategoryById/{categoryId}")
    public ResponseEntity<Object> deleteCategory(@PathVariable Long categoryId){
        categoryService.deleteCategoryById(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
