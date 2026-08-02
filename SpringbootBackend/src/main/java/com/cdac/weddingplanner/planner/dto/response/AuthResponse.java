package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Matches authService.js's destructuring exactly:
 * const { token, role, userName, userEmail, userId } = res.data;
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String tokenType;
    private String role;
    private String userName;
    private String userEmail;
    private Long userId;
}
