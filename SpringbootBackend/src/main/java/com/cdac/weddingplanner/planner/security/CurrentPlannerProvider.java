package com.weddingplanner.plannerservice.security;

import com.weddingplanner.plannerservice.exception.UnauthorizedActionException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentPlannerProvider {

    public Long getCurrentPlannerId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof PlannerPrincipal plannerPrincipal) {
            return plannerPrincipal.getPlannerId();
        }
        throw new UnauthorizedActionException("No authenticated planner found in security context");
    }
}
