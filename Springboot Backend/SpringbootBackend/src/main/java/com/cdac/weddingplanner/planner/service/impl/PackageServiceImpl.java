package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.repository.PlannerPackageRepository;
import com.cdac.weddingplanner.planner.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PlannerPackageRepository packageRepository;

    @Override
    public PlannerPackage addPackage(PlannerPackage pkg) {
        return packageRepository.save(pkg);
    }

    @Override
    public List<PlannerPackage> getPackages(Long plannerId) {
        return packageRepository.findByPlannerId(plannerId);
    }
}
