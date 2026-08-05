package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminBookingService;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.CustomizationRequest;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.CustomizationRequestRepository;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.repository.PlannerPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminBookingServiceImpl implements AdminBookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final PlannerPackageRepository plannerPackageRepository;
    private final CustomizationRequestRepository customizationRequestRepository;
    private final CloudinaryService cloudinaryService;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Map<String, Object> getBookingDetails(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));

        User planner = booking.getPlannerId() != null
                ? userRepository.findById(booking.getPlannerId()).orElse(null)
                : null;
        PlannerPackage plannerPackage = booking.getPackageId() != null
                ? plannerPackageRepository.findById(booking.getPackageId()).orElse(null)
                : null;
        List<CustomizationRequest> customizations = customizationRequestRepository.findByBookingId(id);

        Map<String, Object> details = new HashMap<>();
        details.put("booking", booking);
        details.put("client", booking.getUser());
        details.put("planner", planner);
        details.put("package", plannerPackage);
        details.put("customizations", customizations);

        return details;
    }

    @Override
    @Transactional
    public Booking updateStatus(Long id, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));

        List<CustomizationRequest> customizations = customizationRequestRepository.findByBookingId(id);
        if (!customizations.isEmpty()) {
            throw new RuntimeException(
                    "Cannot delete: this booking has " + customizations.size()
                            + " customization request(s) linked to it. Cancel the booking instead.");
        }

        cloudinaryService.deleteImage(booking.getEventImagePublicId());
        bookingRepository.delete(booking);
    }
}
