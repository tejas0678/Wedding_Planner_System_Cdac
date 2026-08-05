package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.service.PlannerBookingRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/booking-requests")
@RequiredArgsConstructor
public class PlannerBookingRequestController {

    private final PlannerBookingRequestService plannerBookingRequestService;

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getBookingRequests(@PathVariable Long plannerId) {
        List<Booking> requests = plannerBookingRequestService.getBookingRequests(plannerId);
        return ResponseEntity.ok(ApiResponse.success(requests));
    }

    @PutMapping("/{bookingId}/accept")
    public ResponseEntity<ApiResponse<Booking>> acceptBooking(@PathVariable Long bookingId) {
        Booking updated = plannerBookingRequestService.updateBookingStatus(bookingId, Booking.BookingStatus.CONFIRMED);
        return ResponseEntity.ok(ApiResponse.success("Booking accepted successfully", updated));
    }

    @PutMapping("/{bookingId}/reject")
    public ResponseEntity<ApiResponse<Booking>> rejectBooking(@PathVariable Long bookingId) {
        Booking updated = plannerBookingRequestService.updateBookingStatus(bookingId, Booking.BookingStatus.REJECTED);
        return ResponseEntity.ok(ApiResponse.success("Booking rejected successfully", updated));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<ApiResponse<Booking>> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam Booking.BookingStatus status
    ) {
        Booking updated = plannerBookingRequestService.updateBookingStatus(bookingId, status);
        return ResponseEntity.ok(ApiResponse.success("Booking status updated to " + status, updated));
    }
}
