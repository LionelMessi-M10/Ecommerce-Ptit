package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.entity.ProductWeightEntity;
import com.laptopshop.laptopshop.models.dto.ProductWeightDTO;

import java.util.List;
import java.util.Optional;

public interface IProductWeightService {
    List<ProductWeightEntity> getAllProductWeights(); // Lấy tất cả cân nặng sản phẩm
    Optional<ProductWeightEntity> getProductWeightById(Long id); // Lấy cân nặng sản phẩm theo ID
    ProductWeightEntity createProductWeight(ProductWeightDTO productWeightDTO); // Tạo mới cân nặng sản phẩm
    ProductWeightEntity updateProductWeight(Long id, ProductWeightDTO productWeightDTO); // Cập nhật cân nặng sản phẩm
    boolean deleteProductWeight(Long id); // Xóa cân nặng sản phẩm
}
