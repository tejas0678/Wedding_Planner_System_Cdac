package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.CateringService;

import java.util.List;

public interface CateringManagementService {

    CateringService addCatering(CateringService catering);

    List<CateringService> getCateringByPlanner(Long plannerId);
}
