package com.laptopshop.laptopshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "image_product")
public class ImageProductEntity extends BaseEntity {

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;

}
