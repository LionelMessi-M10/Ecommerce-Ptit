package com.laptopshop.laptopshop.controller.seller;

import com.laptopshop.laptopshop.constant.Constant;
import com.laptopshop.laptopshop.models.dto.RamDTO;
import com.laptopshop.laptopshop.entity.RamEntity;
import com.laptopshop.laptopshop.models.response.CoreResponse;
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

    @GetMapping("/getAllRams")
    public ResponseEntity<CoreResponse> getAllRams() {
        List<RamEntity> ramList = ramService.getAllRams();
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(ramList)
                .setPageNumber(1)  // Giả sử trang hiện tại là 1
                .setPageSize(ramList.size())  // Số lượng RAM trong danh sách
                .setTotalElements(ramList.size())  // Tổng số phần tử
                .setTotalPages(1);  // Giả sử có 1 trang

        return ResponseEntity.ok(response);
    }

    @GetMapping("/ram/{id}")
    public ResponseEntity<CoreResponse> getRamById(@PathVariable Long id) {
        Optional<RamEntity> ramEntity = ramService.getRamById(id);
        CoreResponse response = new CoreResponse();
        if (ramEntity.isPresent()) {
            response.setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(ramEntity.get());
            return ResponseEntity.ok(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/createRam")
    public ResponseEntity<CoreResponse> createRam(@RequestBody RamDTO ramDTO) {
        RamEntity createdRam = ramService.createRam(ramDTO);
        CoreResponse response = new CoreResponse()
                .setCode(Constant.SUCCESS)
                .setMessage(Constant.SUCCESS_MESSAGE)
                .setData(createdRam);

        return ResponseEntity.status(Constant.SUCCESS).body(response);
    }

    @PutMapping("/updateRam/{id}")
    public ResponseEntity<CoreResponse> updateRam(@PathVariable Long id, @RequestBody RamDTO ramDTO) {
        RamEntity updatedRam = ramService.updateRam(id, ramDTO);
        CoreResponse response = new CoreResponse();
        if (updatedRam != null) {
            response.setCode(Constant.SUCCESS)
                    .setMessage(Constant.SUCCESS_MESSAGE)
                    .setData(updatedRam);
            return ResponseEntity.ok(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/deleteRam/{id}")
    public ResponseEntity<CoreResponse> deleteRam(@PathVariable Long id) {
        boolean isDeleted = ramService.deleteRam(id);
        CoreResponse response = new CoreResponse();
        if (isDeleted) {
            response.setCode(Constant.NO_CONTENT)
                    .setMessage(Constant.NO_CONTENT_MESSAGE);
            return ResponseEntity.status(Constant.NO_CONTENT).body(response);
        } else {
            response.setCode(Constant.NOT_FOUND)
                    .setMessage(Constant.NOT_FOUND_MESSAGE);
            return ResponseEntity.status(Constant.NOT_FOUND).body(response);
        }
    }
}