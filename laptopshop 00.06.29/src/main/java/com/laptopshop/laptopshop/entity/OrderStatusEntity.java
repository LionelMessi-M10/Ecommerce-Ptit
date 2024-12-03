package com.laptopshop.laptopshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_statuses")
public class OrderStatusEntity extends BaseEntity {

    @Column(name = "status_name", length = 255)
    private String statusName;

    @ManyToOne
    @JoinColumn(name = "order_status_id")
    private OrderEntity orderEntity;
}
