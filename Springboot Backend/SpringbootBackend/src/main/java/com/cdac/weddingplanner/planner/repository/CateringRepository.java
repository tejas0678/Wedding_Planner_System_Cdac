package com.cdac.weddingplanner.planner.repository;

import com.cdac.weddingplanner.planner.entity.CateringService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CateringRepository extends JpaRepository<CateringService, Long> {
    List<CateringService> findByPlannerId(Long plannerId);
}
