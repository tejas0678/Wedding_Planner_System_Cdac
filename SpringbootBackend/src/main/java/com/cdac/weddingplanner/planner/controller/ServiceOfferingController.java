package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.request.CreateServiceRequest;
import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.ServiceResponse;
import com.weddingplanner.plannerservice.security.CurrentPlannerProvider;
import com.weddingplanner.plannerservice.service.ServiceOfferingService;
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
@RequestMapping("/api/planner/services")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PLANNER')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Planner Services", description = "Manage services offered by the planner")
public class ServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;
    private final CurrentPlannerProvider currentPlannerProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceResponse>>> getServices() {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        return ResponseEntity.ok(ApiResponse.success(serviceOfferingService.getServices(plannerId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceResponse>> addService(@Valid @RequestBody CreateServiceRequest request) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        ServiceResponse response = serviceOfferingService.addService(plannerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Service added successfully", response));
    }

    @PutMapping("/{serviceId}")
    public ResponseEntity<ApiResponse<ServiceResponse>> updateService(@PathVariable Long serviceId,
                                                                        @Valid @RequestBody CreateServiceRequest request) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        ServiceResponse response = serviceOfferingService.updateService(plannerId, serviceId, request);
        return ResponseEntity.ok(ApiResponse.success("Service updated successfully", response));
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable Long serviceId) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        serviceOfferingService.deleteService(plannerId, serviceId);
        return ResponseEntity.ok(ApiResponse.success("Service deleted successfully", null));
    }
}
