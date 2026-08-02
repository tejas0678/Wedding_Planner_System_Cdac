package com.weddingplanner.plannerservice.repository;

import com.weddingplanner.plannerservice.entity.Planner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlannerRepository extends JpaRepository<Planner, Long> {
    Optional<Planner> findByEmail(String email);
    boolean existsByEmail(String email);
}
