package com.cdac.weddingplanner.payment.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.payment.dto.AdminPaymentDTO;
import com.cdac.weddingplanner.payment.dto.PaymentSummaryDTO;
import com.cdac.weddingplanner.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Reachable at /admin/** and /api/admin/**, both already restricted to ROLE_ADMIN in SecurityConfig.
@RestController
@RequestMapping({"/admin/payments", "/api/admin/payments"})
@RequiredArgsConstructor
public class AdminPaymentController {

    private final PaymentService paymentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminPaymentDTO>>> getPayments(@RequestParam(required = false) String status) {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getAdminPayments(status)));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<PaymentSummaryDTO>> getPaymentsSummary() {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getAdminPaymentsSummary()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AdminPaymentDTO>> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(paymentService.getAdminPaymentById(id)));
    }
}
