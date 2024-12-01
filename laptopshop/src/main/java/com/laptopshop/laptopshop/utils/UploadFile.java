package com.laptopshop.laptopshop.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UploadFile {

    // Đường dẫn lưu trữ ảnh trong thư mục uploads (ngoài src)
    private static final String UPLOAD_DIR = "uploads/product_img/";

    private void makeDirectoryIfNotExists() {
        Path imgPath = Paths.get(UPLOAD_DIR);

        try {
            if (Files.notExists(imgPath)) {
                Files.createDirectories(imgPath);
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public String uploadFile(MultipartFile multipartFile) {
        makeDirectoryIfNotExists();
        // Tạo tên file duy nhất bằng UUID
        String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        try {
            Files.write(filePath, multipartFile.getBytes());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        // Trả về đường dẫn của ảnh (trong thư mục uploads, có thể truy cập từ URL)
        return "/product_img/" + fileName;
    }

}

