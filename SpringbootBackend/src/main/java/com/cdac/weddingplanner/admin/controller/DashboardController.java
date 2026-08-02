package com.cdac.weddingplanner.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.weddingplanner.admin.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@CrossOrigin
@RequestMapping("/admin/dashboard")
public class DashboardController {
	private final DashboardService dashboardService;
	
	public DashboardController(DashboardService dashboardService) {
		this.dashboardService = dashboardService;
	}
	
	@Operation(summary = "Get admin dashboard")
	@GetMapping("/")
	public ResponseEntity<?> getDashboard() {
		return ResponseEntity.ok(dashboardService.getDashboard());
	}
}
