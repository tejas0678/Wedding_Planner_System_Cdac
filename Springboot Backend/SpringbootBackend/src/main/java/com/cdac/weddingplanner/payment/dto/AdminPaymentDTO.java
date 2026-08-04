package com.cdac.weddingplanner.payment.dto;

import lombok.*;

import java.math.BigDecimal;

// Field names match what Frontend/.../pages/admin/MonitorPayments.jsx already reads
// (paymentNumber, bookingNumber, clientName, plannerName, amount, gateway, status, paymentDate,
// type, transactionId) so the existing admin UI needs no restructuring, only real data.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminPaymentDTO {
    private Long id;
    private String paymentNumber;
    private String bookingNumber;
    private String clientName;
    private String plannerName;
    private String packageName;
    private BigDecimal amount;
    private String gateway;
    private String status;
    private String paymentDate;
    private String type;
    private String transactionId;
}
