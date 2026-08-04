package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.client.service.ClientProfileService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client/profile")
@RequiredArgsConstructor
public class ClientProfileController {

    private final ClientProfileService clientProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> getProfile(@PathVariable Long userId) {
        User user = clientProfileService.getProfile(userId);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> updateProfile(@PathVariable Long userId, @RequestBody User profileData) {
        User updated = clientProfileService.updateProfile(userId, profileData);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
