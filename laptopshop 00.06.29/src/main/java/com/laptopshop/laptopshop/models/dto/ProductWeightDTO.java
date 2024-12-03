package com.laptopshop.laptopshop.models.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductWeightDTO {
    private Long id;
    private String weight;
    private List<Long> productIds;
}
