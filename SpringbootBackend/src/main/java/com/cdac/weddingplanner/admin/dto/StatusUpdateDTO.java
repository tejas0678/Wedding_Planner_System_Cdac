package com.cdac.weddingplanner.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatusUpdateDTO {
		@NotBlank(message = "Status is required")
		private String status;
}
