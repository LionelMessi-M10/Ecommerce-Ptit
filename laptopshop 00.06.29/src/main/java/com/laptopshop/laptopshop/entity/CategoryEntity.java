package com.laptopshop.laptopshop.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class CategoryEntity extends BaseEntity {

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_image")
    private String categoryImage;

    @Column(name = "color_category")
    private String colorCategory;

    @Column(name = "enabled")
    private Short enabled;

    @OneToMany(
            mappedBy = "categoryEntity",
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST},
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<BrandEntity> brandEntities = new ArrayList<>();
}
