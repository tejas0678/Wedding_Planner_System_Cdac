package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminPlannerService;
import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.planner.entity.GalleryItem;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.repository.GalleryRepository;
import com.cdac.weddingplanner.planner.repository.PlannerPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminPlannerServiceImpl implements AdminPlannerService {

    private final UserRepository userRepository;
    private final PlannerPackageRepository packageRepository;
    private final BookingRepository bookingRepository;
    private final GalleryRepository galleryRepository;

    @Override
    public List<User> getPlanners() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.PLANNER)
                .toList();
    }

    @Override
    public Map<String, Object> getPlannerDetails(Long id) {
        User planner = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Planner not found"));

        if (planner.getRole() != Role.PLANNER) {
            throw new RuntimeException("User is not a planner");
        }

        List<PlannerPackage> packages = packageRepository.findByPlannerId(id);
        List<Booking> bookings = bookingRepository.findByPlannerId(id);
        List<GalleryItem> portfolio = galleryRepository.findByPlannerId(id);

        Map<String, Object> details = new HashMap<>();
        details.put("profile", planner);
        details.put("packages", packages);
        details.put("bookings", bookings);
        details.put("portfolio", portfolio);
        details.put("totalBookings", bookings.size());

        return details;
    }
}
