package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.client.dto.BookingRequest;
import com.cdac.weddingplanner.client.dto.BookingResponse;

import java.util.List;

public interface BookingService {

    List<BookingResponse> getBookingsForUser(Long userId);

    BookingResponse createBooking(Long userId, BookingRequest request);

    void deleteBooking(Long userId, String bookingId);
}
