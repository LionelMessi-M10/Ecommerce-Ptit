package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.entity.ProductSizeEntity;
import com.laptopshop.laptopshop.models.dto.ProductSizeDTO;

import java.util.List;
import java.util.Optional;

public interface IProductSizeService {
    List<ProductSizeEntity> getAllProductSizes(); // Lấy tất cả kích thước sản phẩm
    Optional<ProductSizeEntity> getProductSizeById(Long id); // Lấy kích thước sản phẩm theo ID
    ProductSizeEntity createProductSize(ProductSizeDTO productSizeDTO); // Tạo mới kích thước sản phẩm
    ProductSizeEntity updateProductSize(Long id, ProductSizeDTO productSizeDTO); // Cập nhật kích thước sản phẩm
    boolean deleteProductSize(Long id); // Xóa kích thước sản phẩm
}
