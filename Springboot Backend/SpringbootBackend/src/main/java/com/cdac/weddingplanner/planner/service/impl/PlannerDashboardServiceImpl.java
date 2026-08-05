package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.dto.CustomizationRequestDTO;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.CustomizationRequest;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.CustomizationRequestRepository;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import com.cdac.weddingplanner.common.service.NotificationService;
import com.cdac.weddingplanner.planner.entity.*;
import com.cdac.weddingplanner.planner.repository.*;
import com.cdac.weddingplanner.planner.service.PlannerDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PlannerDashboardServiceImpl implements PlannerDashboardService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PlannerPackageRepository packageRepository;
    private final VenueRepository venueRepository;
    private final CateringRepository cateringRepository;
    private final DecorationRepository decorationRepository;
    private final VendorRepository vendorRepository;
    private final GalleryRepository galleryRepository;
    private final CustomizationRequestRepository customizationRequestRepository;
    private final PlannerServiceItemRepository plannerServiceItemRepository;
    private final NotificationService notificationService;
    private final CloudinaryService cloudinaryService;

    private User getAuthenticatedPlanner() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            return userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Planner not found"));
        }
        // Fallback for dev if needed, or just throw
        return userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.PLANNER)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Map<String, Object> getDashboardStats() {
        User planner = getAuthenticatedPlanner();
        if (planner == null) return null;

        List<Booking> bookings = bookingRepository.findAll().stream()
                .filter(b -> b.getPlannerId() != null && b.getPlannerId().equals(planner.getId()))
                .toList();

        long activeWeddings = bookings.stream()
                .filter(b -> b.getStatus() == Booking.BookingStatus.CONFIRMED)
                .count();

        long completedWeddings = bookings.stream()
                .filter(b -> b.getStatus() == Booking.BookingStatus.COMPLETED)
                .count();

        // Real revenue received via Razorpay (Booking.paidAmount is updated by PaymentServiceImpl
        // on successful payment verification), not the projected value of confirmed bookings.
        BigDecimal totalEarnings = bookings.stream()
                .map(Booking::getPaidAmount)
                .filter(java.util.Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long totalPaidBookings = bookings.stream()
                .filter(b -> b.getPaymentStatus() == Booking.PaymentStatus.PAID)
                .count();

        long pendingPayments = bookings.stream()
                .filter(b -> b.getStatus() == Booking.BookingStatus.CONFIRMED && b.getPaymentStatus() == Booking.PaymentStatus.PENDING)
                .count();

        List<CustomizationRequest> customizations = customizationRequestRepository.findAll().stream()
                .filter(c -> c.getPlannerId() != null && c.getPlannerId().equals(planner.getId()))
                .toList();

        long pendingQuotes = customizations.stream()
                .filter(c -> c.getStatus() == CustomizationRequest.CustomizationStatus.PENDING)
                .count();

        long totalPackages = packageRepository.findAll().stream()
                .filter(p -> p.getPlannerId() != null && p.getPlannerId().equals(planner.getId()))
                .count();

        long totalServices = plannerServiceItemRepository.findByPlannerId(planner.getId()).size();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalEarnings", "₹" + String.format("%,.2f", totalEarnings.doubleValue()));
        stats.put("activeWeddings", activeWeddings);
        stats.put("pendingQuotes", pendingQuotes);
        stats.put("rating", planner.getRating() != null ? planner.getRating() : 4.5);
        stats.put("reviewsCount", 12); // Mock for now until Review entity is added
        stats.put("totalPackages", totalPackages);
        stats.put("totalServices", totalServices);
        stats.put("completedWeddings", completedWeddings);
        stats.put("businessName", planner.getBusinessName());
        stats.put("ownerName", planner.getFullName());
        stats.put("totalPaidBookings", totalPaidBookings);
        stats.put("pendingPayments", pendingPayments);

        return stats;
    }

    @Override
    public User getProfile() {
        return getAuthenticatedPlanner();
    }

    @Override
    public User updateProfile(User profileData) {
        User planner = userRepository.findByEmail(profileData.getEmail())
                .orElseThrow(() -> new RuntimeException("Planner not found: " + profileData.getEmail()));
        if (profileData.getBusinessName() != null) planner.setBusinessName(profileData.getBusinessName());
        if (profileData.getFullName() != null) planner.setFullName(profileData.getFullName());
        if (profileData.getPhone() != null) planner.setPhone(profileData.getPhone());
        if (profileData.getGstNumber() != null) planner.setGstNumber(profileData.getGstNumber());
        if (profileData.getCoverBannerUrl() != null) planner.setCoverBannerUrl(profileData.getCoverBannerUrl());
        if (profileData.getServiceCities() != null) planner.setServiceCities(profileData.getServiceCities());
        if (profileData.getDescription() != null) planner.setDescription(profileData.getDescription());

        if (profileData.getAvatarUrl() != null && !profileData.getAvatarUrl().equals(planner.getAvatarUrl())) {
            String oldPublicId = planner.getAvatarPublicId();
            planner.setAvatarUrl(profileData.getAvatarUrl());
            planner.setAvatarPublicId(profileData.getAvatarPublicId());
            if (oldPublicId != null && !oldPublicId.equals(profileData.getAvatarPublicId())) {
                cloudinaryService.deleteImage(oldPublicId);
            }
        }

        if (profileData.getBrandLogoUrl() != null && !profileData.getBrandLogoUrl().equals(planner.getBrandLogoUrl())) {
            String oldPublicId = planner.getBrandLogoPublicId();
            planner.setBrandLogoUrl(profileData.getBrandLogoUrl());
            planner.setBrandLogoPublicId(profileData.getBrandLogoPublicId());
            if (oldPublicId != null && !oldPublicId.equals(profileData.getBrandLogoPublicId())) {
                cloudinaryService.deleteImage(oldPublicId);
            }
        }

        if (profileData.getVerificationDocumentUrl() != null && !profileData.getVerificationDocumentUrl().equals(planner.getVerificationDocumentUrl())) {
            String oldPublicId = planner.getVerificationDocumentPublicId();
            planner.setVerificationDocumentUrl(profileData.getVerificationDocumentUrl());
            planner.setVerificationDocumentPublicId(profileData.getVerificationDocumentPublicId());
            if (oldPublicId != null && !oldPublicId.equals(profileData.getVerificationDocumentPublicId())) {
                cloudinaryService.deleteImage(oldPublicId);
            }
        }

        User updated = userRepository.save(planner);

        notificationService.createNotification(
                updated.getId(),
                Role.PLANNER,
                "Profile Updated",
                "Your planner profile was updated successfully.",
                NotificationType.SUCCESS,
                "PROFILE",
                updated.getId()
        );

        return updated;
    }

    @Override
    public List<PlannerPackage> getPackages() {
        User planner = getAuthenticatedPlanner();
        return packageRepository.findByPlannerId(planner.getId());
    }

    @Override
    public PlannerPackage createPackage(PlannerPackage packageData) {
        User planner = getAuthenticatedPlanner();
        packageData.setPlannerId(planner.getId());
        PlannerPackage saved = packageRepository.save(packageData);

        notificationService.createNotification(
                planner.getId(),
                Role.PLANNER,
                "Package Created",
                "Your package \"" + saved.getPackageName() + "\" was created successfully.",
                NotificationType.SUCCESS,
                "PACKAGE",
                saved.getId()
        );

        return saved;
    }

    @Override
    public PlannerPackage updatePackage(Long id, PlannerPackage packageData) {
        User planner = getAuthenticatedPlanner();
        PlannerPackage existing = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found with ID: " + id));
        if (!existing.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        existing.setPackageName(packageData.getPackageName());
        existing.setPrice(packageData.getPrice());
        existing.setCategory(packageData.getCategory());
        existing.setEventType(packageData.getEventType());
        existing.setTheme(packageData.getTheme());
        existing.setCity(packageData.getCity());
        existing.setVenue(packageData.getVenue());
        existing.setGuestCapacity(packageData.getGuestCapacity());
        if (packageData.getImage() != null && !packageData.getImage().equals(existing.getImage())) {
            String oldPublicId = existing.getImagePublicId();
            existing.setImage(packageData.getImage());
            existing.setImagePublicId(packageData.getImagePublicId());
            if (oldPublicId != null && !oldPublicId.equals(packageData.getImagePublicId())) {
                cloudinaryService.deleteImage(oldPublicId);
            }
        }
        existing.setStatus(packageData.getStatus());
        existing.setServicesIncluded(packageData.getServicesIncluded());
        existing.setDescription(packageData.getDescription());

        existing.setAdvancePaymentPercentage(packageData.getAdvancePaymentPercentage());
        existing.setCancellationPolicy(packageData.getCancellationPolicy());
        existing.setFoodPreference(packageData.getFoodPreference());
        existing.setWelcomeDrink(packageData.getWelcomeDrink());
        existing.setPhotography(packageData.getPhotography());
        existing.setCinematicVideo(packageData.getCinematicVideo());
        existing.setPreWeddingShoot(packageData.getPreWeddingShoot());
        existing.setDj(packageData.getDj());
        existing.setLiveBand(packageData.getLiveBand());
        existing.setDanceFloor(packageData.getDanceFloor());
        existing.setFireworks(packageData.getFireworks());
        existing.setMakeup(packageData.getMakeup());
        existing.setMehendiArtist(packageData.getMehendiArtist());
        existing.setInvitationCards(packageData.getInvitationCards());
        existing.setTransportation(packageData.getTransportation());
        existing.setAccommodation(packageData.getAccommodation());

        PlannerPackage updated = packageRepository.save(existing);

        notificationService.createNotification(
                planner.getId(),
                Role.PLANNER,
                "Package Updated",
                "Your package \"" + updated.getPackageName() + "\" details were updated successfully.",
                NotificationType.INFO,
                "PACKAGE",
                updated.getId()
        );

        return updated;
    }

    @Override
    public void deletePackage(Long id) {
        User planner = getAuthenticatedPlanner();
        PlannerPackage existing = packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found with ID: " + id));
        if (!existing.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        cloudinaryService.deleteImage(existing.getImagePublicId());
        packageRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomizationRequestDTO> getCustomizations() {
        User planner = getAuthenticatedPlanner();
        List<CustomizationRequest> requests = customizationRequestRepository.findByPlannerId(planner.getId());

        return requests.stream().map(req -> {
            CustomizationRequestDTO dto = new CustomizationRequestDTO();
            dto.setId(req.getId());
            dto.setBookingId(req.getBooking() != null ? req.getBooking().getId() : null);
            dto.setClientName(req.getClient() != null ? req.getClient().getFullName() : "Client");
            dto.setPlannerId(req.getPlannerId());
            dto.setPackageId(req.getPackageId());
            dto.setFoodPreference(req.getFoodPreference());
            dto.setWelcomeDrink(req.getWelcomeDrink());
            dto.setDrinkName(req.getDrinkName());
            dto.setDrinkQuantity(req.getDrinkQuantity());
            dto.setPreWeddingShoot(req.getPreWeddingShoot());
            dto.setShootLocation(req.getShootLocation());
            dto.setShootDuration(req.getShootDuration());
            dto.setCinematicVideo(req.getCinematicVideo());
            dto.setDjRequired(req.getDjRequired());
            dto.setDjType(req.getDjType());
            dto.setUpdatedPrice(req.getUpdatedPrice());
            dto.setStatus(req.getStatus().name());
            dto.setCreatedAt(req.getCreatedAt());
            return dto;
        }).toList();
    }

    @Override
    @Transactional
    public CustomizationRequestDTO updateCustomizationStatus(Long id, Map<String, String> payload) {
        User planner = getAuthenticatedPlanner();
        CustomizationRequest req = customizationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!req.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        String newStatus = payload.get("status");
        if (newStatus != null) {
            req.setStatus(CustomizationRequest.CustomizationStatus.valueOf(newStatus.toUpperCase()));
            customizationRequestRepository.save(req);

            if (req.getClient() != null) {
                boolean accepted = req.getStatus() == CustomizationRequest.CustomizationStatus.ACCEPTED;
                notificationService.createNotification(
                        req.getClient().getId(),
                        Role.USER,
                        accepted ? "Customization Accepted" : "Customization Update",
                        "Your customization request status was updated to " + req.getStatus().name() + ".",
                        accepted ? NotificationType.SUCCESS : NotificationType.INFO,
                        "CUSTOMIZATION",
                        req.getId()
                );
            }
        }

        CustomizationRequestDTO dto = new CustomizationRequestDTO();
        dto.setId(req.getId());
        dto.setStatus(req.getStatus().name());
        return dto;
    }

    @Override
    @Transactional
    public CustomizationRequestDTO updateCustomizationRequest(Long id, CustomizationRequestDTO payload) {
        User planner = getAuthenticatedPlanner();
        CustomizationRequest req = customizationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!req.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (payload.getUpdatedPrice() != null) req.setUpdatedPrice(payload.getUpdatedPrice());
        if (payload.getPlannerNotes() != null) req.setPlannerNotes(payload.getPlannerNotes());
        if (payload.getFoodPreference() != null) req.setFoodPreference(payload.getFoodPreference());
        if (payload.getWelcomeDrink() != null) req.setWelcomeDrink(payload.getWelcomeDrink());
        if (payload.getDrinkName() != null) req.setDrinkName(payload.getDrinkName());
        if (payload.getDrinkQuantity() != null) req.setDrinkQuantity(payload.getDrinkQuantity());
        if (payload.getPreWeddingShoot() != null) req.setPreWeddingShoot(payload.getPreWeddingShoot());
        if (payload.getShootLocation() != null) req.setShootLocation(payload.getShootLocation());
        if (payload.getShootDuration() != null) req.setShootDuration(payload.getShootDuration());
        if (payload.getCinematicVideo() != null) req.setCinematicVideo(payload.getCinematicVideo());
        if (payload.getDjRequired() != null) req.setDjRequired(payload.getDjRequired());
        if (payload.getDjType() != null) req.setDjType(payload.getDjType());

        customizationRequestRepository.save(req);

        if (req.getClient() != null) {
            notificationService.createNotification(
                    req.getClient().getId(),
                    Role.USER,
                    "Planner Updated Your Customization",
                    "Your planner updated the customized package details for your request.",
                    NotificationType.INFO,
                    "CUSTOMIZATION",
                    req.getId()
            );
        }

        CustomizationRequestDTO dto = new CustomizationRequestDTO();
        dto.setId(req.getId());
        dto.setUpdatedPrice(req.getUpdatedPrice());
        dto.setPlannerNotes(req.getPlannerNotes());
        dto.setFoodPreference(req.getFoodPreference());
        dto.setWelcomeDrink(req.getWelcomeDrink());
        dto.setDrinkName(req.getDrinkName());
        dto.setDrinkQuantity(req.getDrinkQuantity());
        dto.setPreWeddingShoot(req.getPreWeddingShoot());
        dto.setShootLocation(req.getShootLocation());
        dto.setShootDuration(req.getShootDuration());
        dto.setCinematicVideo(req.getCinematicVideo());
        dto.setDjRequired(req.getDjRequired());
        dto.setDjType(req.getDjType());
        return dto;
    }

    @Override
    @Transactional
    public void sendQuotation(Long id) {
        User planner = getAuthenticatedPlanner();
        CustomizationRequest req = customizationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!req.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        if (req.getUpdatedPrice() == null) {
            throw new RuntimeException("Cannot send quotation without an updated price");
        }

        // Update the corresponding booking's total amount. Relies on JPA dirty-checking
        // within this @Transactional method — booking is never explicitly saved.
        Booking booking = req.getBooking();
        if (booking != null) {
            booking.setTotalAmount(req.getUpdatedPrice());
            // Optionally update booking status if needed
        }

        // No separate status for quotation sent in CustomizationStatus,
        // so we just update the booking price.

        if (req.getClient() != null) {
            notificationService.createNotification(
                    req.getClient().getId(),
                    Role.USER,
                    "New Quotation Received",
                    "Your planner sent an updated quotation of ₹" + req.getUpdatedPrice() + " for your customization request.",
                    NotificationType.INFO,
                    "CUSTOMIZATION",
                    req.getId()
            );
        }
    }

    @Override
    public List<PlannerServiceItem> getServices() {
        User planner = getAuthenticatedPlanner();
        return plannerServiceItemRepository.findByPlannerId(planner.getId());
    }

    @Override
    public PlannerServiceItem createService(PlannerServiceItem serviceData) {
        User planner = getAuthenticatedPlanner();
        serviceData.setPlannerId(planner.getId());
        return plannerServiceItemRepository.save(serviceData);
    }

    @Override
    public PlannerServiceItem updateService(Long id, PlannerServiceItem serviceData) {
        User planner = getAuthenticatedPlanner();
        PlannerServiceItem existing = plannerServiceItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with ID: " + id));
        if (!existing.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        existing.setName(serviceData.getName());
        existing.setCategory(serviceData.getCategory());
        existing.setStatus(serviceData.getStatus());
        existing.setDescription(serviceData.getDescription());
        existing.setPrice(serviceData.getPrice());
        existing.setPricingType(serviceData.getPricingType());

        return plannerServiceItemRepository.save(existing);
    }

    @Override
    public void deleteService(Long id) {
        User planner = getAuthenticatedPlanner();
        PlannerServiceItem existing = plannerServiceItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with ID: " + id));
        if (!existing.getPlannerId().equals(planner.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        plannerServiceItemRepository.deleteById(id);
    }

    @Override
    public List<GalleryItem> getPortfolio() {
        User planner = getAuthenticatedPlanner();
        return galleryRepository.findAll().stream()
                .filter(i -> i.getPlannerId() != null && i.getPlannerId().equals(planner.getId()))
                .toList();
    }

    @Override
    public GalleryItem createPortfolioItem(GalleryItem item) {
        User planner = getAuthenticatedPlanner();
        item.setPlannerId(planner.getId());
        return galleryRepository.save(item);
    }

    @Override
    public void deletePortfolioItem(Long id) {
        galleryRepository.findById(id).ifPresent(item -> cloudinaryService.deleteImage(item.getImagePublicId()));
        galleryRepository.deleteById(id);
    }

    @Override
    public List<Booking> getBookings() {
        User planner = getAuthenticatedPlanner();
        return bookingRepository.findAll().stream()
                .filter(b -> b.getPlannerId() != null && b.getPlannerId().equals(planner.getId()))
                .toList();
    }

    @Override
    public Booking acceptBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        Booking updated = bookingRepository.save(booking);
        notifyClientOfBookingStatus(updated);
        return updated;
    }

    @Override
    public Booking rejectBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        booking.setStatus(Booking.BookingStatus.REJECTED);
        Booking updated = bookingRepository.save(booking);
        notifyClientOfBookingStatus(updated);
        return updated;
    }

    @Override
    public Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + bookingId));
        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);
        notifyClientOfBookingStatus(updated);
        return updated;
    }

    private void notifyClientOfBookingStatus(Booking booking) {
        if (booking.getUser() == null) {
            return;
        }
        String title;
        NotificationType type;
        switch (booking.getStatus()) {
            case CONFIRMED -> { title = "Booking Confirmed"; type = NotificationType.SUCCESS; }
            case REJECTED -> { title = "Booking Rejected"; type = NotificationType.ERROR; }
            case CANCELLED -> { title = "Booking Cancelled"; type = NotificationType.WARNING; }
            case COMPLETED -> { title = "Booking Completed"; type = NotificationType.SUCCESS; }
            default -> { title = "Booking Status Updated"; type = NotificationType.INFO; }
        }
        notificationService.createNotification(
                booking.getUser().getId(),
                Role.USER,
                title,
                "Your booking " + booking.getBookingNumber() + " for \"" + booking.getPackageName() + "\" is now " + booking.getStatus().name() + ".",
                type,
                "BOOKING",
                booking.getId()
        );
    }
}
