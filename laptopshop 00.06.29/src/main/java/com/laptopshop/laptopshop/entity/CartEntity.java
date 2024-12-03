package com.laptopshop.laptopshop.entity;

import java.util.ArrayList;
import java.util.List;

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
@Table(name = "carts")
public class CartEntity extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private UserEntity userEntity;

    @OneToMany(mappedBy = "cartEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST }, orphanRemoval = true)
    private List<CartItemEntity> cartItemEntities = new ArrayList<>();
}
