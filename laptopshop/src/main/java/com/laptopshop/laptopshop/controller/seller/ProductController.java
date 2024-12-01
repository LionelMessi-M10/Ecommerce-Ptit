package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.models.dto.ProductDTO;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.service.IProductService;
import com.laptopshop.laptopshop.utils.UploadFile;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.seller}/products")
public class ProductController {

    private final UploadFile uploadFile;
    private final IProductService productService;

    public ProductController(UploadFile uploadFile, IProductService productService) {
        this.uploadFile = uploadFile;
        this.productService = productService;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> disabledProduct(@PathVariable("id") Long id) {

        productService.disabledProduct(id);

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE);

        return ResponseEntity.ok(coreResponse);
    }

}
