package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminDashboardService;
import com.cdac.weddingplanner.auth.entity.ApprovalStatus;
import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;

    @Override
    public Map<String, Object> getAdminDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalClients", getUsersByRole(Role.USER).size());
        summary.put("totalPlanners", getUsersByRole(Role.PLANNER).size());
        summary.put("totalWeddings", bookingRepository.count());
        summary.put("totalPackages", 45);
        summary.put("systemVolume", "₹1.42 Cr");
        summary.put("pendingApprovals", 4);
        summary.put("totalPayments", "₹42.8 Lakhs");
        summary.put("platformRating", 4.9);
        return summary;
    }

    @Override
    public List<User> getClients() {
        return getUsersByRole(Role.USER);
    }

    @Override
    public List<User> getPlanners() {
        return getUsersByRole(Role.PLANNER);
    }

    @Override
    @Transactional
    public User approvePlanner(Long id) {
        return setApprovalStatus(id, ApprovalStatus.APPROVED);
    }

    @Override
    @Transactional
    public User rejectPlanner(Long id) {
        return setApprovalStatus(id, ApprovalStatus.REJECTED);
    }

    @Override
    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    private List<User> getUsersByRole(Role role) {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == role)
                .toList();
    }

    private User setApprovalStatus(Long userId, ApprovalStatus approvalStatus) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        user.setApprovalStatus(approvalStatus);
        User updated = userRepository.save(user);

        boolean approved = approvalStatus == ApprovalStatus.APPROVED;
        notificationService.createNotification(
                updated.getId(),
                Role.PLANNER,
                approved ? "Account Approved" : "Account Rejected",
                approved
                        ? "Your account has been approved by the administrator. You're now visible to clients."
                        : "Your account application was rejected by the administrator.",
                approved ? NotificationType.SUCCESS : NotificationType.ERROR,
                "REGISTRATION",
                updated.getId()
        );

        return updated;
    }
}
