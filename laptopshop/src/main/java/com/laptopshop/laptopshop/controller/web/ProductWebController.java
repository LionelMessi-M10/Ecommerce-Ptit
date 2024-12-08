package com.laptopshop.laptopshop.controller.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.models.request.ProductSearchRequest;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.models.response.ProductResponse;
import com.laptopshop.laptopshop.service.IProductService;

@RestController
@RequestMapping("${api.shop}")
public class ProductWebController {

    @Autowired
    private IProductService productService;

    @GetMapping("/searchProducts")
    public ResponseEntity<CoreResponse> searchProducts(ProductSearchRequest searchRequest,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        // Gọi service để tìm kiếm sản phẩm
        Page<ProductResponse> productResponses = productService.searchProducts(searchRequest, page, size);

        // Tạo CoreResponse trả về kết quả
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productResponses.getContent()) // Danh sách ProductResponse
                .setPageNumber(productResponses.getNumber()) // Trang hiện tại
                .setPageSize(productResponses.getSize()) // Kích thước trang
                .setTotalElements(productResponses.getTotalElements()) // Tổng số sản phẩm
                .setTotalPages(productResponses.getTotalPages()); // Tổng số trang

        return ResponseEntity.ok(coreResponse);
    }
}
