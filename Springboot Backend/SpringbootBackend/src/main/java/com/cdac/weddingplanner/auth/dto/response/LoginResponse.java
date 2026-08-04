package com.cdac.weddingplanner.auth.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private boolean success;
    private String message;
    private AuthData data;
}
