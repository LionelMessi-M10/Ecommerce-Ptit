package com.laptopshop.laptopshop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "payments")
public class PaymentEntity extends BaseEntity {

    @Column(name = "amount")
    private Double amount;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(name = "status")
    private Short status;

    @Column(name = "vnp_transaction_id")
    private String vnpTransactionId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity orderEntity;

}
