package com.cdac.weddingplanner.admin.dto;

	import java.math.BigDecimal;

	import lombok.Getter;
	import lombok.Setter;

	@Getter
	@Setter
	public class PlannerDTO {
		private Long id;
		private String businessName;
		// alias of businessName - the React admin table reads planner.name
		private String name;
		private String ownerName;
		private String email;
		private String phone;
		private String city;
		private String experience;
		private String specialization;
		private Double rating;
		private int reviewsCount;
		private BigDecimal startingPrice;
		private String description;
		private String avatarUrl;
		private String coverImageUrl;
		private String status;
		private String approvalStatus;
	}


