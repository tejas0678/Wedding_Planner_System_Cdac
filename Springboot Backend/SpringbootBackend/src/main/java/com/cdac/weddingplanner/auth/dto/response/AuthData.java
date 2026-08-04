package com.cdac.weddingplanner.auth.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthData {

    private String token;

    @Builder.Default
    private String tokenType = "Bearer";

    private String role;
    private String userName;
    private String userEmail;
    private Long userId;
}
