package com.cdac.weddingplanner.auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResetPasswordRequest {

    private String token;
    private String email;
    private String otp;

    @NotBlank(message = "New password is required")
    private String newPassword;
}
