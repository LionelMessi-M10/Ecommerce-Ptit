package com.laptopshop.laptopshop.entity;

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
@Table(name = "colors")
public class ColorEntity extends BaseEntity {

    @Column(name = "color_name")
    private String colorName;

    @Column(name = "enabled")
    private Short enabled;

    @OneToMany(mappedBy = "colorEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<ProductEntity> productEntities = new ArrayList<>();
}
