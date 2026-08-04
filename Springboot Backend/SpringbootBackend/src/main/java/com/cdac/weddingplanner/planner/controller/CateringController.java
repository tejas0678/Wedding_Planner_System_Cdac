package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.CateringService;
import com.cdac.weddingplanner.planner.service.CateringManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/catering")
@RequiredArgsConstructor
public class CateringController {

    private final CateringManagementService cateringManagementService;

    @PostMapping
    public ResponseEntity<ApiResponse<CateringService>> addCatering(@RequestBody CateringService catering) {
        CateringService saved = cateringManagementService.addCatering(catering);
        return ResponseEntity.ok(ApiResponse.success("Catering service added successfully", saved));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<CateringService>>> getCatering(@PathVariable Long plannerId) {
        List<CateringService> list = cateringManagementService.getCateringByPlanner(plannerId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
