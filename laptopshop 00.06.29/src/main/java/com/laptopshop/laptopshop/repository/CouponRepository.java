package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.CouponEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<CouponEntity, Long> {
}
