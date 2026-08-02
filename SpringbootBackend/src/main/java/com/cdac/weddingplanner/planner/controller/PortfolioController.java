package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.request.CreatePortfolioItemRequest;
import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.PortfolioItemResponse;
import com.weddingplanner.plannerservice.security.CurrentPlannerProvider;
import com.weddingplanner.plannerservice.service.PortfolioService;
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
@RequestMapping("/api/planner/portfolio")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PLANNER')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Planner Portfolio", description = "Manage the planner's portfolio/gallery images")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final CurrentPlannerProvider currentPlannerProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PortfolioItemResponse>>> getItems() {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        return ResponseEntity.ok(ApiResponse.success(portfolioService.getItems(plannerId)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PortfolioItemResponse>> addItem(@Valid @RequestBody CreatePortfolioItemRequest request) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        PortfolioItemResponse response = portfolioService.addItem(plannerId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Portfolio item added successfully", response));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable Long itemId) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        portfolioService.deleteItem(plannerId, itemId);
        return ResponseEntity.ok(ApiResponse.success("Portfolio item deleted successfully", null));
    }
}
