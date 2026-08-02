package com.weddingplanner.plannerservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Matches PlannerServices.jsx's addService payload:
 * { name, price, description, category, pricingType }
 * price arrives pre-formatted (e.g. "₹150000") and is stored as-is.
 */
@Data
public class CreateServiceRequest {

    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Price is required")
    private String price;

    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Pricing type is required")
    private String pricingType;
}
