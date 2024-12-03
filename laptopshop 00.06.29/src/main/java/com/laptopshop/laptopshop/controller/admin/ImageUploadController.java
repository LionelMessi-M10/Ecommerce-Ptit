package com.laptopshop.laptopshop.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("${api.admin}")
public class ImageUploadController {

    // Thư mục lưu trữ tệp hình ảnh trên server
    private static final String UPLOAD_DIR = "./upload/";

    // Tạo URL hình ảnh sau khi tải lên
    private static final String IMAGE_URL_PREFIX = "/images/";

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile imageFile) throws IOException {
        // Kiểm tra xem tệp có hợp lệ không
        if (imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("No image file selected");
        }

        // Lấy tên tệp gốc và đảm bảo nó hợp lệ
        String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());

        // Đường dẫn lưu tệp trên hệ thống
        Path targetLocation = Paths.get(UPLOAD_DIR + fileName);

        // Tạo thư mục nếu chưa tồn tại
        Files.createDirectories(targetLocation.getParent());

        // Lưu tệp vào thư mục đã chỉ định
        Files.copy(imageFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Trả về URL hình ảnh (có thể sử dụng URL tùy chỉnh để truy cập hình ảnh)
        String imageUrl = IMAGE_URL_PREFIX + fileName;

        return ResponseEntity.ok(imageUrl);
    }
}
