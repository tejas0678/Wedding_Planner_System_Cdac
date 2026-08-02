package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.client.dto.PackageResponse;
import com.cdac.weddingplanner.client.entity.WeddingPackage;
import com.cdac.weddingplanner.client.repository.WeddingPackageRepository;
import com.cdac.weddingplanner.client.service.PackageService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {

    private final WeddingPackageRepository weddingPackageRepository;

    public PackageServiceImpl(WeddingPackageRepository weddingPackageRepository) {
        this.weddingPackageRepository = weddingPackageRepository;
    }

    @Override
    public List<PackageResponse> getAllPackages() {
        return weddingPackageRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private PackageResponse toResponse(WeddingPackage pkg) {
        PackageResponse response = new PackageResponse();
        response.setId(pkg.getId());
        response.setPlannerId(pkg.getPlannerId());
        response.setPlannerName(pkg.getPlannerName());
        response.setTitle(pkg.getTitle());
        response.setPrice(pkg.getPrice());
        response.setCategory(pkg.getCategory());
        response.setTag(pkg.getTag());
        response.setCapacity(pkg.getCapacity());
        response.setImageUrl(pkg.getImageUrl());
        response.setDescription(pkg.getDescription());
        response.setFeatures(pkg.getFeatures());
        return response;
    }
}
