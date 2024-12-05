package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.entity.ProductWeightEntity;
import com.laptopshop.laptopshop.models.dto.ProductWeightDTO;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.service.IProductWeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${api.seller}")
public class ProductWeightController {

    private final IProductWeightService productWeightService;

    @Autowired
    public ProductWeightController(IProductWeightService productWeightService) {
        this.productWeightService = productWeightService;
    }

    @GetMapping("/productWeight")
    public ResponseEntity<CoreResponse> getAllProductWeights() {
        List<ProductWeightEntity> productWeights = productWeightService.getAllProductWeights();
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productWeights)
                .setPageNumber(1)
                .setPageSize(productWeights.size())
                .setTotalElements(productWeights.size())
                .setTotalPages(1);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/productWeight/{id}")
    public ResponseEntity<CoreResponse> getProductWeightById(@PathVariable Long id) {
        Optional<ProductWeightEntity> productWeightEntity = productWeightService.getProductWeightById(id);
        CoreResponse response = new CoreResponse();
        if (productWeightEntity.isPresent()) {
            response.setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(productWeightEntity.get());
            return ResponseEntity.ok(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/createProductWeight")
    public ResponseEntity<CoreResponse> createProductWeight(@RequestBody ProductWeightDTO productWeightDTO) {
        ProductWeightEntity createdProductWeight = productWeightService.createProductWeight(productWeightDTO);
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(createdProductWeight);

        return ResponseEntity.status(Constant.SUCCESS).body(response);
    }

    @PutMapping("/updateProductWeight/{id}")
    public ResponseEntity<CoreResponse> updateProductWeight(@PathVariable Long id, @RequestBody ProductWeightDTO productWeightDTO) {
        ProductWeightEntity updatedProductWeight = productWeightService.updateProductWeight(id, productWeightDTO);
        CoreResponse response = new CoreResponse();
        if (updatedProductWeight != null) {
            response.setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(updatedProductWeight);
            return ResponseEntity.ok(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/deleteProductWeight/{id}")
    public ResponseEntity<CoreResponse> deleteProductWeight(@PathVariable Long id) {
        boolean isDeleted = productWeightService.deleteProductWeight(id);
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