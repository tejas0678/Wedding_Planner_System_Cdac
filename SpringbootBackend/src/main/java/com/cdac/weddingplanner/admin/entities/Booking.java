package com.cdac.weddingplanner.admin.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bookings")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = { "client", "planner" }, callSuper = true)
public class Booking extends BaseClass {

	@Column(name = "booking_number", nullable = false, unique = true)
	private String bookingNumber;

	// Booking *------>1 Client (uni-directional)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "client_id", nullable = false)
	private Client client;

	// Booking *------>1 Planner (uni-directional)
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "planner_id", nullable = false)
	private Planner planner;

	@Column(name = "package_name")
	private String packageName;

	private String venue;

	private String location;

	@Column(name = "guest_count")
	private int guestCount;

	@Column(name = "wedding_date")
	private LocalDate weddingDate;

	@Column(nullable = false)
	private BigDecimal amount;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BookingStatus status = BookingStatus.PENDING;

	
	@Column(name = "payment_status")
	private String paymentStatus = "Not Paid";

}
