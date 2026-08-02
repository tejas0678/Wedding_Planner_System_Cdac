package com.cdac.weddingplanner.admin.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class FeedbackDTO {
		private Long id;
		private String clientName;
		private String plannerName;
		private int rating;
		private String comment;
		private LocalDate date;
}
