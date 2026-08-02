package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.client.dto.PackageResponse;

import java.util.List;

public interface PackageService {

    List<PackageResponse> getAllPackages();
}
