package com.laptopshop.laptopshop.models.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ProductSearchRequest {

    private Integer page;
    private Integer size;
    private Long categoryId;
    private Double priceFrom;
    private Double priceTo;
    private Integer rating;
    private String keyword;

}
