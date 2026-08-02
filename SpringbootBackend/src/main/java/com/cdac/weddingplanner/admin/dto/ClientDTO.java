package com.cdac.weddingplanner.admin.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientDTO {
	private Long id;
	private String fullName;
	private String email;
	private String phone;
	private String status;
	private LocalDate created;
}
