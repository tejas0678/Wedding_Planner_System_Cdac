package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlannerProfileResponse {
    private Long id;
    /** Owner / contact person name - the frontend also reads this as ownerName. */
    private String name;
    private String ownerName;
    private String businessName;
    private String email;
    private String phone;
    private String gstNumber;
    private String experience;
    private String specialization;
    private String city;
    /** Bio - the frontend also reads this as description. */
    private String bio;
    private String description;
    /** Avatar/profile image - the frontend also reads this as avatarUrl. */
    private String image;
    private String avatarUrl;
    private Double rating;
    private Integer reviewsCount;
    private String status;
}
