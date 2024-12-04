package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getRoleEntities().stream()
                        .map(roleEntity -> new SimpleGrantedAuthority(roleEntity.getRoleCode()))
                        .collect(Collectors.toList())
        );
    }
}