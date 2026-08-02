package com.cdac.weddingplanner.admin.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.cdac.weddingplanner.admin.entities.BaseClass;
import com.cdac.weddingplanner.admin.entities.Booking;
import com.cdac.weddingplanner.admin.entities.Client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "payments")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = { "booking", "client" }, callSuper = true)
public class Payment extends BaseClass  {

	@Column(name = "payment_number", nullable = false, unique = true)
	private String paymentNumber;
	// Payment *------>1 Booking (uni-directional)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "booking_id", nullable = false)
	private Booking booking;

	// Payment *------>1 Client (uni-directional)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id", nullable = false)
	private Client client;

	@Column(name = "amount",nullable = false)
	private BigDecimal amount;
	
	private String type;

	@Column(name = "payment_date")
	private LocalDate paymentDate = LocalDate.now();

	private String gateway;

	@Column(nullable = false)
	private String status = "Pending";
}
