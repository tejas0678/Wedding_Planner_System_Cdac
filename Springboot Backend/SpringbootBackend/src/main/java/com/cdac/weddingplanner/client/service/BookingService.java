package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.client.dto.BookingRequestDTO;
import com.cdac.weddingplanner.client.dto.BookingResponseDTO;
import com.cdac.weddingplanner.client.dto.CustomizationRequestDTO;

import java.util.List;

public interface BookingService {

    /**
     * Result of a booking creation attempt. {@code newlyCreated} is false when an
     * identical booking submitted within the last 5 seconds was returned instead
     * of creating a duplicate row — the controller uses this to pick HTTP 200 vs 201.
     */
    record BookingCreationResult(BookingResponseDTO booking, boolean newlyCreated) {}

    BookingCreationResult createBooking(BookingRequestDTO request);

    List<BookingResponseDTO> getClientBookings();

    void removeBooking(Long id);

    CustomizationRequestDTO submitCustomization(Long bookingId, CustomizationRequestDTO requestDTO);

    void approveCustomization(Long id);

    void rejectCustomization(Long id);
}
