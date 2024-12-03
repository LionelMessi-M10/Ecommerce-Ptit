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
@Table(name = "shippings")
public class ShippingEntity extends BaseEntity {

    @Column(name = "shipper_name")
    private String shipperName;

    @Column(name = "enabled")
    private Short enabled;

    @OneToMany(mappedBy = "shippingEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST })
    private List<ProductShippingEntity> productShippingEntities = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "shipping_id")
    private OrderItemEntity orderItemEntity;
}