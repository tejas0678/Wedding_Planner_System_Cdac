package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    List<ReviewResponse> getReviewsForPlanner(Long plannerId);
}
