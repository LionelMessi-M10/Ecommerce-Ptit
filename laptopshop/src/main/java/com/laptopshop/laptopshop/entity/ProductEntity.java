package com.laptopshop.laptopshop.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class ProductEntity extends BaseEntity {

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "old_price")
    private Double oldPrice;

    @Column(name = "new_price")
    private Double price;

    @Column(name = "discount")
    private Float discount;

    @Column(name = "stock")
    private Long stock;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "enabled")
    private Short enabled;

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST }, orphanRemoval = true)
    private List<ReviewEntity> reviewEntities = new ArrayList<>();

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST }, orphanRemoval = true)
    private List<VariantEntity> variantEntities = new ArrayList<>();

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST }, orphanRemoval = true)
    private List<OrderItemEntity> orderItemEntities = new ArrayList<>();

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST }, orphanRemoval = true)
    private List<ProductShippingEntity> productShippingEntities = new ArrayList<>();

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE,
            CascadeType.PERSIST }, orphanRemoval = true)
    private List<CartItemEntity> cartItemEntities = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name = "product_coupons", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "coupon_id"))
    private List<CouponEntity> couponEntities = new ArrayList<>();

    @OneToMany(mappedBy = "productEntity", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST }, orphanRemoval = true)
    private List<ImageProductEntity> imageProductEntities = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "color_id")
    private ColorEntity colorEntity;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brandEntity;

    @ManyToOne
    @JoinColumn(name = "product_size_id")
    private ProductSizeEntity productSizeEntity;

    @ManyToOne
    @JoinColumn(name = "product_weight_id")
    private ProductWeightEntity productWeightEntity;

    @ManyToOne
    @JoinColumn(name = "product_ram_id")
    private RamEntity ramEntity;

    @ManyToMany(mappedBy = "productEntities")
    private List<WishlistEntity> wishlistEntities = new ArrayList<>();
}
