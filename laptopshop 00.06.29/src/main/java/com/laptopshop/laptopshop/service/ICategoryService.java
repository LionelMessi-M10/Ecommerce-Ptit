package com.laptopshop.laptopshop.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.laptopshop.laptopshop.entity.CategoryEntity;

public interface ICategoryService {

    List<CategoryEntity> getAllCategories();
    Page<CategoryEntity> getCategoryPage(int page, int limit);
    CategoryEntity findById(Long id);
    CategoryEntity save(CategoryEntity categoryEntity);
    CategoryEntity update(CategoryEntity categoryEntity, Long id);
    CategoryEntity disabledCategory(Long id);
    void deleteById(Long id);

}
