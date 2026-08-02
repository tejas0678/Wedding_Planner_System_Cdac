package com.cdac.weddingplanner.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDTO {
	@NotNull(message = "Client id is required")
	private Long clientId;

	@NotNull(message = "Planner id is required")
	private Long plannerId;

	@NotBlank(message = "Package name is required")
	private String packageName;

	@NotBlank(message = "Venue is required")
	private String venue;

	@NotBlank(message = "Location is required")
	private String location;

	@Min(value = 10, message = "Guest count must be at least 1")
	private int guestCount;

	@NotNull(message = "Wedding date is required")
	@FutureOrPresent(message = "Wedding date cannot be in the past")
	private LocalDate weddingDate;

	@NotNull(message = "Amount is required")
	@Positive(message = "Amount must be positive")
	private BigDecimal amount;

}
