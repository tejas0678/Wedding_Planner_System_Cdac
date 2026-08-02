package com.weddingplanner.plannerservice.controller;

import com.weddingplanner.plannerservice.dto.response.ApiResponse;
import com.weddingplanner.plannerservice.dto.response.BookingResponse;
import com.weddingplanner.plannerservice.enums.BookingStatus;
import com.weddingplanner.plannerservice.security.CurrentPlannerProvider;
import com.weddingplanner.plannerservice.service.BookingService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Matches src/services/plannerService.js:
 *   GET /api/planner/bookings
 *   PUT /api/planner/bookings/{bookingId}/status?status=ACCEPTED   (status is a query param, not a body)
 */
@RestController
@RequestMapping("/api/planner/bookings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PLANNER')")
@SecurityRequirement(name = "bearerAuth")
@Tag(name = "Planner Bookings", description = "View wedding booking requests and accept/reject them")
public class BookingController {

    private final BookingService bookingService;
    private final CurrentPlannerProvider currentPlannerProvider;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getBookings() {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        return ResponseEntity.ok(ApiResponse.success(bookingService.getBookings(plannerId)));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<ApiResponse<BookingResponse>> updateStatus(@PathVariable Long bookingId,
                                                                       @RequestParam BookingStatus status) {
        Long plannerId = currentPlannerProvider.getCurrentPlannerId();
        BookingResponse response = bookingService.updateBookingStatus(plannerId, bookingId, status);
        return ResponseEntity.ok(ApiResponse.success("Booking status updated successfully", response));
    }
}
