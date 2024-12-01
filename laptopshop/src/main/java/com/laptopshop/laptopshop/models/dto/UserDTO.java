package com.laptopshop.laptopshop.models.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserDTO {

    // register, profile
    private Long id;
    private String image;
    private String userName;
    private String email;
    private String password;
    private String telephone;

    private Long roleId;

    // checkout
    private String country;
    private String streetAddress;
    private String addressOptional;
    private String city;
    private String stateOrCounty;
    private String zipCode;
}
