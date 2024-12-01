package com.laptopshop.laptopshop.converter;

import com.laptopshop.laptopshop.entity.ImageProductEntity;
import com.laptopshop.laptopshop.entity.ProductEntity;
import com.laptopshop.laptopshop.models.dto.ProductDTO;
import com.laptopshop.laptopshop.models.response.ProductResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductConverter {

    @Autowired
    private ModelMapper modelMapper;

    public ProductEntity convertToEntity(ProductDTO productDTO) {
        return null;
    }

    public ProductResponse convertToResponse(ProductEntity productEntity) {
        ProductResponse productResponse = new ProductResponse()
                .setId(productEntity.getId())
                .setProductName(productEntity.getProductName())
                .setThumbnail(productEntity.getThumbnail())
                .setOldPrice(productEntity.getOldPrice())
                .setPrice(productEntity.getPrice())
                .setDiscount(productEntity.getDiscount())
                .setStock(productEntity.getStock())
                .setDescription(productEntity.getDescription())
                .setLocation(productEntity.getLocation());

        productResponse.setProductSize(productEntity.getProductSizeEntity().getScreenSize());
        productResponse.setWeight(productEntity.getProductWeightEntity().getWeight());
        productResponse.setRam(productEntity.getRamEntity().getRam());
        productResponse.setColorProduct(productEntity.getColorEntity().getColorName());
        productResponse.setBrandProduct(productEntity.getBrandEntity().getBrandName());

        List<String> images = new ArrayList<>();

        for (ImageProductEntity item : productEntity.getImageProductEntities()) {
            String image = item.getImage();
            images.add(image);
        }

        productResponse.setImageProductPaths(images);

        return productResponse;
    }
}
