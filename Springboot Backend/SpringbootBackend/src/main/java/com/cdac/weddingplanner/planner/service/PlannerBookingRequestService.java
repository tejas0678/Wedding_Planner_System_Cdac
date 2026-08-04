package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.client.entity.Booking;

import java.util.List;

public interface PlannerBookingRequestService {

    List<Booking> getBookingRequests(Long plannerId);

    Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status);
}
