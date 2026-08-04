package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminDashboardService;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminDashboardStats() {
        Map<String, Object> stats = adminDashboardService.getAdminDashboardSummary();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/clients")
    public ResponseEntity<ApiResponse<List<User>>> getClients() {
        List<User> clients = adminDashboardService.getClients();
        return ResponseEntity.ok(ApiResponse.success(clients));
    }

    @GetMapping("/planners")
    public ResponseEntity<ApiResponse<List<User>>> getPlanners() {
        List<User> planners = adminDashboardService.getPlanners();
        return ResponseEntity.ok(ApiResponse.success(planners));
    }

    @PutMapping("/planners/{id}/approve")
    public ResponseEntity<ApiResponse<User>> approvePlanner(@PathVariable Long id) {
        User updated = adminDashboardService.approvePlanner(id);
        return ResponseEntity.ok(ApiResponse.success("Planner approved successfully", updated));
    }

    @PutMapping("/planners/{id}/reject")
    public ResponseEntity<ApiResponse<User>> rejectPlanner(@PathVariable Long id) {
        User updated = adminDashboardService.rejectPlanner(id);
        return ResponseEntity.ok(ApiResponse.success("Planner status updated to disabled", updated));
    }

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> getBookings() {
        List<Booking> bookings = adminDashboardService.getBookings();
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }
}
