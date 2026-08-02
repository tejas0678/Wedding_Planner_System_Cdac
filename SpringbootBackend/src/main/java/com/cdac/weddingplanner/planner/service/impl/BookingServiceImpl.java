package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.response.BookingResponse;
import com.weddingplanner.plannerservice.entity.Booking;
import com.weddingplanner.plannerservice.entity.Planner;
import com.weddingplanner.plannerservice.enums.BookingStatus;
import com.weddingplanner.plannerservice.exception.ResourceNotFoundException;
import com.weddingplanner.plannerservice.repository.BookingRepository;
import com.weddingplanner.plannerservice.repository.PlannerRepository;
import com.weddingplanner.plannerservice.service.BookingService;
import com.weddingplanner.plannerservice.util.InrFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final PlannerRepository plannerRepository;

    @Override
    public List<BookingResponse> getBookings(Long plannerId) {
        String plannerName = plannerRepository.findById(plannerId).map(Planner::getName).orElse(null);
        return bookingRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).stream()
                .map(b -> toResponse(b, plannerName))
                .toList();
    }

    @Override
    @Transactional
    public BookingResponse updateBookingStatus(Long plannerId, Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findByIdAndPlannerId(bookingId, plannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        booking.setStatus(status);
        Booking saved = bookingRepository.save(booking);

        String plannerName = plannerRepository.findById(plannerId).map(Planner::getName).orElse(null);
        return toResponse(saved, plannerName);
    }

    private BookingResponse toResponse(Booking booking, String plannerName) {
        return BookingResponse.builder()
                .id(booking.getId())
                .bookingNumber(booking.getBookingNumber())
                .plannerId(booking.getPlannerId())
                .plannerName(plannerName)
                .clientName(booking.getClientName())
                .packageName(booking.getPackageName())
                .weddingDate(booking.getWeddingDate())
                .venue(booking.getVenue())
                .amount(InrFormatter.format(booking.getAmount()))
                .status(booking.getStatus().name())
                .paymentStatus(booking.getPaymentStatus())
                .build();
    }
}
