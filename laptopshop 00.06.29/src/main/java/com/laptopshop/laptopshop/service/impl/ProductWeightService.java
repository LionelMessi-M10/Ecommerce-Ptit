package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.entity.ProductWeightEntity;
import com.laptopshop.laptopshop.models.dto.ProductWeightDTO;
import com.laptopshop.laptopshop.repository.ProductWeightRepository;
import com.laptopshop.laptopshop.service.IProductWeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductWeightService implements IProductWeightService {

    private final ProductWeightRepository productWeightRepository;

    @Autowired
    public ProductWeightService(ProductWeightRepository productWeightRepository) {
        this.productWeightRepository = productWeightRepository;
    }

    @Override
    public List<ProductWeightEntity> getAllProductWeights() {
        return productWeightRepository.findAll();
    }

    @Override
    public Optional<ProductWeightEntity> getProductWeightById(Long id) {
        return productWeightRepository.findById(id);
    }

    @Override
    public ProductWeightEntity createProductWeight(ProductWeightDTO productWeightDTO) {
        ProductWeightEntity productWeightEntity = new ProductWeightEntity();
        productWeightEntity.setWeight(productWeightDTO.getWeight());
        // Optional: set product entities if needed
        // productWeightEntity.setProductEntities(...);
        return productWeightRepository.save(productWeightEntity);
    }

    @Override
    public ProductWeightEntity updateProductWeight(Long id, ProductWeightDTO productWeightDTO) {
        Optional<ProductWeightEntity> existingProductWeight = productWeightRepository.findById(id);
        if (existingProductWeight.isPresent()) {
            ProductWeightEntity productWeightEntity = existingProductWeight.get();
            productWeightEntity.setWeight(productWeightDTO.getWeight());
            // Optional: update product entities if needed
            // productWeightEntity.setProductEntities(...);
            return productWeightRepository.save(productWeightEntity);
        }
        return null;
    }

    @Override
    public boolean deleteProductWeight(Long id) {
        Optional<ProductWeightEntity> productWeightEntity = productWeightRepository.findById(id);
        if (productWeightEntity.isPresent()) {
            productWeightRepository.delete(productWeightEntity.get());
            return true;
        }
        return false;
    }
}
