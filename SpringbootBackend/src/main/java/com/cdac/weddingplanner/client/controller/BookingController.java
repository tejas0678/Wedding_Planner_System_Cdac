package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.client.dto.ApiResponse;
import com.cdac.weddingplanner.client.dto.BookingRequest;
import com.cdac.weddingplanner.client.dto.BookingResponse;
import com.cdac.weddingplanner.client.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ApiResponse<List<BookingResponse>> getBookings(@RequestParam(defaultValue = "1") Long userId) {
        return ApiResponse.success(bookingService.getBookingsForUser(userId));
    }

    @PostMapping
    public ApiResponse<BookingResponse> createBooking(@RequestParam(defaultValue = "1") Long userId,
                                                        @RequestBody BookingRequest request) {
        return ApiResponse.success("Booking request created successfully", bookingService.createBooking(userId, request));
    }

    @DeleteMapping("/{bookingId}")
    public ApiResponse<Void> deleteBooking(@RequestParam(defaultValue = "1") Long userId,
                                            @PathVariable String bookingId) {
        bookingService.deleteBooking(userId, bookingId);
        return ApiResponse.success("Booking removed successfully", null);
    }
}
