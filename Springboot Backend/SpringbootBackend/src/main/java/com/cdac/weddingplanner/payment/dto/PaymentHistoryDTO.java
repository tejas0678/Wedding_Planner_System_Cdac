package com.cdac.weddingplanner.payment.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

// Used for both the client's and the planner's own payment history views.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentHistoryDTO {
    private Long paymentId;
    private Long bookingId;
    private String bookingNumber;
    private String clientName;
    private String plannerName;
    private String packageName;
    private LocalDate eventDate;
    private BigDecimal amount;
    private String currency;
    private String paymentMethod;
    private String status;
    private String razorpayPaymentId;
    private LocalDateTime transactionDate;
    private LocalDateTime createdAt;
}
