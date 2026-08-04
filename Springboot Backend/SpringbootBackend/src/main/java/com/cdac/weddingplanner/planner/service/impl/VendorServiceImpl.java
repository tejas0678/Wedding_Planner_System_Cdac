package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.planner.entity.Vendor;
import com.cdac.weddingplanner.planner.repository.VendorRepository;
import com.cdac.weddingplanner.planner.service.VendorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;

    @Override
    public Vendor addVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }

    @Override
    public List<Vendor> getVendorsByPlanner(Long plannerId) {
        return vendorRepository.findByPlannerId(plannerId);
    }
}
