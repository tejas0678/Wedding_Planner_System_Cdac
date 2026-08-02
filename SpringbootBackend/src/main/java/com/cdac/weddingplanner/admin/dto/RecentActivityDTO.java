package com.cdac.weddingplanner.admin.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecentActivityDTO {
	private Long id;
	private String clientName;
	private String plannerName;
	private String venue;
	private LocalDate date;
	private String amount;
	private String status;
}