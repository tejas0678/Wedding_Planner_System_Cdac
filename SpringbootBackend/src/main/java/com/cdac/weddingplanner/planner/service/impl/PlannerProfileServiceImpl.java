package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.request.UpdateProfileRequest;
import com.weddingplanner.plannerservice.dto.response.PlannerProfileResponse;
import com.weddingplanner.plannerservice.entity.Planner;
import com.weddingplanner.plannerservice.exception.DuplicateResourceException;
import com.weddingplanner.plannerservice.exception.ResourceNotFoundException;
import com.weddingplanner.plannerservice.mapper.PlannerMapper;
import com.weddingplanner.plannerservice.repository.PlannerRepository;
import com.weddingplanner.plannerservice.service.PlannerProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class PlannerProfileServiceImpl implements PlannerProfileService {

    private final PlannerRepository plannerRepository;
    private final PlannerMapper plannerMapper;

    @Override
    public PlannerProfileResponse getProfile(Long plannerId) {
        Planner planner = findPlannerOrThrow(plannerId);
        return plannerMapper.toProfileResponse(planner);
    }

    @Override
    @Transactional
    public PlannerProfileResponse updateProfile(Long plannerId, UpdateProfileRequest request) {
        Planner planner = findPlannerOrThrow(plannerId);

        if (StringUtils.hasText(request.getEmail())
                && !planner.getEmail().equalsIgnoreCase(request.getEmail())
                && plannerRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already in use by another account");
        }

        String name = StringUtils.hasText(request.getOwnerName()) ? request.getOwnerName() : request.getName();
        String bio = StringUtils.hasText(request.getDescription()) ? request.getDescription() : request.getBio();

        if (StringUtils.hasText(name)) planner.setName(name);
        if (StringUtils.hasText(request.getEmail())) planner.setEmail(request.getEmail());
        if (request.getPhone() != null) planner.setPhone(request.getPhone());
        if (request.getBusinessName() != null) planner.setBusinessName(request.getBusinessName());
        if (request.getGstNumber() != null) planner.setGstNumber(request.getGstNumber());
        if (request.getExperience() != null) planner.setExperience(request.getExperience());
        if (request.getSpecialization() != null) planner.setSpecialization(request.getSpecialization());
        if (request.getImage() != null) planner.setImage(request.getImage());
        if (bio != null) planner.setBio(bio);

        Planner saved = plannerRepository.save(planner);
        return plannerMapper.toProfileResponse(saved);
    }

    private Planner findPlannerOrThrow(Long plannerId) {
        return plannerRepository.findById(plannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Planner not found with id: " + plannerId));
    }
}
