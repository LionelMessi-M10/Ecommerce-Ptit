package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.ProductWeightEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductWeightRepository extends JpaRepository<ProductWeightEntity, Long> {
}
