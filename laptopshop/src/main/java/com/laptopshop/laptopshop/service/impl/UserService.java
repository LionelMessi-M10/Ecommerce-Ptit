package com.laptopshop.laptopshop.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laptopshop.laptopshop.entity.RoleEntity;
import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.exception.PermissionDenyException;
import com.laptopshop.laptopshop.models.dto.UserDTO;
import com.laptopshop.laptopshop.repository.RoleRepository;
import com.laptopshop.laptopshop.repository.UserRepository;
import com.laptopshop.laptopshop.service.IUserService;
import com.laptopshop.laptopshop.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    public UserEntity createUser(UserDTO userDTO) throws Exception {

        String email = userDTO.getEmail();

        if(userRepository.existsByEmail(email)) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        RoleEntity roleEntity = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found"));

        if(roleEntity.getRoleCode().toUpperCase().equals(RoleEntity.ADMIN)) {
            throw new PermissionDenyException("You cannot register an admin account");
        }

        UserEntity newUser = UserEntity.builder()
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .telephone(userDTO.getTelephone())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();

        newUser.setRoleEntities(List.of(roleEntity));

        return userRepository.save(newUser);
    }

    @Override
    public String login(String email, String password) throws Exception {

        Optional<UserEntity> loginUser = userRepository.findByEmail(email);

        if(loginUser.isEmpty()) {
            throw new DataNotFoundException("Invalid phone number / password");
        }

        UserEntity existingUser = loginUser.get();

        if(!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new DataNotFoundException("Wrong email or password");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password, existingUser.getAuthorities()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        return jwtUtil.generateToken(userDetails);
    }
}
