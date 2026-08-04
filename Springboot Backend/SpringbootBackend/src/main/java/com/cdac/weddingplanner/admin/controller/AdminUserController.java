package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminUserService;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = adminUserService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @PutMapping("/{userId}/toggle-status")
    public ResponseEntity<ApiResponse<User>> toggleUserStatus(
            @PathVariable Long userId,
            @RequestParam boolean enabled
    ) {
        User updated = adminUserService.toggleUserStatus(userId, enabled);
        return ResponseEntity.ok(ApiResponse.success("User status updated", updated));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long userId) {
        adminUserService.deleteUser(userId);
        return ResponseEntity.ok(ApiResponse.success("User deleted successfully"));
    }
}
