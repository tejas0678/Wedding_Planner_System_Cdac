package com.weddingplanner.plannerservice.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Lightweight authenticated-user context extracted from the JWT,
 * attached to the SecurityContext for use inside controllers/services.
 */
@Getter
@AllArgsConstructor
public class PlannerPrincipal {
    private final Long plannerId;
    private final String email;
    private final String role;
}
