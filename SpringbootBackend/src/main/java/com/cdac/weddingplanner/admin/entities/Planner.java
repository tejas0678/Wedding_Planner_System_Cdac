package com.cdac.weddingplanner.admin.entities;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.Table;

	@Entity
	@Table(name = "planners")
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public class Planner extends BaseClass {

		@Column(name = "business_name", nullable = false,length = 100)
		private String businessName;

		@Column(name = "owner_name", nullable = false,length = 100)
		private String ownerName;
		
		@Column(name = "phone",nullable = false, length = 10)
		private String phone;
		
	    @Column(name = "email",unique = true, nullable = false)
	    private String email;
	    
	    @Column(name = "specialization",length = 100)
	    private String specialization;

	    @Column(name = "city",length = 100)
	    private String city;

	    @Column(name = "experience")
	    private Integer experience;
	    
	    @Column(name = "rating")  // e.g., 4.75
	    private Double rating = 0.0; 
	    
	    @Column(name = "reviews_count")
		private int reviewsCount = 0;

		@Column(name = "starting_price")
		private BigDecimal startingPrice;

		@Column(length = 1000)
		private String description;

		@Column(name = "avatar_url")
		private String avatarUrl;

		@Column(name = "cover_image_url")
		private String coverImageUrl;

	    
		@Enumerated(EnumType.STRING)
		@Column(nullable = false)
		private Status status = Status.ACTIVE;

		@Enumerated(EnumType.STRING)
		@Column(name = "approval_status", nullable = false)
		private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

}