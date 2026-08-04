package com.cdac.weddingplanner.admin.service;

import com.cdac.weddingplanner.client.entity.Booking;

import java.util.List;
import java.util.Map;

public interface AdminBookingService {

    List<Booking> getAllBookings();

    Map<String, Object> getBookingDetails(Long id);

    Booking updateStatus(Long id, Booking.BookingStatus status);

    void deleteBooking(Long id);
}
