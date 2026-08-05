package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.dto.BookingRequestDTO;
import com.cdac.weddingplanner.client.dto.BookingResponseDTO;
import com.cdac.weddingplanner.client.dto.CustomizationRequestDTO;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.CustomizationRequest;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.CustomizationRequestRepository;
import com.cdac.weddingplanner.client.service.BookingService;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.NotificationService;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.repository.PlannerPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PlannerPackageRepository packageRepository;
    private final CustomizationRequestRepository customizationRequestRepository;
    private final NotificationService notificationService;

    @Override
    public BookingCreationResult createBooking(BookingRequestDTO request) {
        User user = resolveAuthenticatedOrFirstClient();

        BigDecimal numericAmount = BigDecimal.ZERO;
        if (request.getAmount() != null) {
            String rawAmount = request.getAmount().toString().replaceAll("[^0-9.]", "");
            if (!rawAmount.isEmpty()) {
                try {
                    numericAmount = new BigDecimal(rawAmount);
                } catch (Exception ignored) {}
            }
        }

        if (request.getEventDate() == null || request.getEventDate().trim().isEmpty()) {
            throw new RuntimeException("Event date is required");
        }
        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(request.getEventDate().trim());
        } catch (Exception e) {
            throw new RuntimeException("Invalid event date format. Use YYYY-MM-DD.");
        }
        if (parsedDate.isBefore(LocalDate.now())) {
            throw new RuntimeException("Event date cannot be in the past");
        }

        Long reqPlannerId = request.getPlannerId();
        Long reqPackageId = request.getPackageId();

        User plannerUser = null;
        if (reqPlannerId != null) {
            plannerUser = userRepository.findById(reqPlannerId).orElse(null);
        }

        PlannerPackage pkgEntity = null;
        if (reqPackageId != null) {
            pkgEntity = packageRepository.findById(reqPackageId).orElse(null);
        }

        if (pkgEntity != null && (reqPlannerId == null || reqPlannerId <= 0)) {
            reqPlannerId = pkgEntity.getPlannerId();
            if (reqPlannerId != null) {
                plannerUser = userRepository.findById(reqPlannerId).orElse(null);
            }
        }

        String resolvedPlannerName = plannerUser != null ? (plannerUser.getBusinessName() != null ? plannerUser.getBusinessName() : plannerUser.getFullName()) : (request.getPlannerName() != null ? request.getPlannerName() : "Royal Touch Weddings Studio");
        String resolvedPackageName = pkgEntity != null ? pkgEntity.getPackageName() : (request.getPackageName() != null ? request.getPackageName() : "Royal Heritage Package");

        if (pkgEntity != null && numericAmount.equals(BigDecimal.ZERO) && pkgEntity.getPrice() != null) {
            numericAmount = pkgEntity.getPrice();
        }

        // Prevent duplicate creation within 5 seconds
        List<Booking> existingBookings = bookingRepository.findByUserIdOrderByIdDesc(user.getId());
        if (!existingBookings.isEmpty()) {
            Booking latest = existingBookings.get(0);
            if (latest.getPackageName() != null && latest.getPackageName().equals(resolvedPackageName)
                    && latest.getCreatedAt() != null
                    && latest.getCreatedAt().isAfter(java.time.LocalDateTime.now().minusSeconds(5))) {
                return new BookingCreationResult(mapToDTO(latest), false);
            }
        }

        // Prevent booking the same package on a date the client already has an active booking for
        final Long finalPackageId = reqPackageId;
        final LocalDate finalEventDate = parsedDate;
        boolean alreadyBooked = existingBookings.stream().anyMatch(b ->
                finalPackageId != null && finalPackageId.equals(b.getPackageId())
                        && finalEventDate.equals(b.getEventDate())
                        && b.getStatus() != Booking.BookingStatus.REJECTED
                        && b.getStatus() != Booking.BookingStatus.CANCELLED
        );
        if (alreadyBooked) {
            throw new RuntimeException("You already have a booking for this package on " + finalEventDate + ".");
        }

        Booking booking = Booking.builder()
                .user(user)
                .packageId(reqPackageId != null ? reqPackageId : 1L)
                .plannerId(reqPlannerId != null ? reqPlannerId : 1L)
                .packageName(resolvedPackageName)
                .plannerName(resolvedPlannerName)
                .guestCount(request.getGuestCount() != null ? request.getGuestCount() : "300 Guests")
                .eventDate(parsedDate)
                .venueName(request.getVenueName() != null ? request.getVenueName() : "The Leela Palace Resort, Udaipur")
                .status(Booking.BookingStatus.PENDING)
                .totalAmount(numericAmount)
                .paidAmount(BigDecimal.ZERO)
                .paymentStatus(Booking.PaymentStatus.PENDING)
                .notes(request.getNotes() != null ? request.getNotes() : "Created via online package booking")
                .eventImageUrl(request.getEventImageUrl())
                .eventImagePublicId(request.getEventImagePublicId())
                .build();

        Booking saved = bookingRepository.save(booking);

        notificationService.createNotification(
                saved.getPlannerId(),
                Role.PLANNER,
                "New Booking Request Received",
                "You have received a new booking for \"" + resolvedPackageName + "\" on " + finalEventDate + ".",
                NotificationType.INFO,
                "BOOKING",
                saved.getId()
        );

        notificationService.createNotification(
                user.getId(),
                Role.USER,
                "Booking Submitted",
                "Your booking for \"" + resolvedPackageName + "\" on " + finalEventDate + " has been submitted successfully.",
                NotificationType.SUCCESS,
                "BOOKING",
                saved.getId()
        );

        return new BookingCreationResult(mapToDTO(saved), true);
    }

    @Override
    public List<BookingResponseDTO> getClientBookings() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal()))
                ? auth.getName()
                : null;

        User user = null;
        if (authEmail != null) {
            user = userRepository.findByEmail(authEmail).orElse(null);
        }

        List<Booking> bookings;
        if (user != null) {
            bookings = bookingRepository.findByUserIdOrderByIdDesc(user.getId());
        } else {
            bookings = bookingRepository.findAll().stream()
                    .sorted((a, b) -> b.getId().compareTo(a.getId()))
                    .toList();
        }

        return bookings.stream().map(this::mapToDTO).toList();
    }

    @Override
    public void removeBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public CustomizationRequestDTO submitCustomization(Long bookingId, CustomizationRequestDTO requestDTO) {
        User user = resolveAuthenticatedOrFirstClient();

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        CustomizationRequest customization = CustomizationRequest.builder()
                .booking(booking)
                .client(user)
                .plannerId(booking.getPlannerId())
                .packageId(booking.getPackageId())
                .foodPreference(requestDTO.getFoodPreference())
                .welcomeDrink(requestDTO.getWelcomeDrink())
                .drinkName(requestDTO.getDrinkName())
                .drinkQuantity(requestDTO.getDrinkQuantity())
                .preWeddingShoot(requestDTO.getPreWeddingShoot())
                .shootLocation(requestDTO.getShootLocation())
                .shootDuration(requestDTO.getShootDuration())
                .cinematicVideo(requestDTO.getCinematicVideo())
                .djRequired(requestDTO.getDjRequired())
                .djType(requestDTO.getDjType())
                .updatedPrice(requestDTO.getUpdatedPrice())
                .status(CustomizationRequest.CustomizationStatus.PENDING)
                .build();

        CustomizationRequest saved = customizationRequestRepository.save(customization);

        notificationService.createNotification(
                saved.getPlannerId(),
                Role.PLANNER,
                "Client Requested Modifications",
                user.getFullName() + " sent a package customization request for booking " + booking.getBookingNumber() + ".",
                NotificationType.INFO,
                "CUSTOMIZATION",
                saved.getId()
        );

        return CustomizationRequestDTO.builder()
                .id(saved.getId())
                .bookingId(saved.getBooking().getId())
                .clientName(saved.getClient().getFullName())
                .plannerId(saved.getPlannerId())
                .packageId(saved.getPackageId())
                .foodPreference(saved.getFoodPreference())
                .welcomeDrink(saved.getWelcomeDrink())
                .drinkName(saved.getDrinkName())
                .drinkQuantity(saved.getDrinkQuantity())
                .preWeddingShoot(saved.getPreWeddingShoot())
                .shootLocation(saved.getShootLocation())
                .shootDuration(saved.getShootDuration())
                .cinematicVideo(saved.getCinematicVideo())
                .djRequired(saved.getDjRequired())
                .djType(saved.getDjType())
                .updatedPrice(saved.getUpdatedPrice())
                .status(saved.getStatus().name())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    public void approveCustomization(Long id) {
        CustomizationRequest req = customizationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(CustomizationRequest.CustomizationStatus.APPROVED_BY_CLIENT);
        customizationRequestRepository.save(req);

        notificationService.createNotification(
                req.getPlannerId(),
                Role.PLANNER,
                "Customization Approved by Client",
                req.getClient().getFullName() + " approved your customized package quotation.",
                NotificationType.SUCCESS,
                "CUSTOMIZATION",
                req.getId()
        );
    }

    @Override
    public void rejectCustomization(Long id) {
        CustomizationRequest req = customizationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus(CustomizationRequest.CustomizationStatus.REJECTED_BY_CLIENT);
        customizationRequestRepository.save(req);

        notificationService.createNotification(
                req.getPlannerId(),
                Role.PLANNER,
                "Customization Rejected by Client",
                req.getClient().getFullName() + " rejected your customized package quotation.",
                NotificationType.WARNING,
                "CUSTOMIZATION",
                req.getId()
        );
    }

    private User resolveAuthenticatedOrFirstClient() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal()))
                ? auth.getName()
                : null;

        User user = null;
        if (authEmail != null) {
            user = userRepository.findByEmail(authEmail).orElse(null);
        }
        if (user == null) {
            user = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == Role.USER)
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Client user not found"));
        }
        return user;
    }

    private BookingResponseDTO mapToDTO(Booking b) {
        String customStatus = null;
        CustomizationRequestDTO customDto = null;
        List<CustomizationRequest> requests = customizationRequestRepository.findByBookingId(b.getId());
        if (!requests.isEmpty()) {
            CustomizationRequest latestReq = requests.get(requests.size() - 1);
            customStatus = latestReq.getStatus().name();
            customDto = CustomizationRequestDTO.builder()
                .id(latestReq.getId())
                .bookingId(latestReq.getBooking().getId())
                .plannerId(latestReq.getPlannerId())
                .packageId(latestReq.getPackageId())
                .foodPreference(latestReq.getFoodPreference())
                .welcomeDrink(latestReq.getWelcomeDrink())
                .drinkName(latestReq.getDrinkName())
                .drinkQuantity(latestReq.getDrinkQuantity())
                .preWeddingShoot(latestReq.getPreWeddingShoot())
                .shootLocation(latestReq.getShootLocation())
                .shootDuration(latestReq.getShootDuration())
                .cinematicVideo(latestReq.getCinematicVideo())
                .djRequired(latestReq.getDjRequired())
                .djType(latestReq.getDjType())
                .updatedPrice(latestReq.getUpdatedPrice())
                .plannerNotes(latestReq.getPlannerNotes())
                .status(latestReq.getStatus().name())
                .createdAt(latestReq.getCreatedAt())
                .build();
        }

        String formattedPrice = b.getTotalAmount() != null
                ? "₹" + String.format("%,d", b.getTotalAmount().longValue())
                : "₹0";

        String bookingDateStr = b.getCreatedAt() != null
                ? b.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
                : LocalDate.now().toString();

        String eventDateStr = b.getEventDate() != null
                ? b.getEventDate().toString()
                : LocalDate.now().plusDays(30).toString();

        return BookingResponseDTO.builder()
                .id(b.getId())
                .bookingId(b.getBookingNumber() != null ? b.getBookingNumber() : "WPB-" + b.getId())
                .clientId(b.getUser() != null ? b.getUser().getId() : null)
                .clientName(b.getUser() != null ? b.getUser().getFullName() : "Client User")
                .clientEmail(b.getUser() != null ? b.getUser().getEmail() : "client@gmail.com")
                .packageId(b.getPackageId())
                .packageName(b.getPackageName())
                .packageImage("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800")
                .packagePrice(formattedPrice)
                .amount(formattedPrice)
                .totalAmount(b.getTotalAmount())
                .paidAmount(b.getPaidAmount())
                .plannerId(b.getPlannerId())
                .plannerName(b.getPlannerName())
                .bookingDate(bookingDateStr)
                .eventDate(eventDateStr)
                .venue(b.getVenueName())
                .location(b.getVenueName())
                .guestCount(b.getGuestCount())
                .bookingStatus(b.getStatus() != null ? b.getStatus().name() : "PENDING")
                .paymentStatus(b.getPaymentStatus() != null ? b.getPaymentStatus().name() : "PENDING")
                .notes(b.getNotes())
                .eventImageUrl(b.getEventImageUrl())
                .customizationStatus(customStatus)
                .customizationRequest(customDto)
                .build();
    }
}
