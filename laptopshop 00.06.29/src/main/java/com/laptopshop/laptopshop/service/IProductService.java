package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.models.dto.ProductDTO;
import com.laptopshop.laptopshop.models.request.ProductSearchRequest;
import com.laptopshop.laptopshop.models.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<ProductResponse> getAllProducts();

    Page<ProductResponse> getAllProductsPages(Pageable pageable);

    Page<ProductResponse> getProductPage(ProductSearchRequest productSearchRequest);

    ProductResponse findById(Long id);

    ProductResponse save(ProductDTO productDTO);

    ProductResponse update(ProductDTO productDTO, Long id);

    void disabledProduct(Long id);

    List<ProductResponse> getRelatedProduct(Long id);

}
