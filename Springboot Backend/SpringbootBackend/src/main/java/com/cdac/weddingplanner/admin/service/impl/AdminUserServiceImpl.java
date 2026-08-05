package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminUserService;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import com.cdac.weddingplanner.common.service.NotificationService;
import com.cdac.weddingplanner.planner.entity.GalleryItem;
import com.cdac.weddingplanner.planner.repository.GalleryRepository;
import com.cdac.weddingplanner.planner.repository.PlannerPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final PlannerPackageRepository plannerPackageRepository;
    private final GalleryRepository galleryRepository;
    private final NotificationService notificationService;
    private final CloudinaryService cloudinaryService;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User toggleUserStatus(Long userId, boolean enabled) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        user.setEnabled(enabled);
        User updated = userRepository.save(user);

        notificationService.createNotification(
                updated.getId(),
                updated.getRole(),
                enabled ? "Account Activated" : "Account Deactivated",
                enabled
                        ? "Your account has been activated by the administrator."
                        : "Your account has been deactivated by the administrator.",
                enabled ? NotificationType.SUCCESS : NotificationType.WARNING,
                "ACCOUNT",
                updated.getId()
        );

        return updated;
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        int bookingCount = bookingRepository.findByPlannerId(userId).size()
                + bookingRepository.findByUserId(userId).size();
        int packageCount = plannerPackageRepository.findByPlannerId(userId).size();

        if (bookingCount > 0 || packageCount > 0) {
            throw new RuntimeException(
                    "Cannot delete: this account has " + bookingCount + " booking(s) and "
                            + packageCount + " package(s) linked to it. Deactivate the account instead.");
        }

        List<GalleryItem> portfolioItems = galleryRepository.findByPlannerId(userId);
        for (GalleryItem item : portfolioItems) {
            cloudinaryService.deleteImage(item.getImagePublicId());
        }
        galleryRepository.deleteAll(portfolioItems);

        cloudinaryService.deleteImage(user.getAvatarPublicId());
        cloudinaryService.deleteImage(user.getBrandLogoPublicId());
        cloudinaryService.deleteImage(user.getVerificationDocumentPublicId());

        userRepository.delete(user);
    }
}
