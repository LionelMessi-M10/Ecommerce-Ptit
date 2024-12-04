package com.laptopshop.laptopshop.models.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductDTO {

    private Long id;
    private String thumbnail;
    private String productName;
    private Double oldPrice;
    private Double price;
    private Float discount;
    private Long stock;
    private Integer rating;
    private Short enabled;
    private Long productSizeId;
    private Long productWeightId;
    private Long ramId;
    private String description;
    private String location;
    private List<Long> variantId;
    private List<String> imageProductPath;

}
