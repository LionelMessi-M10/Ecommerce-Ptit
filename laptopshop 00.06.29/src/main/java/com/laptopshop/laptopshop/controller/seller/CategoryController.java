package com.laptopshop.laptopshop.controller.seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.entity.CategoryEntity;
import com.laptopshop.laptopshop.models.response.CoreResponse;
import com.laptopshop.laptopshop.service.ICategoryService;
import com.laptopshop.laptopshop.utils.UploadFile;

@RestController
@RequestMapping("${api.seller}/categories")
public class CategoryController {

	@Autowired
	private UploadFile uploadFile;

	@Autowired
	private ICategoryService categoryService;

	@GetMapping("/all")
	public ResponseEntity<CoreResponse> getAllCategories() {
		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE)
				.setData(categoryService.getAllCategories());

		return ResponseEntity.ok(coreResponse);
	}

	@GetMapping(value = { "", "/" })
	public ResponseEntity<CoreResponse> getCategoryPage(@RequestParam("page") int page,
			@RequestParam("limit") int limit) {

		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE)
				.setData(categoryService.getCategoryPage(page - 1, limit));

		return ResponseEntity.ok(coreResponse);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CoreResponse> getCategoryById(@PathVariable Long id) {
		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE)
				.setData(categoryService.findById(id));

		return ResponseEntity.ok(coreResponse);
	}

	@PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<CoreResponse> createCategory(
			@RequestPart(value = "category", required = false) CategoryEntity categoryEntity,
			@RequestPart(value = "imageCategory", required = false) MultipartFile multipartFile) {

		if (multipartFile != null)
			categoryEntity.setCategoryImage(uploadFile.uploadFile(multipartFile));

		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE)
				.setData(categoryService.save(categoryEntity));

		return ResponseEntity.ok(coreResponse);
	}

	@PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> updateCategory(@PathVariable("id") Long id,
			@RequestPart(value = "category", required = false) CategoryEntity categoryEntity,
			@RequestPart(value = "imageCategory", required = false) MultipartFile multipartFile) {

		if (multipartFile != null)
			categoryEntity.setCategoryImage(uploadFile.uploadFile(multipartFile));

		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE)
				.setData(categoryService.update(categoryEntity, id));

		return ResponseEntity.ok(coreResponse);
	}

	@PutMapping("/delete/{id}")
	public ResponseEntity<?> disabledCategory(@PathVariable("id") Long id) {

		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE)
				.setData(categoryService.disabledCategory(id));

		return ResponseEntity.ok(coreResponse);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id) {
		categoryService.deleteById(id);

		CoreResponse coreResponse = new CoreResponse()
				.setCode(Constant.SUCCESS)
				.setMessage(Constant.SUCCESS_MESSAGE);

		return ResponseEntity.ok(coreResponse);
	}
}
