package com.laptopshop.laptopshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "brands")
public class BrandEntity extends BaseEntity {

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "status")
    private Short status;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id")
    private CategoryEntity categoryEntity;

    @OneToMany(mappedBy = "brandEntity", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<ProductEntity> productEntities = new ArrayList<>();
}
