package com.laptopshop.laptopshop.models.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BrandDTO {

    private Long id;

    @NotEmpty(message = "Brand's name cannot be empty")
    private String brandName;

    @NotEmpty(message = "Category Id cannot be empty")
    private Long categoryId;
}
