package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.entity.BrandEntity;
import com.laptopshop.laptopshop.models.dto.BrandDTO;
import com.laptopshop.laptopshop.models.response.BrandResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IBrandService {

    List<BrandResponse> getAllBrands();

    Page<BrandResponse> getBrandPage(int page, int limit);

    BrandDTO findById(Long id);

    BrandEntity save(BrandDTO brandDTO);

    void disabledBrand(Long id);

    void deleteById(Long id);
}
