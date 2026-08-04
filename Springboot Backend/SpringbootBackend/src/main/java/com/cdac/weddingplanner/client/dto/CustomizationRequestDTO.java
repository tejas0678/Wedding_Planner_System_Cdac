package com.cdac.weddingplanner.client.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomizationRequestDTO {
    private Long id;
    private Long bookingId;
    private String clientName;
    private Long plannerId;
    private Long packageId;
    private String foodPreference;
    private Boolean welcomeDrink;
    private String drinkName;
    private Integer drinkQuantity;
    private Boolean preWeddingShoot;
    private String shootLocation;
    private String shootDuration;
    private Boolean cinematicVideo;
    private Boolean djRequired;
    private String djType;
    private BigDecimal updatedPrice;
    private String plannerNotes;
    private String status;
    private LocalDateTime createdAt;
}
