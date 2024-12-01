package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.VariantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariantRepository extends JpaRepository<VariantEntity, Long> {
}
