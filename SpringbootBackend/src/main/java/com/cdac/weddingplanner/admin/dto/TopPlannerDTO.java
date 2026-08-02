package com.cdac.weddingplanner.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TopPlannerDTO {
	private Long id;
	private String avatar;
	private String name;
	private String specialization;
	private String city;
	private Double rating;
	private int reviews;
	private String earnings;
}
