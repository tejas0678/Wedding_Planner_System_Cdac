package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private String bookingNumber;
    private Long plannerId;
    private String plannerName;
    private String clientName;
    private String packageName;
    private LocalDate weddingDate;
    private String venue;
    /** Pre-formatted currency string, e.g. "₹7,65,600" - matches the frontend contract. */
    private String amount;
    private String status;
    private String paymentStatus;
}
