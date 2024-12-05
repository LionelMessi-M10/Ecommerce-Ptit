package com.laptopshop.laptopshop.models.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class CoreResponse {
    private int code;
    private String message;
    public Object data;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
}
