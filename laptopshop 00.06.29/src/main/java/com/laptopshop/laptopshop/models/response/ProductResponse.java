package com.laptopshop.laptopshop.models.response;

import com.laptopshop.laptopshop.entity.ProductEntity;
import com.laptopshop.laptopshop.entity.ImageProductEntity;
import com.laptopshop.laptopshop.entity.ColorEntity;
import com.laptopshop.laptopshop.entity.BrandEntity;
import com.laptopshop.laptopshop.entity.ProductSizeEntity;
import com.laptopshop.laptopshop.entity.ProductWeightEntity;
import com.laptopshop.laptopshop.entity.RamEntity;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Accessors(chain = true)
public class ProductResponse {

    private Long id;
    private String thumbnail;
    private String productName;
    private Double oldPrice;
    private Double price;
    private Float discount;
    private Long stock;
    private String productSize;
    private String weight;
    private String ram;
    private String description;
    private String location;
    private Short enabled;
    private List<String> imageProductPaths;
    private String colorProduct;
    private String brandProduct;

    // Constructor nhận ProductEntity
    public ProductResponse(ProductEntity productEntity) {
        this.id = productEntity.getId();
        this.thumbnail = productEntity.getThumbnail();
        this.productName = productEntity.getProductName();
        this.oldPrice = productEntity.getOldPrice();
        this.price = productEntity.getPrice();
        this.discount = productEntity.getDiscount();
        this.stock = productEntity.getStock();
        this.description = productEntity.getDescription();
        this.location = productEntity.getLocation();
        this.enabled = productEntity.getEnabled();

        // Ánh xạ các trường mối quan hệ:
        this.productSize = (productEntity.getProductSizeEntity() != null) ? productEntity.getProductSizeEntity().getScreenSize() : null;
        this.weight = (productEntity.getProductWeightEntity() != null) ? productEntity.getProductWeightEntity().getWeight() : null;
        this.ram = (productEntity.getRamEntity() != null) ? productEntity.getRamEntity().getRam() : null;

        // Ánh xạ hình ảnh sản phẩm
        this.imageProductPaths = productEntity.getImageProductEntities().stream()
                .map(ImageProductEntity::getImage) // Giả sử mỗi ImageProductEntity có trường 'getImagePath()'
                .collect(Collectors.toList());

        // Ánh xạ màu sắc và thương hiệu
        this.colorProduct = (productEntity.getColorEntity() != null) ? productEntity.getColorEntity().getColorName() : null;
        this.brandProduct = (productEntity.getBrandEntity() != null) ? productEntity.getBrandEntity().getBrandName() : null;
    }
}
