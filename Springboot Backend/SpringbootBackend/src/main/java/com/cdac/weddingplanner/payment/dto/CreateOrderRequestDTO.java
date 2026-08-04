package com.cdac.weddingplanner.payment.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequestDTO {
    private Long bookingId;
    private BigDecimal amount;
    private String currency = "INR";
}
