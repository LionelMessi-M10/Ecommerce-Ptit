package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.repository.OrderItemRepository;
import com.laptopshop.laptopshop.service.IOrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderItemService implements IOrderItemService {

    private final OrderItemRepository orderItemRepository;

}
