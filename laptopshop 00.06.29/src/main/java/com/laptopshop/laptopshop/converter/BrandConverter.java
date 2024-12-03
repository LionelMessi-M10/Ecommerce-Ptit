package com.laptopshop.laptopshop.converter;

import com.laptopshop.laptopshop.entity.BrandEntity;
import com.laptopshop.laptopshop.entity.CategoryEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.models.dto.BrandDTO;
import com.laptopshop.laptopshop.models.response.BrandResponse;
import com.laptopshop.laptopshop.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BrandConverter {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    public BrandDTO convertToDTO(BrandEntity brandEntity) {
        BrandDTO brandDTO = modelMapper.map(brandEntity, BrandDTO.class);

        brandDTO.setCategoryId(brandEntity.getCategoryEntity().getId());

        return brandDTO;
    }

    public BrandEntity convertToEntity(BrandDTO brandDTO) {
        BrandEntity brandEntity = new BrandEntity();

        brandEntity.setId(brandDTO.getId());
        brandEntity.setBrandName(brandDTO.getBrandName());

        CategoryEntity categoryEntity = categoryRepository.findById(brandDTO.getCategoryId())
                .orElseThrow(() -> new DataNotFoundException("Category not found"));

        brandEntity.setCategoryEntity(categoryEntity);

        return brandEntity;
    }

    public BrandResponse convertToResponse(BrandEntity brandEntity) {

        BrandResponse brandResponse = BrandResponse.builder()
                .id(brandEntity.getId())
                .categoryImage(brandEntity.getCategoryEntity().getCategoryImage())
                .categoryName(brandEntity.getCategoryEntity().getCategoryName())
                .brandName(brandEntity.getBrandName())
                .build();

        return brandResponse;
    }
}
