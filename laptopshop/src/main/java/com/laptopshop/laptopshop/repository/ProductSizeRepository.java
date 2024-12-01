package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.ProductSizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSizeEntity, Long> {
}
