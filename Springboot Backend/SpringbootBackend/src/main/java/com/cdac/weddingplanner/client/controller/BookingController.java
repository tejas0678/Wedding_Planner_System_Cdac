package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.client.dto.BookingRequestDTO;
import com.cdac.weddingplanner.client.dto.BookingResponseDTO;
import com.cdac.weddingplanner.client.dto.CustomizationRequestDTO;
import com.cdac.weddingplanner.client.service.BookingService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/bookings", "/bookings", "/client/bookings", "/api/client/bookings"})
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponseDTO>> createBooking(@RequestBody BookingRequestDTO request) {
        BookingService.BookingCreationResult result = bookingService.createBooking(request);
        HttpStatus status = result.newlyCreated() ? HttpStatus.CREATED : HttpStatus.OK;
        return ResponseEntity.status(status)
                .body(ApiResponse.success("Booking request submitted successfully", result.booking()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponseDTO>>> getClientBookings() {
        List<BookingResponseDTO> dtoList = bookingService.getClientBookings();
        return ResponseEntity.ok(ApiResponse.success(dtoList));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> removeBooking(@PathVariable Long id) {
        bookingService.removeBooking(id);
        return ResponseEntity.ok(ApiResponse.success("Booking removed successfully"));
    }

    @PostMapping("/{bookingId}/customize")
    public ResponseEntity<ApiResponse<CustomizationRequestDTO>> submitCustomization(
            @PathVariable Long bookingId,
            @RequestBody CustomizationRequestDTO requestDTO) {
        CustomizationRequestDTO responseDto = bookingService.submitCustomization(bookingId, requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Customization request submitted successfully", responseDto));
    }

    @PutMapping("/customizations/{id}/approve")
    public ResponseEntity<ApiResponse<String>> approveCustomization(@PathVariable Long id) {
        bookingService.approveCustomization(id);
        return ResponseEntity.ok(ApiResponse.success("Customization approved successfully"));
    }

    @PutMapping("/customizations/{id}/reject")
    public ResponseEntity<ApiResponse<String>> rejectCustomization(@PathVariable Long id) {
        bookingService.rejectCustomization(id);
        return ResponseEntity.ok(ApiResponse.success("Customization rejected successfully"));
    }
}
