package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.request.LoginRequest;
import com.weddingplanner.plannerservice.dto.request.RegisterPlannerRequest;
import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.AuthResponse;
import com.weddingplanner.plannerservice.service.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Matches src/services/authService.js exactly:
 *   POST /api/auth/login
 *   POST /api/auth/register/planner
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth", description = "Registration and login for planners")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/planner")
    public ResponseEntity<ApiResponse<AuthResponse>> registerPlanner(@Valid @RequestBody RegisterPlannerRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Planner registered successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }
}
