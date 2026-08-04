package com.cdac.weddingplanner.payment.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyPaymentResponseDTO {
    private boolean success;
    private String message;

    // Populated only when success == true, for the client-side payment receipt.
    private Long paymentId;
    private String razorpayPaymentId;
    private BigDecimal amount;
    private LocalDateTime transactionDate;
}
