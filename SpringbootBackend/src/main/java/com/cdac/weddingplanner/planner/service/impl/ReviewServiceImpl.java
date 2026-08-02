package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.response.ReviewResponse;
import com.weddingplanner.plannerservice.entity.Planner;
import com.weddingplanner.plannerservice.entity.Review;
import com.weddingplanner.plannerservice.repository.PlannerRepository;
import com.weddingplanner.plannerservice.repository.ReviewRepository;
import com.weddingplanner.plannerservice.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final PlannerRepository plannerRepository;

    @Override
    public List<ReviewResponse> getReviewsForPlanner(Long plannerId) {
        String plannerName = plannerRepository.findById(plannerId).map(Planner::getName).orElse(null);

        return reviewRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).stream()
                .map(r -> ReviewResponse.builder()
                        .id(r.getId())
                        .plannerId(r.getPlannerId())
                        .plannerName(plannerName)
                        .clientName(r.getClientName())
                        .rating(r.getRating())
                        .comment(r.getComment())
                        .date(r.getCreatedAt())
                        .build())
                .toList();
    }
}
