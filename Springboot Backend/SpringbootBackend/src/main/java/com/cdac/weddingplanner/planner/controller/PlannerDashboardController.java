package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.client.dto.CustomizationRequestDTO;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.*;
import com.cdac.weddingplanner.planner.service.PlannerDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/planner")
@RequiredArgsConstructor
public class PlannerDashboardController {

    private final PlannerDashboardService plannerDashboardService;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPlannerDashboardStats() {
        Map<String, Object> stats = plannerDashboardService.getDashboardStats();
        if (stats == null) return ResponseEntity.badRequest().body(ApiResponse.error("Planner not found"));
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<User>> getPlannerProfile() {
        User planner = plannerDashboardService.getProfile();
        return ResponseEntity.ok(ApiResponse.success(planner));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updatePlannerProfile(@RequestBody User profileData) {
        User updated = plannerDashboardService.updateProfile(profileData);
        return ResponseEntity.ok(ApiResponse.success("Planner profile updated successfully", updated));
    }

    @GetMapping("/packages")
    public ResponseEntity<ApiResponse<List<PlannerPackage>>> getPlannerPackages() {
        List<PlannerPackage> packages = plannerDashboardService.getPackages();
        return ResponseEntity.ok(ApiResponse.success(packages));
    }

    @PostMapping("/packages")
    public ResponseEntity<ApiResponse<PlannerPackage>> createPlannerPackage(@RequestBody PlannerPackage packageData) {
        PlannerPackage saved = plannerDashboardService.createPackage(packageData);
        return ResponseEntity.ok(ApiResponse.success("Package created successfully", saved));
    }

    @PutMapping("/packages/{id}")
    public ResponseEntity<ApiResponse<PlannerPackage>> updatePlannerPackage(
            @PathVariable Long id,
            @RequestBody PlannerPackage packageData
    ) {
        PlannerPackage updated = plannerDashboardService.updatePackage(id, packageData);
        return ResponseEntity.ok(ApiResponse.success("Package updated successfully", updated));
    }

    @DeleteMapping("/packages/{id}")
    public ResponseEntity<ApiResponse<String>> deletePlannerPackage(@PathVariable Long id) {
        plannerDashboardService.deletePackage(id);
        return ResponseEntity.ok(ApiResponse.success("Package deleted successfully"));
    }

    @GetMapping("/customizations")
    public ResponseEntity<ApiResponse<List<CustomizationRequestDTO>>> getPlannerCustomizations() {
        List<CustomizationRequestDTO> dtos = plannerDashboardService.getCustomizations();
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    @PatchMapping("/customizations/{id}/status")
    public ResponseEntity<ApiResponse<CustomizationRequestDTO>> updateCustomizationStatus(
            @PathVariable Long id, @RequestBody Map<String, String> payload) {
        CustomizationRequestDTO dto = plannerDashboardService.updateCustomizationStatus(id, payload);
        return ResponseEntity.ok(ApiResponse.success("Status updated", dto));
    }

    @PutMapping("/customizations/{id}")
    public ResponseEntity<ApiResponse<CustomizationRequestDTO>> updateCustomizationRequest(
            @PathVariable Long id, @RequestBody CustomizationRequestDTO payload) {
        CustomizationRequestDTO dto = plannerDashboardService.updateCustomizationRequest(id, payload);
        return ResponseEntity.ok(ApiResponse.success("Customization updated successfully", dto));
    }

    @PostMapping("/customizations/{id}/quote")
    public ResponseEntity<ApiResponse<String>> sendQuotation(@PathVariable Long id) {
        plannerDashboardService.sendQuotation(id);
        return ResponseEntity.ok(ApiResponse.success("Quotation sent successfully to client"));
    }

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<List<PlannerServiceItem>>> getPlannerServices() {
        List<PlannerServiceItem> services = plannerDashboardService.getServices();
        return ResponseEntity.ok(ApiResponse.success(services));
    }

    @PostMapping("/services")
    public ResponseEntity<ApiResponse<PlannerServiceItem>> createPlannerService(@RequestBody PlannerServiceItem serviceData) {
        PlannerServiceItem saved = plannerDashboardService.createService(serviceData);
        return ResponseEntity.ok(ApiResponse.success("Service created successfully", saved));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ApiResponse<PlannerServiceItem>> updatePlannerService(
            @PathVariable Long id,
            @RequestBody PlannerServiceItem serviceData
    ) {
        PlannerServiceItem updated = plannerDashboardService.updateService(id, serviceData);
        return ResponseEntity.ok(ApiResponse.success("Service updated successfully", updated));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<ApiResponse<String>> deletePlannerService(@PathVariable Long id) {
        plannerDashboardService.deleteService(id);
        return ResponseEntity.ok(ApiResponse.success("Service deleted successfully"));
    }

    @GetMapping("/portfolio")
    public ResponseEntity<ApiResponse<List<GalleryItem>>> getPlannerPortfolio() {
        List<GalleryItem> portfolio = plannerDashboardService.getPortfolio();
        return ResponseEntity.ok(ApiResponse.success(portfolio));
    }

    @PostMapping("/portfolio")
    public ResponseEntity<ApiResponse<GalleryItem>> createPortfolioItem(@RequestBody GalleryItem item) {
        GalleryItem saved = plannerDashboardService.createPortfolioItem(item);
        return ResponseEntity.ok(ApiResponse.success("Portfolio item added successfully", saved));
    }

    @DeleteMapping("/portfolio/{id}")
    public ResponseEntity<ApiResponse<String>> deletePortfolioItem(@PathVariable Long id) {
        plannerDashboardService.deletePortfolioItem(id);
        return ResponseEntity.ok(ApiResponse.success("Portfolio item deleted successfully"));
    }

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> getPlannerBookings() {
        List<Booking> bookings = plannerDashboardService.getBookings();
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @PutMapping("/bookings/{bookingId}/accept")
    public ResponseEntity<ApiResponse<Booking>> acceptBooking(@PathVariable Long bookingId) {
        Booking updated = plannerDashboardService.acceptBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success("Booking accepted successfully", updated));
    }

    @PutMapping("/bookings/{bookingId}/reject")
    public ResponseEntity<ApiResponse<Booking>> rejectBooking(@PathVariable Long bookingId) {
        Booking updated = plannerDashboardService.rejectBooking(bookingId);
        return ResponseEntity.ok(ApiResponse.success("Booking rejected successfully", updated));
    }

    @PutMapping("/bookings/{bookingId}/status")
    public ResponseEntity<ApiResponse<Booking>> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam Booking.BookingStatus status
    ) {
        Booking updated = plannerDashboardService.updateBookingStatus(bookingId, status);
        return ResponseEntity.ok(ApiResponse.success("Booking status updated to " + status, updated));
    }
}
