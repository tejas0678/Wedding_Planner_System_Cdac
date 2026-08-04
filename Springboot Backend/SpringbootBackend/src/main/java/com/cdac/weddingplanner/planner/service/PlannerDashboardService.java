package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.client.dto.CustomizationRequestDTO;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.planner.entity.GalleryItem;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.entity.PlannerServiceItem;

import java.util.List;
import java.util.Map;

public interface PlannerDashboardService {

    /** Returns null when there is no authenticated/available planner, mirroring the pre-refactor 400 response. */
    Map<String, Object> getDashboardStats();

    User getProfile();

    User updateProfile(User profileData);

    List<PlannerPackage> getPackages();

    PlannerPackage createPackage(PlannerPackage packageData);

    PlannerPackage updatePackage(Long id, PlannerPackage packageData);

    void deletePackage(Long id);

    List<CustomizationRequestDTO> getCustomizations();

    CustomizationRequestDTO updateCustomizationStatus(Long id, Map<String, String> payload);

    CustomizationRequestDTO updateCustomizationRequest(Long id, CustomizationRequestDTO payload);

    void sendQuotation(Long id);

    List<PlannerServiceItem> getServices();

    PlannerServiceItem createService(PlannerServiceItem serviceData);

    PlannerServiceItem updateService(Long id, PlannerServiceItem serviceData);

    void deleteService(Long id);

    List<GalleryItem> getPortfolio();

    GalleryItem createPortfolioItem(GalleryItem item);

    void deletePortfolioItem(Long id);

    List<Booking> getBookings();

    Booking acceptBooking(Long bookingId);

    Booking rejectBooking(Long bookingId);

    Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status);
}
