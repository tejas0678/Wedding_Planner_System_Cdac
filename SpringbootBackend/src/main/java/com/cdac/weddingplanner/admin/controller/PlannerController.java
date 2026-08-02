package com.cdac.weddingplanner.admin.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.weddingplanner.admin.dto.PlannerRequestDTO;
import com.cdac.weddingplanner.admin.dto.StatusUpdateDTO;
import com.cdac.weddingplanner.admin.dto.UpdatePlannerRequest;
import com.cdac.weddingplanner.admin.service.PlannerService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RestController
@CrossOrigin
@RequestMapping("/admin/planners")
@RequiredArgsConstructor
public class PlannerController {
	
	
    private final PlannerService plannerService;

    @GetMapping
    @Operation(summary = "Get all planner Details")
    public ResponseEntity<?> getAllPlanners(@RequestParam (defaultValue = "0") int page, @RequestParam (defaultValue = "100") int size) {

		try {

			Pageable pageable = Pageable.ofSize(size).withPage(page);
			return ResponseEntity.ok(plannerService.getAllPlanners(pageable).getContent());

		} catch (Exception e) {

			return ResponseEntity.badRequest().body(e.getMessage());

		}

    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get planner Details by id")
    public ResponseEntity<?> getPlannerById(@PathVariable Long id) {
    	return ResponseEntity.ok(plannerService.getPlannerById(id));
    }
    
   @Operation(summary = "Update planner Details by id")
   @PutMapping("/{id}")
   public ResponseEntity<?> updatePlanner(@PathVariable Long id, @Valid @RequestBody PlannerRequestDTO dto)
   {
	   return ResponseEntity.ok(plannerService.updatePlanner(id, dto));
   }
   
   @Operation(summary = "Approve a pending planner")
   @PutMapping("/{id}/approve")
   public ResponseEntity<?> approvePlanner(@PathVariable Long id)
   {
	   return ResponseEntity.ok(plannerService.approvePlanner(id));
   }
   
   @Operation(summary = "Reject a pending planner")
   @PutMapping("/{id}/reject")
   public ResponseEntity<?> rejectPlanner(@PathVariable Long id)
   {
	   return ResponseEntity.ok(plannerService.rejectPlanner(id));
   }
   
   @Operation(summary = "Activate / deactive a planner")
   @PutMapping("/{id}/status")
   public ResponseEntity<?> updatePlannerStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateDTO dto)
   {
	   return ResponseEntity.ok(plannerService.updatePlannerStatus(id, dto.getStatus()));
   }
   
   @DeleteMapping("/{id}")
   @Operation(summary = "Delete planner")
   public ResponseEntity<?> deletePlanner(@PathVariable Long id)
   {
	   return ResponseEntity.ok(plannerService.deletePlanner(id));
   }
}