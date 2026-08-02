package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.client.dto.ApiResponse;
import com.cdac.weddingplanner.client.dto.PlannerResponse;
import com.cdac.weddingplanner.client.service.PlannerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/planners")
public class PlannerController {

    private final PlannerService plannerService;

    public PlannerController(PlannerService plannerService) {
        this.plannerService = plannerService;
    }

    @GetMapping
    public ApiResponse<List<PlannerResponse>> getPlanners() {
        return ApiResponse.success(plannerService.getAllPlanners());
    }
}
