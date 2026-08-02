package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.client.dto.BookingRequest;
import com.cdac.weddingplanner.client.dto.BookingResponse;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.ClientProfile;
import com.cdac.weddingplanner.client.entity.Planner;
import com.cdac.weddingplanner.client.exception.ResourceNotFoundException;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.ClientProfileRepository;
import com.cdac.weddingplanner.client.repository.PlannerRepository;
import com.cdac.weddingplanner.client.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final PlannerRepository plannerRepository;
    private final ClientProfileRepository clientProfileRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                               PlannerRepository plannerRepository,
                               ClientProfileRepository clientProfileRepository) {
        this.bookingRepository = bookingRepository;
        this.plannerRepository = plannerRepository;
        this.clientProfileRepository = clientProfileRepository;
    }

    @Override
    public List<BookingResponse> getBookingsForUser(Long userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public BookingResponse createBooking(Long userId, BookingRequest request) {
        Optional<ClientProfile> profile = clientProfileRepository.findByUserId(userId);
        Optional<Planner> planner = request.getPlannerId() != null
                ? plannerRepository.findById(request.getPlannerId())
                : Optional.empty();

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setBookingNumber(generateBookingNumber());

        booking.setClientName(profile.map(ClientProfile::getFullName).orElse("Guest User"));
        booking.setClientEmail(profile.map(ClientProfile::getEmail).orElse(null));

        booking.setPackageId(request.getPackageId());
        booking.setPackageName(request.getPackageName());

        booking.setPlannerId(request.getPlannerId());
        booking.setPlannerName(planner.map(Planner::getBusinessName).orElse(request.getPlannerName()));
        booking.setPlannerPhone(planner.map(Planner::getPhone).orElse(null));
        booking.setPlannerAvatar(planner.map(Planner::getAvatarUrl).orElse(null));

        booking.setAmount(request.getAmount());
        booking.setGuestCount(request.getGuestCount());
        booking.setVenue(request.getVenue());
        booking.setLocation(request.getLocation() != null
                ? request.getLocation()
                : planner.map(Planner::getCity).orElse(null));

        if (request.getWeddingDate() != null && !request.getWeddingDate().isBlank()) {
            try {
                booking.setWeddingDate(LocalDate.parse(request.getWeddingDate()));
            } catch (Exception ignored) {
                // leave wedding date unset if it cannot be parsed
            }
        }

        booking.setStatus("PENDING");
        booking.setPaymentStatus("PENDING");
        booking.setStageText("Stage 1 of 8: Booking Request Submitted");

        Booking saved = bookingRepository.save(booking);
        return toResponse(saved);
    }

    @Override
    public void deleteBooking(Long userId, String bookingId) {
        Booking booking = findOwnedBooking(userId, bookingId);
        bookingRepository.delete(booking);
    }

    private Booking findOwnedBooking(Long userId, String bookingId) {
        Optional<Booking> booking;
        try {
            Long numericId = Long.parseLong(bookingId);
            booking = bookingRepository.findById(numericId);
        } catch (NumberFormatException e) {
            booking = bookingRepository.findByBookingNumber(bookingId);
        }

        Booking found = booking.orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));
        if (!found.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Booking not found: " + bookingId);
        }
        return found;
    }

    private String generateBookingNumber() {
        String candidate;
        do {
            candidate = "WPB-" + ThreadLocalRandom.current().nextInt(100000, 999999);
        } while (bookingRepository.existsByBookingNumber(candidate));
        return candidate;
    }

    private BookingResponse toResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setBookingNumber(booking.getBookingNumber());
        response.setClientName(booking.getClientName());
        response.setClientEmail(booking.getClientEmail());

        response.setPlanner(booking.getPlannerName());
        response.setPlannerName(booking.getPlannerName());
        response.setPlannerPhone(booking.getPlannerPhone());
        response.setPlannerAvatar(booking.getPlannerAvatar());

        response.setPkg(booking.getPackageName());
        response.setPackageName(booking.getPackageName());

        response.setVenue(booking.getVenue());
        response.setLocation(booking.getLocation());
        response.setWeddingDate(booking.getWeddingDate() != null ? booking.getWeddingDate().toString() : null);
        response.setGuestCount(booking.getGuestCount());
        response.setAmount(booking.getAmount());
        response.setStatus(booking.getStatus());
        response.setPaymentStatus(booking.getPaymentStatus());
        response.setStageText(booking.getStageText());

        if (booking.getWeddingDate() != null) {
            long days = ChronoUnit.DAYS.between(LocalDate.now(), booking.getWeddingDate());
            response.setCountdownDays(Math.max(days, 0));
        }

        return response;
    }
}
