package com.cdac.weddingplanner.admin.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.weddingplanner.admin.dto.BookingRequestDTO;
import com.cdac.weddingplanner.admin.dto.StatusUpdateDTO;
import com.cdac.weddingplanner.admin.service.BookingService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/bookings")
@CrossOrigin
@RequiredArgsConstructor
public class BookingController {
	
	private final BookingService bookingService;
	
	@Operation(summary = "Get all bookings")
	@GetMapping
	public ResponseEntity<?> getAllBookings( @RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "100") int size)
	{
		Pageable pageable = Pageable.ofSize(size).withPage(page);
		return ResponseEntity.ok(bookingService.getAllBookings(pageable).getContent());
	}
	
	@Operation(summary = "Get booking by id")
	@GetMapping("/{id}")
	public ResponseEntity<?> getBookingById(@RequestParam Long id)
	{
		return ResponseEntity.ok(bookingService.getBookingById(id));
	}
	
	@Operation(summary = "Update booking status (PENDING / CONFIRMED / COMPLETED / CANCELLED)")
	@PutMapping("/{id}/status")
	public ResponseEntity<?> updateBookingStatus(@PathVariable Long id,
			@Valid @RequestBody StatusUpdateDTO dto) {
		return ResponseEntity.ok(bookingService.updateBookingStatus(id, dto.getStatus()));
	}

	@Operation(summary = "Delete a booking")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
		return ResponseEntity.ok(bookingService.deleteBooking(id));
	}
	@Operation(summary = "Update booking details")
	@PutMapping("/{id}")
	public ResponseEntity<?> updateBooking(@PathVariable Long id,
			@Valid @RequestBody BookingRequestDTO dto) {
		return ResponseEntity.ok(bookingService.updateBooking(id, dto));
	}

}
