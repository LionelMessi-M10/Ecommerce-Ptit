package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.entity.ProductSizeEntity;
import com.laptopshop.laptopshop.models.dto.ProductSizeDTO;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.service.IProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${api.seller}")
public class ProductSizeController {

    private final IProductSizeService productSizeService;

    @Autowired
    public ProductSizeController(IProductSizeService productSizeService) {
        this.productSizeService = productSizeService;
    }

    @GetMapping("/productSize")
    public ResponseEntity<CoreResponse> getAllProductSizes() {
        List<ProductSizeEntity> productSizes = productSizeService.getAllProductSizes();
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productSizes)
                .setPageNumber(1)
                .setPageSize(productSizes.size())
                .setTotalElements(productSizes.size())
                .setTotalPages(1);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/productSize/{id}")
    public ResponseEntity<CoreResponse> getProductSizeById(@PathVariable Long id) {
        Optional<ProductSizeEntity> productSizeEntity = productSizeService.getProductSizeById(id);
        CoreResponse response = new CoreResponse();
        if (productSizeEntity.isPresent()) {
            response.setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(productSizeEntity.get());
            return ResponseEntity.ok(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/createProductSize")
    public ResponseEntity<CoreResponse> createProductSize(@RequestBody ProductSizeDTO productSizeDTO) {
        ProductSizeEntity createdProductSize = productSizeService.createProductSize(productSizeDTO);
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(createdProductSize);

        return ResponseEntity.status(Constant.SUCCESS).body(response);
    }

    @PutMapping("/updateProductSize/{id}")
    public ResponseEntity<CoreResponse> updateProductSize(@PathVariable Long id, @RequestBody ProductSizeDTO productSizeDTO) {
        ProductSizeEntity updatedProductSize = productSizeService.updateProductSize(id, productSizeDTO);
        CoreResponse response = new CoreResponse();
        if (updatedProductSize != null) {
            response.setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(updatedProductSize);
            return ResponseEntity.ok(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/deleteProductSize/{id}")
    public ResponseEntity<CoreResponse> deleteProductSize(@PathVariable Long id) {
        boolean isDeleted = productSizeService.deleteProductSize(id);
        CoreResponse response = new CoreResponse();
        if (isDeleted) {
            response.setCode(Constant.NO_CONTENT)
                    .setMessage(Constant.NO_CONTENT_MESSAGE);
            return ResponseEntity.status(Constant.NO_CONTENT).body(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }
}
