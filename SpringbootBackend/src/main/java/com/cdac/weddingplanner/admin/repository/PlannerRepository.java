package com.cdac.weddingplanner.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.weddingplanner.admin.entities.ApprovalStatus;
import com.cdac.weddingplanner.admin.entities.Planner;

public interface PlannerRepository extends JpaRepository<Planner,Long > {
	
	// used while adding a new planner - to check for duplicate email
	Optional<Planner> findByEmail(String email);
	
	long countByApprovalStatus(ApprovalStatus status);
	
	List<Planner> findTop5ByOrderByRatingDesc();

}