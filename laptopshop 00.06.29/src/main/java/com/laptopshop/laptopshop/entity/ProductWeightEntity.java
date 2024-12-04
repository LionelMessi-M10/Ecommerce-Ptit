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
@Table(name = "product_weights")
public class ProductWeightEntity extends BaseEntity {

    @Column(name = "weight")
    private String weight;

    @OneToMany(mappedBy = "productWeightEntity", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    @JsonBackReference
    private List<ProductEntity> productEntities = new ArrayList<>();
}
