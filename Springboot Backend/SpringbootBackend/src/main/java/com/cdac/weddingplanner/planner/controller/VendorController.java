package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.Vendor;
import com.cdac.weddingplanner.planner.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService vendorService;

    @PostMapping
    public ResponseEntity<ApiResponse<Vendor>> addVendor(@RequestBody Vendor vendor) {
        Vendor saved = vendorService.addVendor(vendor);
        return ResponseEntity.ok(ApiResponse.success("Vendor added successfully", saved));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<Vendor>>> getVendors(@PathVariable Long plannerId) {
        List<Vendor> list = vendorService.getVendorsByPlanner(plannerId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
