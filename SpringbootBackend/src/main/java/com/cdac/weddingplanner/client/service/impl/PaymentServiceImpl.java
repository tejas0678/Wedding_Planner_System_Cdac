package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.client.dto.PaymentResponse;
import com.cdac.weddingplanner.client.entity.Payment;
import com.cdac.weddingplanner.client.repository.PaymentRepository;
import com.cdac.weddingplanner.client.service.PaymentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public List<PaymentResponse> getPaymentsForUser(Long userId) {
        return paymentRepository.findByUserIdOrderByPaymentDateDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    private PaymentResponse toResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setId(payment.getId());
        response.setPaymentNumber(payment.getPaymentNumber());
        response.setBookingNumber(payment.getBookingNumber());
        response.setClientName(payment.getClientName());
        response.setAmount(payment.getAmount());
        response.setType(payment.getType());
        response.setPaymentDate(payment.getPaymentDate() != null ? payment.getPaymentDate().toString() : null);
        response.setGateway(payment.getGateway());
        response.setStatus(payment.getStatus());
        return response;
    }
}
