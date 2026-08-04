package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @PostMapping
    public ResponseEntity<ApiResponse<PlannerPackage>> addPackage(@RequestBody PlannerPackage pkg) {
        PlannerPackage saved = packageService.addPackage(pkg);
        return ResponseEntity.ok(ApiResponse.success("Package added successfully", saved));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<PlannerPackage>>> getPackages(@PathVariable Long plannerId) {
        List<PlannerPackage> list = packageService.getPackages(plannerId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
