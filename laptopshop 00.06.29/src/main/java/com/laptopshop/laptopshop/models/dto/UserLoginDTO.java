package com.laptopshop.laptopshop.models.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {

    @NotBlank(message = "Phone number is required")
    private String email;

    @NotBlank(message = "Password can not be blank")
    private String password;

}