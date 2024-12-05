package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.converter.ProductConverter;
import com.laptopshop.laptopshop.entity.ImageProductEntity;
import com.laptopshop.laptopshop.entity.ProductEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.models.dto.ProductDTO;
import com.laptopshop.laptopshop.models.request.ProductSearchRequest;
import com.laptopshop.laptopshop.models.response.ProductResponse;
import com.laptopshop.laptopshop.repository.*;
import com.laptopshop.laptopshop.service.IProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService implements IProductService {

    private final ProductConverter productConverter;
    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ProductWeightRepository productWeightRepository;
    private final RamRepository ramRepository;
    private final VariantRepository variantRepository;

    @Override
    public List<ProductResponse> getAllProducts() {
        List<ProductEntity> products = productRepository.findAll();
        return products.stream().map(productConverter::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public Page<ProductResponse> getAllProductsPages(Pageable pageable) {
        // Lấy danh sách sản phẩm từ repository, phân trang theo Pageable
        Page<ProductEntity> productEntities = productRepository.findAll(pageable);

        // Chuyển đổi ProductEntity sang ProductResponse
        List<ProductResponse> productResponses = productEntities.getContent().stream()
                .map(productConverter::convertToResponse)
                .collect(Collectors.toList());

        // Trả về Page chứa danh sách ProductResponse
        return new PageImpl<>(productResponses, pageable, productEntities.getTotalElements());
    }

    @Override
    public Page<ProductResponse> getProductPage(ProductSearchRequest productSearchRequest) {
        Pageable pageable = PageRequest.of(productSearchRequest.getPage() - 1, productSearchRequest.getSize());

        Page<ProductEntity> productEntityPage = productRepository.searchProducts(productSearchRequest.getKeyword(), productSearchRequest.getPriceFrom(), productSearchRequest.getPriceTo(), productSearchRequest.getRating(), productSearchRequest.getCategoryId(), pageable);

        return productEntityPage.map(productConverter::convertToResponse);
    }

    @Override
    public ProductResponse findById(Long id) {
        ProductEntity productEntity = productRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Product not found"));
        return productConverter.convertToResponse(productEntity);
    }

    @Transactional
    @Override
    public ProductResponse save(ProductDTO productDTO) {
        try {
            System.out.println("Hello hELLO");
            ProductEntity productEntity = productConverter.convertToEntity(productDTO);
            productEntity.setEnabled((short) 1);
            System.out.println("Hello Bayby");
            productRepository.save(productEntity);

            return productConverter.convertToResponse(productEntity);
        } catch (Exception e) {
            e.printStackTrace(); // In ra thông báo lỗi chi tiết
            throw new RuntimeException("Error while saving product", e);
        }
    }

    @Transactional
    @Override
    public ProductResponse update(ProductDTO productDTO, Long id) {
        ProductEntity productEntity = productRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Product not found"));

        // Cập nhật các thuộc tính khác của sản phẩm
        productEntity.setThumbnail(productDTO.getThumbnail());
        productEntity.setProductName(productDTO.getProductName());
        productEntity.setOldPrice(productDTO.getOldPrice());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setDiscount(productDTO.getDiscount());
        productEntity.setStock(productDTO.getStock());
        productEntity.setRating(productDTO.getRating());
        productEntity.setDescription(productDTO.getDescription());
        productEntity.setLocation(productDTO.getLocation());
        productEntity.setEnabled(productDTO.getEnabled());

        // Cập nhật các quan hệ khác
        if (productDTO.getProductSizeId() != null) {
            productEntity.setProductSizeEntity(productSizeRepository.findById(productDTO.getProductSizeId()).orElse(null));
        }
        if (productDTO.getProductWeightId() != null) {
            productEntity.setProductWeightEntity(productWeightRepository.findById(productDTO.getProductWeightId()).orElse(null));
        }
        if (productDTO.getRamId() != null) {
            productEntity.setRamEntity(ramRepository.findById(productDTO.getRamId()).orElse(null));
        }
        if (!productDTO.getVariantId().isEmpty()) {
            productEntity.setVariantEntities(productDTO.getVariantId()
                    .stream()
                    .map(item -> variantRepository.findById(item).orElse(null))
                    .collect(Collectors.toList()));
        }

        if (productDTO.getImageProductPath() != null) {
            List<ImageProductEntity> updatedImages = productDTO.getImageProductPath().stream()
                    .map(item -> new ImageProductEntity(item, productEntity))
                    .collect(Collectors.toList());

            List<ImageProductEntity> currentImages = productEntity.getImageProductEntities();
            currentImages.removeIf(image -> !updatedImages.contains(image));

            productEntity.getImageProductEntities().clear();
            productEntity.getImageProductEntities().addAll(updatedImages);
        }
        // Lưu và làm mới dữ liệu
        productRepository.saveAndFlush(productEntity);

        return productConverter.convertToResponse(productEntity);
    }


    @Transactional
    @Override
    public void disabledProduct(Long id) {
        ProductEntity productEntity = productRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Product not found"));
        productEntity.setEnabled((short) 0);
        productRepository.saveAndFlush(productEntity);
    }

    @Override
    public List<ProductResponse> getRelatedProduct(Long id) {
        ProductEntity productEntity = productRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Product not found"));

        List<ProductEntity> productEntities = productRepository
                .getProductEntitiesByBrandEntity(productEntity.getBrandEntity())
                .stream()
                .filter(item -> !Objects.equals(item.getBrandEntity(), productEntity.getBrandEntity()))
                .toList();


        return productEntities.stream().map(productConverter::convertToResponse).collect(Collectors.toList());
    }
}
