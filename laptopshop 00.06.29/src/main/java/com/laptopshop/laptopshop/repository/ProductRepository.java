package com.laptopshop.laptopshop.repository;

import com.laptopshop.laptopshop.entity.BrandEntity;
import com.laptopshop.laptopshop.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    @Query("SELECT p FROM ProductEntity p " +
            "WHERE (:keyword IS NULL OR LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (COALESCE(:location, '') = '' OR p.location = :location) " +
            "AND (:priceFrom IS NULL OR p.price >= :priceFrom) " +
            "AND (:priceTo IS NULL OR p.price <= :priceTo) " +
            "AND (:rating IS NULL OR p.rating = :rating) " +
            "AND (:categoryId IS NULL OR p.brandEntity.categoryEntity.id = :categoryId) " +
            "AND p.enabled = 1")
    Page<ProductEntity> searchProducts(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("priceFrom") Double priceFrom,
            @Param("priceTo") Double priceTo,
            @Param("rating") Integer rating,
            @Param("categoryId") Long categoryId,
            Pageable pageable
    );

    List<ProductEntity> getProductEntitiesByBrandEntity(BrandEntity brandEntity);
}