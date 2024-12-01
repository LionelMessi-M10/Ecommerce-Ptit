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
@Table(name = "roles")
public class RoleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_code")
    private String roleCode;

    @Column(name = "role_name")
    private String roleName;

    @ManyToMany(mappedBy = "roleEntities", fetch = FetchType.LAZY, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    private List<UserEntity> userEntities = new ArrayList<>();

    public static String ADMIN = "ROLE_ADMIN";
    public static String CUSTOMER = "ROLE_CUSTOMER";
    public static String SELLER = "ROLE_SELLER";

}
