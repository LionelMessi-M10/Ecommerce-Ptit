package com.laptopshop.laptopshop.models.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RamDTO {
    private Long id;
    private String ram;
    private List<Long> productIds;
}
