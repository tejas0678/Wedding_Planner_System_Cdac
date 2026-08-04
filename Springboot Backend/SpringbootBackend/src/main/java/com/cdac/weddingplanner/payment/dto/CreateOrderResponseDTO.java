package com.cdac.weddingplanner.payment.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderResponseDTO {
    private String orderId;
    private BigDecimal amount;
    private String currency;
    private String key;
}
