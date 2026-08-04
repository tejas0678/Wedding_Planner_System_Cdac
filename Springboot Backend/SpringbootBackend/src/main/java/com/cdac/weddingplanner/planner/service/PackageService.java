package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.PlannerPackage;

import java.util.List;

public interface PackageService {

    PlannerPackage addPackage(PlannerPackage pkg);

    List<PlannerPackage> getPackages(Long plannerId);
}
