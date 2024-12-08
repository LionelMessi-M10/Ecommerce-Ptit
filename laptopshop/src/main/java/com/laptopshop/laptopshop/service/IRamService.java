package com.laptopshop.laptopshop.service;

import com.laptopshop.laptopshop.entity.RamEntity;
import com.laptopshop.laptopshop.models.dto.RamDTO;

import java.util.List;
import java.util.Optional;

public interface IRamService {
    List<RamEntity> getAllRams(); // Lấy tất cả RAM
    Optional<RamEntity> getRamById(Long id); // Lấy RAM theo ID
    RamEntity createRam(RamDTO ramDTO); // Tạo mới RAM
    RamEntity updateRam(Long id, RamDTO ramDTO); // Cập nhật RAM
    boolean deleteRam(Long id); // Xóa RAM
}
