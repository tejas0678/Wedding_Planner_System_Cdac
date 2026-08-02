package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItemResponse {
    private Long id;
    private Long plannerId;
    private String title;
    private String imageUrl;
    private String category;
    private String description;
    private String location;
}
