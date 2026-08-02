package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageResponse {
    private Long id;
    private Long plannerId;
    private String title;
    private String price;
    private String category;
    private String capacity;
    private List<String> features;
}
