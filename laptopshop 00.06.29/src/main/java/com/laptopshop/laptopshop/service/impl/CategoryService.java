package com.laptopshop.laptopshop.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.laptopshop.laptopshop.entity.CategoryEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.repository.CategoryRepository;
import com.laptopshop.laptopshop.service.ICategoryService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryEntity> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Page<CategoryEntity> getCategoryPage(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);
        return categoryRepository.findAll(pageable);
    }

    @Override
    public CategoryEntity findById(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Category not found"));
    }

    @Transactional
    @Override
    public CategoryEntity save(CategoryEntity categoryEntity) {
        categoryEntity.setEnabled((short) 1);
        return categoryRepository.save(categoryEntity);
    }

    @Transactional
    @Override
    public CategoryEntity update(CategoryEntity categoryEntity, Long id) {

        CategoryEntity updateCategory = categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Category not found"));

        updateCategory.setCategoryImage(categoryEntity.getCategoryImage());
        updateCategory.setCategoryName(categoryEntity.getCategoryName());
        updateCategory.setColorCategory(categoryEntity.getColorCategory());

        return categoryRepository.saveAndFlush(updateCategory);
    }

    @Override
    public CategoryEntity disabledCategory(Long id) {
        CategoryEntity updateCategory = categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Category not found"));
        updateCategory.setEnabled((short) 0);
        return categoryRepository.saveAndFlush(updateCategory);
    }

    @Transactional
    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

}
