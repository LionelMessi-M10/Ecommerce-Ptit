package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.ImageProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<ImageProductEntity, Long> {
}
