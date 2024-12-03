package com.laptopshop.laptopshop.models.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductSizeDTO {
    private Long id;
    private String screenSize;
    private List<Long> productIds;
}
