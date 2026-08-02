package com.weddingplanner.plannerservice.mapper;

import com.weddingplanner.plannerservice.dto.response.PlannerProfileResponse;
import com.weddingplanner.plannerservice.entity.Planner;
import org.springframework.stereotype.Component;

@Component
public class PlannerMapper {

    public PlannerProfileResponse toProfileResponse(Planner planner) {
        return PlannerProfileResponse.builder()
                .id(planner.getId())
                .name(planner.getName())
                .ownerName(planner.getName())
                .businessName(planner.getBusinessName())
                .email(planner.getEmail())
                .phone(planner.getPhone())
                .gstNumber(planner.getGstNumber())
                .experience(planner.getExperience())
                .specialization(planner.getSpecialization())
                .city(planner.getCity())
                .bio(planner.getBio())
                .description(planner.getBio())
                .image(planner.getImage())
                .avatarUrl(planner.getImage())
                .rating(planner.getRating())
                .reviewsCount(planner.getReviewsCount())
                .status(planner.getStatus().name())
                .build();
    }
}
