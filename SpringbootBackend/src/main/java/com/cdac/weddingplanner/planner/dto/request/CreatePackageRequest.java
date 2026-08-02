package com.weddingplanner.plannerservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class CreatePackageRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Price is required")
    private String price;

    private String category;
    private String capacity;
    private List<String> features;
}
