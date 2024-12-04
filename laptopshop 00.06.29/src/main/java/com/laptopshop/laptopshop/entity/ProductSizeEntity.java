package com.laptopshop.laptopshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "product_sizes")
public class ProductSizeEntity extends BaseEntity {

    @Column(name = "screen_size")
    private String screenSize;

    @OneToMany(mappedBy = "productSizeEntity", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    @JsonBackReference
    private List<ProductEntity> productEntities = new ArrayList<>();
}
