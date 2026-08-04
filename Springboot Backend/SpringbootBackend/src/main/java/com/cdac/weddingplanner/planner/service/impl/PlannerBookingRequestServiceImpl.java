package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.NotificationService;
import com.cdac.weddingplanner.planner.service.PlannerBookingRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlannerBookingRequestServiceImpl implements PlannerBookingRequestService {

    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;

    @Override
    public List<Booking> getBookingRequests(Long plannerId) {
        return bookingRepository.findByPlannerId(plannerId);
    }

    @Override
    @Transactional
    public Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);

        if (updated.getUser() != null) {
            String title;
            NotificationType type;
            switch (updated.getStatus()) {
                case CONFIRMED -> { title = "Booking Confirmed"; type = NotificationType.SUCCESS; }
                case REJECTED -> { title = "Booking Rejected"; type = NotificationType.ERROR; }
                case CANCELLED -> { title = "Booking Cancelled"; type = NotificationType.WARNING; }
                case COMPLETED -> { title = "Booking Completed"; type = NotificationType.SUCCESS; }
                default -> { title = "Booking Status Updated"; type = NotificationType.INFO; }
            }
            notificationService.createNotification(
                    updated.getUser().getId(),
                    Role.USER,
                    title,
                    "Your booking " + updated.getBookingNumber() + " for \"" + updated.getPackageName() + "\" is now " + updated.getStatus().name() + ".",
                    type,
                    "BOOKING",
                    updated.getId()
            );
        }

        return updated;
    }
}
