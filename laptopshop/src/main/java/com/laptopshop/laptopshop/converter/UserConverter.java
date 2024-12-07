package com.laptopshop.laptopshop.converter;

import org.springframework.stereotype.Component;

import com.laptopshop.laptopshop.entity.UserEntity;
import com.laptopshop.laptopshop.models.dto.UserDTO;

@Component
public class UserConverter {

    public UserDTO convertToDTO(UserEntity userEntity) {
        return null;
    }

    public UserEntity convertToEntity(UserDTO userDTO) {
        return null;
    }
}
