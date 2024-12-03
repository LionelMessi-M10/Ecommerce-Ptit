package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.RamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RamRepository extends JpaRepository<RamEntity, Long> {
}
