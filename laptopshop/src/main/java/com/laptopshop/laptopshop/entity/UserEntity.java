package com.laptopshop.laptopshop.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "users")
public class UserEntity extends BaseEntity implements UserDetails {

    @Column(name = "image")
    private String image;

    @Column(name = "username", length = 255)
    private String userName;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "password", length = 255)
    private String password;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "telephone", length = 255)
    private String telephone;

    @Column(name = "enabled")
    private Short enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(getRoleEntities().getFirst().getRoleCode().toUpperCase()));
        return authorityList;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonManagedReference
    private List<RoleEntity> roleEntities = new ArrayList<>();

    @OneToMany(mappedBy = "userEntity", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<UserAddressEntity> userAddressEntities = new ArrayList<>();

    @OneToOne(mappedBy = "userEntity", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private CartEntity cartEntity;

    @OneToMany(mappedBy = "userEntity", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<WishlistEntity> wishlistEntities = new ArrayList<>();

    @OneToMany(mappedBy = "userEntity", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<ReviewEntity> reviewEntities = new ArrayList<>();

    @OneToMany(mappedBy = "userEntity", cascade = {CascadeType.MERGE, CascadeType.PERSIST}, orphanRemoval = true)
    private List<TokenEntity> tokenEntities = new ArrayList<>();
}
