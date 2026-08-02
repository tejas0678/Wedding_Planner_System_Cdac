package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.request.UpdateProfileRequest;
import com.weddingplanner.plannerservice.dto.response.PlannerProfileResponse;

public interface PlannerProfileService {
    PlannerProfileResponse getProfile(Long plannerId);
    PlannerProfileResponse updateProfile(Long plannerId, UpdateProfileRequest request);
}
