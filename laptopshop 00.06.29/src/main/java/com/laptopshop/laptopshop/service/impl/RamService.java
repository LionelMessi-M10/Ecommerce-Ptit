package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.entity.RamEntity;
import com.laptopshop.laptopshop.models.dto.RamDTO;
import com.laptopshop.laptopshop.repository.RamRepository;
import com.laptopshop.laptopshop.service.IRamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RamService implements IRamService {

    private final RamRepository ramRepository;

    @Autowired
    public RamService(RamRepository ramRepository) {
        this.ramRepository = ramRepository;
    }

    @Override
    public List<RamEntity> getAllRams() {
        return ramRepository.findAll();
    }

    @Override
    public Optional<RamEntity> getRamById(Long id) {
        return ramRepository.findById(id);
    }

    @Override
    public RamEntity createRam(RamDTO ramDTO) {
        RamEntity ramEntity = new RamEntity();
        ramEntity.setRam(ramDTO.getRam());
        // Optional: set product entities if needed
        // ramEntity.setProductEntities(...);
        return ramRepository.save(ramEntity);
    }

    @Override
    public RamEntity updateRam(Long id, RamDTO ramDTO) {
        Optional<RamEntity> existingRam = ramRepository.findById(id);
        if (existingRam.isPresent()) {
            RamEntity ramEntity = existingRam.get();
            ramEntity.setRam(ramDTO.getRam());
            // Optional: update product entities if needed
            // ramEntity.setProductEntities(...);
            return ramRepository.save(ramEntity);
        }
        return null;
    }

    @Override
    public boolean deleteRam(Long id) {
        Optional<RamEntity> ramEntity = ramRepository.findById(id);
        if (ramEntity.isPresent()) {
            ramRepository.delete(ramEntity.get());
            return true;
        }
        return false;
    }
}
