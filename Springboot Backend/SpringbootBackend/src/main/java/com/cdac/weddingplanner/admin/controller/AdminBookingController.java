package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminBookingService;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {

    private final AdminBookingService adminBookingService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {
        List<Booking> bookings = adminBookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBookingDetails(@PathVariable Long id) {
        Map<String, Object> details = adminBookingService.getBookingDetails(id);
        return ResponseEntity.ok(ApiResponse.success(details));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Booking>> updateStatus(
            @PathVariable Long id,
            @RequestParam Booking.BookingStatus status
    ) {
        Booking updated = adminBookingService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Booking status updated to " + status, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteBooking(@PathVariable Long id) {
        adminBookingService.deleteBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking deleted successfully"));
    }
}
