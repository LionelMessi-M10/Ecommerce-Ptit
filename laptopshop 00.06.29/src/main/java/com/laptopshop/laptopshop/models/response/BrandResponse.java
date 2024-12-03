package com.laptopshop.laptopshop.models.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class BrandResponse {

    private Long id;
    private String categoryImage;
    private String categoryName;
    private String brandName;
}
