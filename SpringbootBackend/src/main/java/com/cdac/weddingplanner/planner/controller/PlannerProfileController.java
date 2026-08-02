package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.request.UpdateProfileRequest;
import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.PlannerProfileResponse;
import com.weddingplanner.plannerservice.security.CurrentPlannerProvider;
import com.weddingplanner.plannerservice.service.PlannerProfileService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/planner/profile")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PLANNER')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Planner Profile", description = "View and update the logged-in planner's business profile")
public class PlannerProfileController {

    private final PlannerProfileService plannerProfileService;
    private final CurrentPlannerProvider currentPlannerProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<PlannerProfileResponse>> getProfile() {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        return ResponseEntity.ok(ApiResponse.success(plannerProfileService.getProfile(plannerId)));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<PlannerProfileResponse>> updateProfile(@RequestBody UpdateProfileRequest request) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        PlannerProfileResponse response = plannerProfileService.updateProfile(plannerId, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", response));
    }
}
