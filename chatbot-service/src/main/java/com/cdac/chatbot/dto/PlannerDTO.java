package com.cdac.chatbot.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Mirrors the main backend's ChatPlannerDTO. Contains only public,
 * non-sensitive fields - no IDs, emails, or phone numbers.
 */
@Getter
@Setter
@NoArgsConstructor
public class PlannerDTO {

    private String name;
    private String city;
    private String experience;
    private Double rating;
    private String description;
    private String startingPrice;
}
