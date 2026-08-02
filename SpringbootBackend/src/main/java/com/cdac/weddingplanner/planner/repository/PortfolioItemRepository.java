package com.weddingplanner.plannerservice.repository;

import com.weddingplanner.plannerservice.entity.PortfolioItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long> {
    List<PortfolioItem> findByPlannerIdOrderByCreatedAtDesc(Long plannerId);
    Optional<PortfolioItem> findByIdAndPlannerId(Long id, Long plannerId);
}
