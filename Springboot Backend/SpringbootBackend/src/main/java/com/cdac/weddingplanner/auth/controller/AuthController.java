package com.cdac.weddingplanner.auth.controller;

import com.cdac.weddingplanner.auth.dto.request.*;
import com.cdac.weddingplanner.auth.dto.response.LoginResponse;
import com.cdac.weddingplanner.auth.service.AuthService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping({"/register/client", "/register/client/"})
    public ResponseEntity<ApiResponse<String>> registerClient(@Valid @RequestBody RegisterClientRequest request) {
        ApiResponse<String> response = authService.registerClient(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/register/planner", "/register/planner/"})
    public ResponseEntity<ApiResponse<String>> registerPlanner(@Valid @RequestBody RegisterPlannerRequest request) {
        ApiResponse<String> response = authService.registerPlanner(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/login", "/login/"})
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/forgot-password", "/forgot-password/"})
    public ResponseEntity<ApiResponse<String>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        ApiResponse<String> response = authService.forgotPassword(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/verify-otp", "/verify-otp/"})
    public ResponseEntity<ApiResponse<String>> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        ApiResponse<String> response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/reset-password", "/reset-password/"})
    public ResponseEntity<ApiResponse<String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        ApiResponse<String> response = authService.resetPassword(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping({"/health", "/health/"})
    public ResponseEntity<ApiResponse<String>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success("WeddingPlannerAuthService is running on port 8080"));
    }
}
