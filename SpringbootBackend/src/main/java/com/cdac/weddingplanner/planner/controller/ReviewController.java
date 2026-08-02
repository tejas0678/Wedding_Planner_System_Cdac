package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.ReviewResponse;
import com.weddingplanner.plannerservice.service.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Matches src/services/reviewService.js:
 *   GET /api/reviews/planner/{plannerId}
 * Public (no auth) - review browsing doesn't require a logged-in planner.
 */
@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Public client reviews for a planner")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviewsForPlanner(@PathVariable Long plannerId) {
        return ResponseEntity.ok(ApiResponse.success(reviewService.getReviewsForPlanner(plannerId)));
    }
}
