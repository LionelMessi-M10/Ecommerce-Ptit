package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.models.dto.UserDTO;
import com.laptopshop.laptopshop.models.dto.UserLoginDTO;

public interface IUserService {

    UserEntity createUser(UserDTO userDTO) throws Exception;
    String login(String email, String password) throws Exception;
}