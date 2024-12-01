package com.laptopshop.laptopshop.models.response;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

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
    private List<String> imageProductPaths;
    private String colorProduct;
    private String brandProduct;

}
