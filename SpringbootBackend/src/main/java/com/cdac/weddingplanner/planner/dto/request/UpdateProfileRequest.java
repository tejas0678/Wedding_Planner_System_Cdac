package com.weddingplanner.plannerservice.dto.request;

import lombok.Data;

/**
 * Accepts both naming conventions used across the frontend:
 *  - PlannerProfile.jsx sends: { name, businessName, email, phone, experience, specialization, image, bio }
 *  - PlannerDashboard.jsx sends: { ownerName, businessName, email, phone, gstNumber, description }
 * Whichever alias is present wins; both map onto the same Planner fields.
 */
@Data
public class UpdateProfileRequest {
    private String name;
    private String ownerName;
    private String businessName;
    private String email;
    private String phone;
    private String gstNumber;
    private String experience;
    private String specialization;
    private String image;
    private String bio;
    private String description;
}
