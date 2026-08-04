package com.cdac.weddingplanner.client.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private Long id;
    private String bookingId;
    private Long clientId;
    private String clientName;
    private String clientEmail;

    private Long packageId;
    private String packageName;
    private String packageImage;
    private String packagePrice;

    private Long plannerId;
    private String plannerName;

    private String bookingDate;
    private String eventDate;
    private String venue;
    private String location;
    private String guestCount;

    private String bookingStatus;
    private String paymentStatus;
    private String amount;
    private BigDecimal totalAmount;
    private BigDecimal paidAmount;
    private String notes;
    private String eventImageUrl;
    private String customizationStatus;
    private CustomizationRequestDTO customizationRequest;
}
