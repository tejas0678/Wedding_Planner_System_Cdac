package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.client.dto.ApiResponse;
import com.cdac.weddingplanner.client.dto.PaymentResponse;
import com.cdac.weddingplanner.client.service.PaymentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Frontend's client Payments page calls GET /admin/payments for its own
 * payment history, so the endpoint path is kept exactly as the frontend expects.
 */
@RestController
@RequestMapping("/admin/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ApiResponse<List<PaymentResponse>> getPayments(@RequestParam(defaultValue = "1") Long userId) {
        return ApiResponse.success(paymentService.getPaymentsForUser(userId));
    }
}
