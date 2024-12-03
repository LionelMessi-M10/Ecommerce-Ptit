package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.entity.ProductWeightEntity;
import com.laptopshop.laptopshop.models.dto.ProductWeightDTO;
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

    @GetMapping("productWeight")
    public List<ProductWeightEntity> getAllProductWeights() {
        return productWeightService.getAllProductWeights();
    }

    @GetMapping("/productWeight/{id}")
    public ResponseEntity<ProductWeightEntity> getProductWeightById(@PathVariable Long id) {
        Optional<ProductWeightEntity> productWeightEntity = productWeightService.getProductWeightById(id);
        return productWeightEntity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createProductWeight")
    public ResponseEntity<ProductWeightEntity> createProductWeight(@RequestBody ProductWeightDTO productWeightDTO) {
        ProductWeightEntity createdProductWeight = productWeightService.createProductWeight(productWeightDTO);
        return ResponseEntity.status(201).body(createdProductWeight);
    }

    @PutMapping("/updateProductWeight/{id}")
    public ResponseEntity<ProductWeightEntity> updateProductWeight(@PathVariable Long id, @RequestBody ProductWeightDTO productWeightDTO) {
        ProductWeightEntity updatedProductWeight = productWeightService.updateProductWeight(id, productWeightDTO);
        return updatedProductWeight != null ? ResponseEntity.ok(updatedProductWeight) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteProductWeight/{id}")
    public ResponseEntity<Void> deleteProductWeight(@PathVariable Long id) {
        boolean isDeleted = productWeightService.deleteProductWeight(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
