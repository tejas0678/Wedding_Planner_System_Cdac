package com.cdac.weddingplanner.payment.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentSummaryDTO {
    private BigDecimal totalRevenue;
    private BigDecimal todayRevenue;
    private BigDecimal monthlyRevenue;
    private BigDecimal pendingAmount;
    private BigDecimal failedAmount;
    private long totalPayments;
    private long pendingCount;
    private long failedCount;
}
