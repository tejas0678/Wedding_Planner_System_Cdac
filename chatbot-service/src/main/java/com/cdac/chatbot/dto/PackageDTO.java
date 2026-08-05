package com.cdac.chatbot.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Mirrors the main backend's ChatPackageDTO. Contains only public,
 * non-sensitive fields - no IDs or planner ownership details.
 */
@Getter
@Setter
@NoArgsConstructor
public class PackageDTO {

    private String packageName;
    private BigDecimal price;
    private String category;
    private String eventType;
    private String theme;
    private String city;
    private Integer guestCapacity;
    private String servicesIncluded;
    private String description;
    private Boolean photography;
}
