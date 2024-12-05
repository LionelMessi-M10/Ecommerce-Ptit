package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.entity.ProductSizeEntity;
import com.laptopshop.laptopshop.models.dto.ProductSizeDTO;
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
    public List<ProductSizeEntity> getAllProductSizes() {
        return productSizeService.getAllProductSizes();
    }

    @GetMapping("/productSize/{id}")
    public ResponseEntity<ProductSizeEntity> getProductSizeById(@PathVariable Long id) {
        Optional<ProductSizeEntity> productSizeEntity = productSizeService.getProductSizeById(id);
        return productSizeEntity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createProductSize")
    public ResponseEntity<ProductSizeEntity> createProductSize(@RequestBody ProductSizeDTO productSizeDTO) {
        ProductSizeEntity createdProductSize = productSizeService.createProductSize(productSizeDTO);
        return ResponseEntity.status(201).body(createdProductSize);
    }

    @PutMapping("/updateProductSize/{id}")
    public ResponseEntity<ProductSizeEntity> updateProductSize(@PathVariable Long id, @RequestBody ProductSizeDTO productSizeDTO) {
        ProductSizeEntity updatedProductSize = productSizeService.updateProductSize(id, productSizeDTO);
        return updatedProductSize != null ? ResponseEntity.ok(updatedProductSize) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteProductSize/{id}")
    public ResponseEntity<Void> deleteProductSize(@PathVariable Long id) {
        boolean isDeleted = productSizeService.deleteProductSize(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
