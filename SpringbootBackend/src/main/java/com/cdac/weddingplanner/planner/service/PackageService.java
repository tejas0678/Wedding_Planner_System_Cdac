package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.request.CreatePackageRequest;
import com.weddingplanner.plannerservice.dto.response.PackageResponse;

import java.util.List;

public interface PackageService {
    List<PackageResponse> getPackages(Long plannerId);
    PackageResponse addPackage(Long plannerId, CreatePackageRequest request);
    void deletePackage(Long plannerId, Long packageId);
}
