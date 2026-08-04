package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.PlannerPackage;

import java.util.List;
import java.util.Map;

public interface PublicPackageService {

    List<PlannerPackage> getPublicPackages(
            Long plannerId,
            String eventType,
            String theme,
            String category,
            String city,
            String keyword,
            String search
    );

    Map<String, Object> getPackageFilters();

    List<PlannerPackage> getPackagesByPlanner(Long plannerId);

    PlannerPackage getPackageById(Long id);
}
