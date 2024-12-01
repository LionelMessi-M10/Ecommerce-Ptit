package com.laptopshop.laptopshop.service.impl;

import com.laptopshop.laptopshop.repository.CartRepository;
import com.laptopshop.laptopshop.service.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CartService implements ICartService {

    private final CartRepository cartRepository;
}
