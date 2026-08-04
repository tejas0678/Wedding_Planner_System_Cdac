package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.service.PublicPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/packages", "/api/packages"})
@RequiredArgsConstructor
public class PublicPackageController {

    private final PublicPackageService publicPackageService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PlannerPackage>>> getPublicPackages(
            @RequestParam(required = false) Long plannerId,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String theme,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String search
    ) {
        List<PlannerPackage> filtered = publicPackageService.getPublicPackages(
                plannerId, eventType, theme, category, city, keyword, search);
        return ResponseEntity.ok(ApiResponse.success(filtered));
    }

    @GetMapping("/filters")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPackageFilters() {
        Map<String, Object> filters = publicPackageService.getPackageFilters();
        return ResponseEntity.ok(ApiResponse.success(filters));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<PlannerPackage>>> getPackagesByPlanner(@PathVariable Long plannerId) {
        List<PlannerPackage> packages = publicPackageService.getPackagesByPlanner(plannerId);
        return ResponseEntity.ok(ApiResponse.success(packages));
    }

    @GetMapping("/{id:\\d+}")
    public ResponseEntity<ApiResponse<PlannerPackage>> getPackageById(@PathVariable Long id) {
        PlannerPackage pkg = publicPackageService.getPackageById(id);
        return ResponseEntity.ok(ApiResponse.success(pkg));
    }
}
