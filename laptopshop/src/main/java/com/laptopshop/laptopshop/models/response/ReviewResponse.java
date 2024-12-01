package com.laptopshop.laptopshop.models.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ReviewResponse {

    private Long id;
    private String userName;
    private String imageUser;
    private String comment;
    private Integer rating;

}
