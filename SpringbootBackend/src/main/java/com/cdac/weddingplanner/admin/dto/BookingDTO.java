package com.cdac.weddingplanner.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingDTO {
	private String id;
	private String planner;
	private String plannerPhone;
	private String plannerAvatar;
	private String packageName;
	private String clientName;
	private String status;
	private String amount;
	private String venue;
	private String location;
	private String guestCount;
	private Long countdownDays;
	private String paymentStatus;
}
