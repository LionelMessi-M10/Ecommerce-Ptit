package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.entity.ProductSizeEntity;
import com.laptopshop.laptopshop.models.dto.ProductSizeDTO;
import com.laptopshop.laptopshop.repository.ProductSizeRepository;
import com.laptopshop.laptopshop.service.IProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductSizeService implements IProductSizeService {

    private final ProductSizeRepository productSizeRepository;

    @Autowired
    public ProductSizeService(ProductSizeRepository productSizeRepository) {
        this.productSizeRepository = productSizeRepository;
    }

    @Override
    public List<ProductSizeEntity> getAllProductSizes() {
        return productSizeRepository.findAll();
    }

    @Override
    public Optional<ProductSizeEntity> getProductSizeById(Long id) {
        return productSizeRepository.findById(id);
    }

    @Override
    public ProductSizeEntity createProductSize(ProductSizeDTO productSizeDTO) {
        ProductSizeEntity productSizeEntity = new ProductSizeEntity();
        productSizeEntity.setScreenSize(productSizeDTO.getScreenSize());
        // Optional: set product entities if needed
        // productSizeEntity.setProductEntities(...);
        return productSizeRepository.save(productSizeEntity);
    }

    @Override
    public ProductSizeEntity updateProductSize(Long id, ProductSizeDTO productSizeDTO) {
        Optional<ProductSizeEntity> existingProductSize = productSizeRepository.findById(id);
        if (existingProductSize.isPresent()) {
            ProductSizeEntity productSizeEntity = existingProductSize.get();
            productSizeEntity.setScreenSize(productSizeDTO.getScreenSize());
            // Optional: update product entities if needed
            // productSizeEntity.setProductEntities(...);
            return productSizeRepository.save(productSizeEntity);
        }
        return null;
    }

    @Override
    public boolean deleteProductSize(Long id) {
        Optional<ProductSizeEntity> productSizeEntity = productSizeRepository.findById(id);
        if (productSizeEntity.isPresent()) {
            productSizeRepository.delete(productSizeEntity.get());
            return true;
        }
        return false;
    }
}
