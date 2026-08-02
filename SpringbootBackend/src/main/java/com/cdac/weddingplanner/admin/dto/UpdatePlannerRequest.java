package com.cdac.weddingplanner.admin.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePlannerRequest {

    private String name;

    private String email;

    private String specialization;

    private Integer experience;

    private BigDecimal rating;

}