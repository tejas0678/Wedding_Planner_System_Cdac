package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceResponse {
    private Long id;
    private Long plannerId;
    private String name;
    private String category;
    private String price;
    private String pricingType;
    private String description;
}
