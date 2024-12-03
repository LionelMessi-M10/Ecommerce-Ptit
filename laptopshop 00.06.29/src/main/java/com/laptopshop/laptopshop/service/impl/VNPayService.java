package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.entity.OrderEntity;
import com.laptopshop.laptopshop.entity.PaymentEntity;
import com.laptopshop.laptopshop.exception.DataNotFoundException;
import com.laptopshop.laptopshop.repository.OrderRepository;
import com.laptopshop.laptopshop.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;

@Transactional
@Service
public class VNPayService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    public String processPaymentCallback(Map<String, String> params) {
        String vnp_ResponseCode = params.get("vnp_ResponseCode");
        String vnp_TxnRef = params.get("vnp_TxnRef"); // Mã đơn hàng.
        String vnp_TransactionNo = params.get("vnp_TransactionNo"); // Mã giao dịch VNPay.
        String vnp_Amount = params.get("vnp_Amount"); // Số tiền (đơn vị VNĐ * 100).

        if ("00".equals(vnp_ResponseCode)) {
            // Thanh toán thành công
            Long orderId = Long.parseLong(vnp_TxnRef);
            OrderEntity order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new DataNotFoundException("Order not found"));

            // Tạo bản ghi Payment
            PaymentEntity payment = new PaymentEntity();
            payment.setOrderEntity(order);
            payment.setPaymentDate(new Date());
            payment.setAmount(Double.parseDouble(vnp_Amount) / 100); // Chuyển về đơn vị VNĐ.
            payment.setPaymentMethod("VNPay");
            payment.setStatus((short) 1);
            payment.setVnpTransactionId(vnp_TransactionNo);

            paymentRepository.save(payment);

            // Cập nhật trạng thái đơn hàng
            order.setStatus((short) 1);

            orderRepository.save(order);

            return "Thanh toán thành công!";
        }

        return "Thanh toán thất bại!";
    }
}

