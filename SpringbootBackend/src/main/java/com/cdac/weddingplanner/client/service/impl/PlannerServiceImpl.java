package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.client.dto.PlannerResponse;
import com.cdac.weddingplanner.client.entity.Planner;
import com.cdac.weddingplanner.client.repository.PlannerRepository;
import com.cdac.weddingplanner.client.service.PlannerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlannerServiceImpl implements PlannerService {

    private final PlannerRepository plannerRepository;

    public PlannerServiceImpl(PlannerRepository plannerRepository) {
        this.plannerRepository = plannerRepository;
    }

    @Override
    public List<PlannerResponse> getAllPlanners() {
        return plannerRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private PlannerResponse toResponse(Planner planner) {
        PlannerResponse response = new PlannerResponse();
        response.setId(planner.getId());
        response.setBusinessName(planner.getBusinessName());
        response.setOwnerName(planner.getOwnerName());
        response.setCity(planner.getCity());
        response.setRating(planner.getRating());
        response.setReviewsCount(planner.getReviewsCount());
        response.setStartingPrice(planner.getStartingPrice());
        response.setExperience(planner.getExperience());
        response.setSpecialization(planner.getSpecialization());
        response.setAvatarUrl(planner.getAvatarUrl());
        response.setCoverImageUrl(planner.getCoverImageUrl());
        response.setDescription(planner.getDescription());
        return response;
    }
}
