package com.cdac.weddingplanner.admin.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.weddingplanner.admin.custom_exception.ApiException;
import com.cdac.weddingplanner.admin.custom_exception.ResourceNotFoundException;
import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.PlannerDTO;
import com.cdac.weddingplanner.admin.dto.PlannerRequestDTO;
import com.cdac.weddingplanner.admin.entities.ApprovalStatus;
import com.cdac.weddingplanner.admin.entities.Planner;
import com.cdac.weddingplanner.admin.entities.Status;
import com.cdac.weddingplanner.admin.repository.PlannerRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlannerServiceImpl implements PlannerService {

    private final PlannerRepository plannerRepository;
    private final ModelMapper modelMapper;

    @Override
   
    public Page<PlannerDTO> getAllPlanners(Pageable pageable)
    {
    	Page <Planner> page = plannerRepository.findAll(pageable);
		return page.map(planner -> modelMapper.map(planner, PlannerDTO.class));

    }

    @Override
    public PlannerDTO getPlannerById(Long id) {
		Planner planner = plannerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Planner not found"));

		return modelMapper.map(planner, PlannerDTO.class);
	}
    
    @Override
    @Transactional
    public ApiResponse updatePlanner(Long id, PlannerRequestDTO dto) {
    Planner planner = plannerRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Planner not found"));
    if(!planner.getEmail().equalsIgnoreCase(dto.getEmail()))
    {
    	plannerRepository.findByEmail(dto.getEmail()).ifPresent(existingPlanner -> {
			throw new RuntimeException("Email already exists");
		});
    }
    modelMapper.map(dto, planner);
    plannerRepository.save(planner);
    return new ApiResponse("success","Planner updated successfully");
    }
    
    @Override
    @Transactional
    public ApiResponse approvePlanner(Long id)
    {
    	Planner planner = plannerRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("Planner not found id" +id));
    	planner.setApprovalStatus(ApprovalStatus.APPROVED);
    	plannerRepository.save(planner);
    	return new ApiResponse("success","Planner approved successfully");
    }
    
    @Override
    @Transactional
    public ApiResponse rejectPlanner(Long id)
	{
		Planner planner = plannerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Planner not found id" +id));
		planner.setApprovalStatus(ApprovalStatus.REJECTED);
		plannerRepository.save(planner);
		return new ApiResponse("success","Planner rejected successfully");
	}
    
    @Override
    @Transactional
    public ApiResponse updatePlannerStatus(Long id, String status)
    {
    	Planner planner = plannerRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Planner not found id" +id));
    	Status newStatus;
    	try {
    		 newStatus = Status.valueOf(status.toUpperCase());
    	} catch(IllegalArgumentException e) {
    		throw new ApiException("Invalid status value: " + status + " (expected ACTIVE or INACTIVE)");	
    }
    	planner.setStatus(newStatus);
    	plannerRepository.save(planner);
    	return new ApiResponse("success","Planner status updated successfully");
    }
    
    @Override
    @Transactional
    public ApiResponse deletePlanner(Long PlannerId)
	{
		Planner planner = plannerRepository.findById(PlannerId)
				.orElseThrow(() -> new ResourceNotFoundException("Planner not found id" +PlannerId));
		plannerRepository.delete(planner);
		return new ApiResponse("success","Planner deleted successfully");
	}
}