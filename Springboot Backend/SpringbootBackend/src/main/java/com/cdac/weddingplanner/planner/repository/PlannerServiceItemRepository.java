package com.cdac.weddingplanner.planner.repository;

import com.cdac.weddingplanner.planner.entity.PlannerServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlannerServiceItemRepository extends JpaRepository<PlannerServiceItem, Long> {
    List<PlannerServiceItem> findByPlannerId(Long plannerId);
}
