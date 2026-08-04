package com.cdac.weddingplanner.payment.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.payment.dto.*;
import com.cdac.weddingplanner.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/payments", "/payments"})
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<ApiResponse<CreateOrderResponseDTO>> createOrder(@RequestBody CreateOrderRequestDTO request) {
        CreateOrderResponseDTO order = paymentService.createOrder(request);
        return ResponseEntity.ok(ApiResponse.success("Razorpay order created successfully", order));
    }

    @PostMapping("/verify")
    public ResponseEntity<VerifyPaymentResponseDTO> verifyPayment(@RequestBody VerifyPaymentRequestDTO request) {
        VerifyPaymentResponseDTO result = paymentService.verifyPayment(request);
        return result.isSuccess() ? ResponseEntity.ok(result) : ResponseEntity.badRequest().body(result);
    }

    @GetMapping("/client")
    public ResponseEntity<ApiResponse<List<PaymentHistoryDTO>>> getClientPayments() {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getClientPayments()));
    }

    @GetMapping("/planner")
    public ResponseEntity<ApiResponse<List<PaymentHistoryDTO>>> getPlannerPayments() {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getPlannerPayments()));
    }
}
