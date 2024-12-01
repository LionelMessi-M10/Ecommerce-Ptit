package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.models.dto.BrandDTO;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.service.IBrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.seller}/brands")
public class BrandController {

    @Autowired
    private IBrandService brandService;

    @GetMapping("/all")
    public ResponseEntity<CoreResponse> getAllBrand() {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(brandService.getAllBrands());

        return ResponseEntity.ok(coreResponse);
    }

    @GetMapping(value = {"", "/"})
    public ResponseEntity<CoreResponse> getBrandPage(@RequestParam("page") int page,
                                                     @RequestParam("limit") int limit) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(brandService.getBrandPage(page - 1, limit));

        return ResponseEntity.ok(coreResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoreResponse> getBrandById(@PathVariable Long id) {
        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(brandService.findById(id));

        return ResponseEntity.ok(coreResponse);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBrand(@Valid @RequestBody(required = false) BrandDTO brandDTO, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                List<String> errorMessages = bindingResult.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }

            CoreResponse coreResponse = new CoreResponse()
                    .setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(brandService.save(brandDTO));


            return ResponseEntity.ok(coreResponse);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage()); // rule 5
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CoreResponse> updateBrand(@PathVariable("id") Long id, @RequestBody(required = false) BrandDTO brandDTO) {

        return null;
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<CoreResponse> disabledBrand(@PathVariable("id") Long id) {
        brandService.disabledBrand(id);

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE);

        return ResponseEntity.ok(coreResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CoreResponse> deleteBrand(@PathVariable("id") Long id) {
        brandService.deleteById(id);

        CoreResponse coreResponse = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE);

        return ResponseEntity.ok(coreResponse);
    }

}
