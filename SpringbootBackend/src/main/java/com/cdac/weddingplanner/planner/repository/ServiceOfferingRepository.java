package com.weddingplanner.plannerservice.repository;

import com.weddingplanner.plannerservice.entity.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {
    List<ServiceOffering> findByPlannerIdOrderByCreatedAtDesc(Long plannerId);
    Optional<ServiceOffering> findByIdAndPlannerId(Long id, Long plannerId);
}
