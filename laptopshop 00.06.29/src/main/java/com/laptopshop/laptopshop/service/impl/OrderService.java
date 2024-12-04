package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.repository.OrderRepository;
import com.laptopshop.laptopshop.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderService implements IOrderService {

    private final OrderRepository orderRepository;
}
