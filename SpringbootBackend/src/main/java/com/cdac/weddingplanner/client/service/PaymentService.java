package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.client.dto.PaymentResponse;

import java.util.List;

public interface PaymentService {

    List<PaymentResponse> getPaymentsForUser(Long userId);
}
