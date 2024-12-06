package com.laptopshop.laptopshop.controller.web;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.models.request.ProductSearchRequest;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.service.IProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.shop}")
public class ShopController {

    private final IProductService productService;

    public ShopController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllProducts() {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productService.getAllProducts());

        return ResponseEntity.ok(coreResponse);
    }

    @GetMapping(value = {"", "/"})
    public ResponseEntity<CoreResponse> getProductPage(@RequestBody(required = false) ProductSearchRequest productSearchRequest) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productService.getProductPage(productSearchRequest));

        return ResponseEntity.ok(coreResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse> getProductById(@PathVariable Long id) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productService.findById(id));

        return ResponseEntity.ok(coreResponse);
    }

    @GetMapping("/related-product/{id}")
    public ResponseEntity<CoreResponse> getRelatedProduct(@PathVariable Long id) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(productService.getRelatedProduct(id));

        return ResponseEntity.ok(coreResponse);
    }


}
