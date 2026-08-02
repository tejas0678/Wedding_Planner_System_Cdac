package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.response.BookingResponse;
import com.weddingplanner.plannerservice.enums.BookingStatus;

import java.util.List;

public interface BookingService {
    List<BookingResponse> getBookings(Long plannerId);
    BookingResponse updateBookingStatus(Long plannerId, Long bookingId, BookingStatus status);
}
