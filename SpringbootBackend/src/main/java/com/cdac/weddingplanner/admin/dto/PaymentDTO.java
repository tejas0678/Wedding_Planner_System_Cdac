package com.cdac.weddingplanner.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PaymentDTO {
	private Long id;
	private String paymentNumber;
	private String weddingId;
	private String client;
	private LocalDate weddingDate;
	private BigDecimal amount;
	private String type;
	private LocalDate paymentDate;
	private String gateway;
	private String status;
}
