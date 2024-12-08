package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.entity.RoleEntity;
import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.exception.PermissionDenyException;
import com.laptopshop.laptopshop.models.dto.UserDTO;
import com.laptopshop.laptopshop.repository.RoleRepository;
import com.laptopshop.laptopshop.repository.UserRepository;
import com.laptopshop.laptopshop.service.IUserService;
import com.laptopshop.laptopshop.utils.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));
    }

    @Override
    public UserEntity createUser(UserDTO userDTO, String requestUserEmail) throws Exception {

        String email = userDTO.getEmail();

        if(userRepository.existsByEmail(email)) {
            throw new DataIntegrityViolationException("Email already exists");
        }


        Optional<UserEntity> adminUser = userRepository.findByEmailWithRoles(requestUserEmail);
        if (adminUser.isPresent() && !isAdmin(requestUserEmail)) {
            throw new PermissionDenyException("You do not have permission to create an admin account");
        }

        RoleEntity roleEntity = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found"));
        System.out.println("Role Code: " + roleEntity.getRoleCode());

        if(roleEntity.getRoleCode().toUpperCase().equals(RoleEntity.ADMIN)) {
            // Kiểm tra lại xem người yêu cầu có phải là admin không
            if (!isAdmin(requestUserEmail)) {
                throw new PermissionDenyException("You cannot register an admin account");
            }
        }

        UserEntity newUser = UserEntity.builder()
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .telephone(userDTO.getTelephone())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .image(userDTO.getImage())
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

    @Transactional
    public boolean isAdmin(String email) {
        Optional<UserEntity> user = userRepository.findByEmailWithRoles(email);
        return user.isPresent() && user.get().getRoleEntities().stream()
                .anyMatch(role -> role.getRoleCode().equals(RoleEntity.ADMIN));
    }

    @Transactional
    @Override
    public UserEntity updateUser(Long userId, UserDTO userDTO, String requestUserEmail) throws Exception {
        try {
            if (!isAdmin(requestUserEmail)) {
                throw new PermissionDenyException("You do not have permission to update this user");
            }

            UserEntity existingUser = userRepository.findById(userId)
                    .orElseThrow(() -> new DataNotFoundException("User not found"));
            System.out.println("user find: " + existingUser);

            if (userDTO.getUserName() != null) {
                existingUser.setUserName(userDTO.getUserName());
            }
            if (userDTO.getEmail() != null) {
                existingUser.setEmail(userDTO.getEmail());
            }
            if (userDTO.getTelephone() != null) {
                existingUser.setTelephone(userDTO.getTelephone());
            }

            if (userDTO.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }

            if (userDTO.getRoleId() != null) {
                RoleEntity newRole = roleRepository.findById(userDTO.getRoleId())
                        .orElseThrow(() -> new DataNotFoundException("Role not found"));
                List<RoleEntity> roles = new ArrayList<>();
                roles.add(newRole);
                existingUser.setRoleEntities(roles);
            }

            if (userDTO.getImage() != null && !userDTO.getImage().isEmpty()) {
                existingUser.setImage(userDTO.getImage());
            }
            existingUser.setUpdatedBy(requestUserEmail);
            System.out.println("Updated user: " + existingUser);

            return userRepository.save(existingUser);
        } catch (DataNotFoundException | PermissionDenyException e) {
            // Logging error message for specific exceptions
            System.out.println("Error during update process: {}"+ e.getMessage());
            throw e; // Re-throw to propagate the error
        } catch (DataIntegrityViolationException e) {
            System.out.println("Data integrity error: {}"+ e.getMessage());
            throw new Exception("Error updating data due to integrity violation", e); // Throw more specific exception
        } catch (Exception e) {
            // Log general exception
            System.out.println("Unexpected error during update: {}"+ e.getMessage() + e);
            throw e; // Re-throw unexpected exceptions
        }
    }


    @Override
    public void deleteUser(Long userId,String requestUserEmail) throws Exception {
        if (!isAdmin(requestUserEmail)) {
            throw new PermissionDenyException("You do not have permission to delete this user");
        }
        UserEntity userToDelete = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("User not found"));

        userRepository.delete(userToDelete);
    }
}
