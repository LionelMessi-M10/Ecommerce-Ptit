package com.laptopshop.laptopshop.controller.admin;

import com.laptopshop.laptopshop.entity.RoleEntity;
import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.exception.PermissionDenyException;
import com.laptopshop.laptopshop.models.dto.UserDTO;
import com.laptopshop.laptopshop.repository.UserRepository;
import com.laptopshop.laptopshop.service.IUserService;
import com.laptopshop.laptopshop.utils.JwtUtil;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${api.admin}")
public class UserController {

    private final IUserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public UserController(IUserService userService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        UserEntity user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @Transactional
    @PostMapping("/create")
    public ResponseEntity<UserEntity> createUserAsAdmin(
            @RequestBody UserDTO userDTO,
            @RequestHeader("Authorization") String token) throws Exception {

        String adminEmail = verifyAdminToken(token);

        UserEntity createdUser = userService.createUser(userDTO, adminEmail);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<UserEntity> updateUserAsAdmin(
            @PathVariable Long id,
            @RequestBody UserDTO userDTO,
            @RequestHeader("Authorization") String token) throws Exception {

        try {
            // Xác minh token
            String adminEmail = verifyAdminToken(token);

            // Cập nhật người dùng
            UserEntity updatedUser = userService.updateUser(id, userDTO, adminEmail);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserAsAdmin(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) throws Exception {

        String adminEmail = verifyAdminToken(token);

        userService.deleteUser(id, adminEmail);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.NO_CONTENT);
    }

    private String verifyAdminToken(String token) throws Exception {
        if (token == null || !token.startsWith("Bearer ")) {
            throw new PermissionDenyException("No token provided");
        }
        String jwtToken = token.substring(7);
        String adminEmail = jwtUtil.extractUsername(jwtToken);  // Giải mã và lấy email từ JWT

        // Kiểm tra xem email có phải của admin không
        if (!userService.isAdmin(adminEmail)) {
            throw new PermissionDenyException("Only admin can perform this action");
        }
        return adminEmail;  // Trả về email của admin
    }
}
