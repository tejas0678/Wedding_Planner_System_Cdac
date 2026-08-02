package com.weddingplanner.plannerservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreatePortfolioItemRequest {
    private String title;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private String category;
    private String description;
    private String location;
}
