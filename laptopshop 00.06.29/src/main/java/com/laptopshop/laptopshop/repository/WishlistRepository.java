package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.WishlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistEntity, Long> {
}
