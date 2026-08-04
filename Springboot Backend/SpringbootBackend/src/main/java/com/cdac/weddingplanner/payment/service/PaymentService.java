package com.cdac.weddingplanner.payment.service;

import com.cdac.weddingplanner.payment.dto.*;

import java.util.List;

public interface PaymentService {

    CreateOrderResponseDTO createOrder(CreateOrderRequestDTO request);

    VerifyPaymentResponseDTO verifyPayment(VerifyPaymentRequestDTO request);

    List<PaymentHistoryDTO> getClientPayments();

    List<PaymentHistoryDTO> getPlannerPayments();

    List<AdminPaymentDTO> getAdminPayments(String status);

    AdminPaymentDTO getAdminPaymentById(Long id);

    PaymentSummaryDTO getAdminPaymentsSummary();
}
