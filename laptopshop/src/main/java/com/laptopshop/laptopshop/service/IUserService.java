package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.models.dto.UserDTO;
import com.laptopshop.laptopshop.models.dto.UserLoginDTO;

import java.util.List;

public interface IUserService {

    List<UserEntity> getAllUsers();
    UserEntity getUserById(Long userId);
    UserEntity createUser(UserDTO userDTO, String requestUserEmail) throws Exception;
    String login(String email, String password) throws Exception;
    boolean isAdmin(String email);
    UserEntity updateUser(Long userId, UserDTO userDTO,String requestUserEmail ) throws Exception;
    void deleteUser(Long userId,String requestUserEmail) throws Exception;
}
