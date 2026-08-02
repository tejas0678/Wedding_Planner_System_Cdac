package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.DashboardStatsResponse;
import com.weddingplanner.plannerservice.security.CurrentPlannerProvider;
import com.weddingplanner.plannerservice.service.DashboardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/planner/dashboard")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PLANNER')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Planner Dashboard", description = "Aggregated stats for the planner dashboard overview")
public class DashboardController {

    private final DashboardService dashboardService;
    private final CurrentPlannerProvider currentPlannerProvider;

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getStats(plannerId)));
    }
}
