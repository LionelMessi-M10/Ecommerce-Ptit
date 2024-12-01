package com.laptopshop.laptopshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_shippings")
public class ProductShippingEntity extends BaseEntity {

    @Column(name = "ship_change")
    private Double shipChange; // gia ship

    @Column(name = "free")
    private Short free;

    @Column(name = "estimated_day") // ngay du kien giao hang
    private Date estimatedDay;

    @ManyToOne
    @JoinColumn(name = "shipping_id")
    private ShippingEntity shippingEntity;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;

}
