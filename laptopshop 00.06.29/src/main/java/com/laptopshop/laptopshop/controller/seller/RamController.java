package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.models.dto.RamDTO;
import com.laptopshop.laptopshop.entity.RamEntity;
import com.laptopshop.laptopshop.service.IRamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${api.seller}")
public class RamController {

    private final IRamService ramService;

    @Autowired
    public RamController(IRamService ramService) {
        this.ramService = ramService;
    }

    @GetMapping("/rams")
    public List<RamEntity> getAllRams() {
        return ramService.getAllRams();
    }

    @GetMapping("/ram/{id}")
    public ResponseEntity<RamEntity> getRamById(@PathVariable Long id) {
        Optional<RamEntity> ramEntity = ramService.getRamById(id);
        return ramEntity.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/createRam")
    public ResponseEntity<RamEntity> createRam(@RequestBody RamDTO ramDTO) {
        RamEntity createdRam = ramService.createRam(ramDTO);
        return ResponseEntity.status(201).body(createdRam);
    }

    @PutMapping("/updateRam/{id}")
    public ResponseEntity<RamEntity> updateRam(@PathVariable Long id, @RequestBody RamDTO ramDTO) {
        RamEntity updatedRam = ramService.updateRam(id, ramDTO);
        return updatedRam != null ? ResponseEntity.ok(updatedRam) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/deleteRam/{id}")
    public ResponseEntity<Void> deleteRam(@PathVariable Long id) {
        boolean isDeleted = ramService.deleteRam(id);
        return isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
