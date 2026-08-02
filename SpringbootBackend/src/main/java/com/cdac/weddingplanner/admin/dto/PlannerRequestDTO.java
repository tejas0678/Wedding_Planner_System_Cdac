package com.cdac.weddingplanner.admin.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PlannerRequestDTO {

	@NotBlank(message = "Business name is required")
	@Size(min = 3, max = 100, message = "Business name must be between 3 and 100 chars")
	private String businessName;

	@NotBlank(message = "Owner name is required")
	private String ownerName;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid mobile number")
	private String phone;

	@NotBlank(message = "City is required")
	private String city;

	private String experience;

	private String specialization;

	@NotNull(message = "Starting price is required")
	@Positive(message = "Starting price must be positive")
	private BigDecimal startingPrice;

	private String description;

	private String avatarUrl;

	private String coverImageUrl;

}
