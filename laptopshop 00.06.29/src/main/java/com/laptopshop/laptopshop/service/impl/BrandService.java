package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.converter.BrandConverter;
import com.laptopshop.laptopshop.entity.BrandEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.models.dto.BrandDTO;
import com.laptopshop.laptopshop.models.response.BrandResponse;
import com.laptopshop.laptopshop.repository.BrandRepository;
import com.laptopshop.laptopshop.service.IBrandService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BrandService implements IBrandService {

    private final BrandRepository brandRepository;
    private final BrandConverter brandConverter;

    @Override
    public List<BrandResponse> getAllBrands() {

        List<BrandEntity> brandEntityList = brandRepository.findAll();

        return brandEntityList.stream()
                .map(brandConverter::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<BrandResponse> getBrandPage(int page, int limit) {
        Pageable pageable = PageRequest.of(page, limit);

        Page<BrandEntity> brandResponses = brandRepository.findAll(pageable);

        return brandResponses.map(brandConverter::convertToResponse);
    }

    @Override
    public BrandDTO findById(Long id) {

        BrandEntity brandEntity = brandRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Brand not found"));

        return brandConverter.convertToDTO(brandEntity);
    }

    @Transactional
    @Override
    public BrandEntity save(BrandDTO brandDTO) {
        BrandEntity newBrandEntity = brandConverter.convertToEntity(brandDTO);
        newBrandEntity.setStatus((short) 1);
        return brandRepository.save(newBrandEntity);
    }

    @Transactional
    @Override
    public void disabledBrand(Long id) {
        BrandEntity brandEntity = brandRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Brand not found"));

        brandEntity.setStatus((short) 0);
        brandRepository.saveAndFlush(brandEntity);
    }

    @Override
    public void deleteById(Long id) {
        BrandEntity deleteEntity = brandRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Brand not found"));

        brandRepository.delete(deleteEntity);
    }
}
