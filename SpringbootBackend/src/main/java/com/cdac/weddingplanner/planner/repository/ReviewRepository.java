package com.weddingplanner.plannerservice.repository;

import com.weddingplanner.plannerservice.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByPlannerIdOrderByCreatedAtDesc(Long plannerId);
}
