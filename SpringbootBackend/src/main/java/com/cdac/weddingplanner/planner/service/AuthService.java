package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.request.LoginRequest;
import com.weddingplanner.plannerservice.dto.request.RegisterPlannerRequest;
import com.weddingplanner.plannerservice.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterPlannerRequest request);
    AuthResponse login(LoginRequest request);
}
