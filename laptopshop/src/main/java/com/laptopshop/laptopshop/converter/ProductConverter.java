package com.laptopshop.laptopshop.converter;

import com.laptopshop.laptopshop.entity.*;
import com.laptopshop.laptopshop.models.dto.ProductDTO;
import com.laptopshop.laptopshop.models.response.ProductResponse;
import com.laptopshop.laptopshop.repository.ProductSizeRepository;
import com.laptopshop.laptopshop.repository.ProductWeightRepository;
import com.laptopshop.laptopshop.repository.RamRepository;
import com.laptopshop.laptopshop.repository.VariantRepository;
import com.laptopshop.laptopshop.service.impl.CategoryService;
import com.laptopshop.laptopshop.service.impl.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductConverter {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductWeightRepository productWeightRepository;
    @Autowired
    private RamRepository ramRepository;
    @Autowired
    private VariantRepository variantRepository;

    public ProductEntity convertToEntity(ProductDTO productDTO) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setProductName(productDTO.getProductName());
        productEntity.setThumbnail(productDTO.getThumbnail());
        productEntity.setOldPrice(productDTO.getOldPrice());
        productEntity.setPrice(productDTO.getPrice());
        productEntity.setDiscount(productDTO.getDiscount());
        productEntity.setStock(productDTO.getStock());
        productEntity.setEnabled(productDTO.getEnabled());
        productEntity.setDescription(productDTO.getDescription());
        productEntity.setLocation(productDTO.getLocation());

        // Chuyển đổi danh sách đường dẫn hình ảnh thành danh sách ImageProductEntity mà không thay đổi lớp ImageProductEntity
        List<ImageProductEntity> imageProductEntities = productDTO.getImageProductPath().stream()
                .map(path -> {
                    ImageProductEntity imageProductEntity = new ImageProductEntity();
                    imageProductEntity.setImage(path);  // Gán đường dẫn hình ảnh vào trường "image"
                    imageProductEntity.setProductEntity(productEntity);  // Gán liên kết với sản phẩm hiện tại
                    return imageProductEntity;
                })
                .collect(Collectors.toList());

        productEntity.setImageProductEntities(imageProductEntities);

        // Set related entities based on DTO
        if (productDTO.getProductSizeId() != null) {
            // Fetch ProductSizeEntity from the repository
            ProductSizeEntity productSizeEntity = productSizeRepository.findById(productDTO.getProductSizeId()).orElse(null);
            productEntity.setProductSizeEntity(productSizeEntity);
        }
        if (productDTO.getProductWeightId() != null) {
            // Fetch ProductWeightEntity from the repository
            ProductWeightEntity productWeightEntity = productWeightRepository.findById(productDTO.getProductWeightId()).orElse(null);
            productEntity.setProductWeightEntity(productWeightEntity);
        }
        if (productDTO.getRamId() != null) {
            // Fetch RamEntity from the repository
            RamEntity ramEntity = ramRepository.findById(productDTO.getRamId()).orElse(null);
            productEntity.setRamEntity(ramEntity);
        }

        // Set other attributes like variants, etc.
        if (productDTO.getVariantId() != null) {
            List<VariantEntity> variantEntities = productDTO.getVariantId().stream()
                    .map(id -> variantRepository.findById(id).orElse(null)) // assuming variant repository is available
                    .collect(Collectors.toList());
            productEntity.setVariantEntities(variantEntities);
        }


        return productEntity;
    }

    public ProductResponse convertToResponse(ProductEntity productEntity) {
        // Thay vì dùng constructor mặc định, hãy dùng constructor có tham số (ProductEntity)
        ProductResponse productResponse = new ProductResponse(productEntity);

        // Thiết lập các thuộc tính từ ProductEntity cho ProductResponse
        if (productEntity.getProductSizeEntity() != null) {
            productResponse.setProductSize(productEntity.getProductSizeEntity().getScreenSize());
        }

        if (productEntity.getProductWeightEntity() != null) {
            productResponse.setWeight(productEntity.getProductWeightEntity().getWeight());
        }

        if (productEntity.getRamEntity() != null) {
            productResponse.setRam(productEntity.getRamEntity().getRam());
        }

        if (productEntity.getColorEntity() != null) {
            productResponse.setColorProduct(productEntity.getColorEntity().getColorName());
        }

        if (productEntity.getBrandEntity() != null) {
            productResponse.setBrandProduct(productEntity.getBrandEntity().getBrandName());
        }

        List<String> images = new ArrayList<>();
        if (productEntity.getImageProductEntities() != null) {
            for (ImageProductEntity item : productEntity.getImageProductEntities()) {
                if (item.getImage() != null && !item.getImage().isEmpty()) {
                    images.add(item.getImage());
                }
            }
        }
        productResponse.setImageProductPaths(images);

        return productResponse;
    }

}
