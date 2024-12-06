package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.models.dto.ProductDTO;
import com.laptopshop.laptopshop.models.request.ProductSearchRequest;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.models.response.ProductResponse;
import com.laptopshop.laptopshop.service.IProductService;
import com.laptopshop.laptopshop.utils.UploadFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.seller}")
public class ProductController {

    private final UploadFile uploadFile;
    private final IProductService productService;

    public ProductController(UploadFile uploadFile, IProductService productService) {
        this.uploadFile = uploadFile;
        this.productService = productService;
    }

    @PostMapping(value = "/createProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CoreResponse> createProduct(@RequestPart(value = "product", required = false) ProductDTO productDTO,
                                                      @RequestPart(value = "imageProducts", required = false) MultipartFile[] multipartFiles) {

        if (multipartFiles != null && multipartFiles.length > 0) {
            productDTO.setImageProductPath(Arrays.stream(multipartFiles).map(uploadFile::uploadFile).collect(Collectors.toList()));
        }

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productService.save(productDTO));

        return ResponseEntity.ok(coreResponse);
    }


    @PutMapping(value = "/updateProduct/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(@PathVariable("id") Long id,
                                           @RequestPart(value = "product", required = false) ProductDTO productDTO,
                                           @RequestPart(value = "imageProducts", required = false) MultipartFile[] multipartFiles) {

        if (multipartFiles != null && multipartFiles.length > 0) {
            productDTO.setImageProductPath(Arrays.stream(multipartFiles).map(uploadFile::uploadFile).collect(Collectors.toList()));
        }

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productService.update(productDTO, id));

        return ResponseEntity.ok(coreResponse);
    }

    @PutMapping("/deleteProduct/{id}")
    public ResponseEntity<?> disabledProduct(@PathVariable("id") Long id) {
        productService.disabledProduct(id);
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE);
        return ResponseEntity.ok(coreResponse);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<CoreResponse> getAllProductsPages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        // Lấy danh sách tất cả sản phẩm từ service với phân trang
        Page<ProductResponse> productPage = productService.getAllProductsPages(pageable);

        // Tạo CoreResponse để trả về
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productPage.getContent())  // Dữ liệu sản phẩm
                .setPageNumber(productPage.getNumber())  // Trang hiện tại
                .setPageSize(productPage.getSize())  // Kích thước trang
                .setTotalElements(productPage.getTotalElements())  // Tổng số sản phẩm
                .setTotalPages(productPage.getTotalPages());  // Tổng số trang

        return ResponseEntity.ok(coreResponse);
    }




}
