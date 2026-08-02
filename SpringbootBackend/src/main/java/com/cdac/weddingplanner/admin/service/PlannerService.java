package com.cdac.weddingplanner.admin.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.PlannerDTO;
import com.cdac.weddingplanner.admin.dto.PlannerRequestDTO;

import jakarta.validation.Valid;


public interface PlannerService {

    // Get all planners
    Page<PlannerDTO> getAllPlanners(Pageable pageable);

	PlannerDTO getPlannerById(Long id);

	ApiResponse updatePlanner(Long id, @Valid PlannerRequestDTO dto);

	ApiResponse approvePlanner(Long id);

	ApiResponse rejectPlanner(Long id);

	ApiResponse updatePlannerStatus(Long id, String status);

	ApiResponse deletePlanner(Long id);

  

}