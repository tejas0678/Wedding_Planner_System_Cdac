package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminPlannerService;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/planners")
@RequiredArgsConstructor
public class AdminPlannerController {

    private final AdminPlannerService adminPlannerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getPlanners() {
        List<User> planners = adminPlannerService.getPlanners();
        return ResponseEntity.ok(ApiResponse.success(planners));
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPlannerDetails(@PathVariable Long id) {
        Map<String, Object> details = adminPlannerService.getPlannerDetails(id);
        return ResponseEntity.ok(ApiResponse.success(details));
    }
}
