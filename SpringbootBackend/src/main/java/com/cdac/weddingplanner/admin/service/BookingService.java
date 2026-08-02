package com.cdac.weddingplanner.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.BookingDTO;
import com.cdac.weddingplanner.admin.dto.BookingRequestDTO;

import jakarta.validation.Valid;

public interface BookingService {

	Page<BookingDTO> getAllBookings(Pageable pageable);

	BookingDTO getBookingById(Long id);

	ApiResponse updateBookingStatus(Long id, String status);

	ApiResponse deleteBooking(Long id);

	ApiResponse updateBooking(Long id, @Valid BookingRequestDTO dto);

}
