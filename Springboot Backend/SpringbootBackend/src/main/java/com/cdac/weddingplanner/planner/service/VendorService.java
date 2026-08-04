package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.Vendor;

import java.util.List;

public interface VendorService {

    Vendor addVendor(Vendor vendor);

    List<Vendor> getVendorsByPlanner(Long plannerId);
}
