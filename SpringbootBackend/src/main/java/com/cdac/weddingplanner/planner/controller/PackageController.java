package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.request.CreatePackageRequest;
import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.PackageResponse;
import com.weddingplanner.plannerservice.security.CurrentPlannerProvider;
import com.weddingplanner.plannerservice.service.PackageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/packages")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PLANNER')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Planner Packages", description = "Manage wedding packages offered by the planner")
public class PackageController {

    private final PackageService packageService;
    private final CurrentPlannerProvider currentPlannerProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PackageResponse>>> getPackages() {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        return ResponseEntity.ok(ApiResponse.success(packageService.getPackages(plannerId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PackageResponse>> addPackage(@Valid @RequestBody CreatePackageRequest request) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        PackageResponse response = packageService.addPackage(plannerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Package added successfully", response));
    }

    @DeleteMapping("/{packageId}")
    public ResponseEntity<ApiResponse<Void>> deletePackage(@PathVariable Long packageId) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        packageService.deletePackage(plannerId, packageId);
        return ResponseEntity.ok(ApiResponse.success("Package deleted successfully", null));
    }
}
