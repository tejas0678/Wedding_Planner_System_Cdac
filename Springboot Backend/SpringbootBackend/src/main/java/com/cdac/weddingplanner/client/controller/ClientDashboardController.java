package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.client.service.ClientDashboardService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/client", "/api/client"})
@RequiredArgsConstructor
public class ClientDashboardController {

    private final ClientDashboardService clientDashboardService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getClientProfile(@RequestParam(required = false) String email) {
        User user = clientDashboardService.getClientProfile(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateClientProfile(@RequestBody User profileData) {
        User updated = clientDashboardService.updateClientProfile(profileData);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
