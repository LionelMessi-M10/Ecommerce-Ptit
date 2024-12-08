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
@Table(name = "product_rams")
public class RamEntity extends BaseEntity {

    @Column(name = "ram")
    private String ram;

    @OneToMany(mappedBy = "ramEntity", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    @JsonBackReference
    private List<ProductEntity> productEntities = new ArrayList<>();
}
