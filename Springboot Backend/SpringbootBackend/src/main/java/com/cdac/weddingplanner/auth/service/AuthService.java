package com.cdac.weddingplanner.auth.service;

import com.cdac.weddingplanner.auth.dto.request.*;
import com.cdac.weddingplanner.auth.dto.response.LoginResponse;
import com.cdac.weddingplanner.common.dto.ApiResponse;

public interface AuthService {

    ApiResponse<String> registerClient(RegisterClientRequest request);

    ApiResponse<String> registerPlanner(RegisterPlannerRequest request);

    LoginResponse login(LoginRequest request);

    ApiResponse<String> forgotPassword(ForgotPasswordRequest request);

    ApiResponse<String> verifyOtp(VerifyOtpRequest request);

    ApiResponse<String> resetPassword(ResetPasswordRequest request);
}
