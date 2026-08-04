package com.cdac.weddingplanner.client.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    private Long packageId;
    private Long plannerId;
    private String packageName;
    private String plannerName;
    private Object amount; // Accepts String or Number
    private String guestCount;
    private String eventDate;
    private String venueName;
    private String notes;
    private String eventImageUrl;
    private String eventImagePublicId;
}
