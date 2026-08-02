package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.client.dto.ApiResponse;
import com.cdac.weddingplanner.client.dto.PackageResponse;
import com.cdac.weddingplanner.client.service.PackageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackageController {

    private final PackageService packageService;

    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @GetMapping
    public ApiResponse<List<PackageResponse>> getPackages() {
        return ApiResponse.success(packageService.getAllPackages());
    }
}
