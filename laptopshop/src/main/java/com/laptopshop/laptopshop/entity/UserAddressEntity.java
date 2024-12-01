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
@Table(name = "user_addresses")
public class UserAddressEntity extends BaseEntity {

    @Column(name = "country")
    private String country;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "address_optional")
    private String addressOptional;

    @Column(name = "city")
    private String city;

    @Column(name = "state_or_county")
    private String stateOrCounty;

    @Column(name = "zip_code")
    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private UserEntity userEntity;
}
