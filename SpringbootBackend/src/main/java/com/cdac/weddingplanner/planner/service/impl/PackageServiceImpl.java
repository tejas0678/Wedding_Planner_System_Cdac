package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.request.CreatePackageRequest;
import com.weddingplanner.plannerservice.dto.response.PackageResponse;
import com.weddingplanner.plannerservice.entity.PackageOffering;
import com.weddingplanner.plannerservice.exception.ResourceNotFoundException;
import com.weddingplanner.plannerservice.repository.PackageOfferingRepository;
import com.weddingplanner.plannerservice.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageServiceImpl implements PackageService {

    private final PackageOfferingRepository packageOfferingRepository;

    @Override
    public List<PackageResponse> getPackages(Long plannerId) {
        return packageOfferingRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public PackageResponse addPackage(Long plannerId, CreatePackageRequest request) {
        PackageOffering entity = PackageOffering.builder()
                .plannerId(plannerId)
                .title(request.getTitle())
                .price(request.getPrice())
                .category(request.getCategory())
                .capacity(request.getCapacity())
                .features(request.getFeatures() != null ? new ArrayList<>(request.getFeatures()) : new ArrayList<>())
                .build();

        PackageOffering saved = packageOfferingRepository.save(entity);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void deletePackage(Long plannerId, Long packageId) {
        PackageOffering entity = packageOfferingRepository.findByIdAndPlannerId(packageId, plannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + packageId));
        packageOfferingRepository.delete(entity);
    }

    private PackageResponse toResponse(PackageOffering entity) {
        return PackageResponse.builder()
                .id(entity.getId())
                .plannerId(entity.getPlannerId())
                .title(entity.getTitle())
                .price(entity.getPrice())
                .category(entity.getCategory())
                .capacity(entity.getCapacity())
                .features(entity.getFeatures())
                .build();
    }
}
