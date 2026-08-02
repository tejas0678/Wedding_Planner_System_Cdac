package com.weddingplanner.plannerservice.repository;

import com.weddingplanner.plannerservice.entity.PackageOffering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PackageOfferingRepository extends JpaRepository<PackageOffering, Long> {
    List<PackageOffering> findByPlannerIdOrderByCreatedAtDesc(Long plannerId);
    Optional<PackageOffering> findByIdAndPlannerId(Long id, Long plannerId);
}
