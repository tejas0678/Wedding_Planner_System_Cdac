package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.service.ClientDashboardService;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import com.cdac.weddingplanner.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientDashboardServiceImpl implements ClientDashboardService {

    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final CloudinaryService cloudinaryService;

    @Override
    public User getClientProfile(String requestedEmail) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal()))
                ? auth.getName()
                : null;

        String targetEmail = (requestedEmail != null && !requestedEmail.trim().isEmpty()) ? requestedEmail : authEmail;

        User user = null;
        if (targetEmail != null) {
            user = userRepository.findByEmail(targetEmail).orElse(null);
        }

        if (user == null) {
            user = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == Role.USER)
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Client profile not found"));
        }

        return user;
    }

    @Override
    public User updateClientProfile(User profileData) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal()))
                ? auth.getName()
                : null;

        String targetEmail = (profileData.getEmail() != null && !profileData.getEmail().trim().isEmpty())
                ? profileData.getEmail()
                : authEmail;

        User user = userRepository.findByEmail(targetEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + targetEmail));

        if (profileData.getFullName() != null) user.setFullName(profileData.getFullName());
        if (profileData.getPhone() != null) user.setPhone(profileData.getPhone());
        if (profileData.getPartnerName() != null) user.setPartnerName(profileData.getPartnerName());
        if (profileData.getEmergencyPhone() != null) user.setEmergencyPhone(profileData.getEmergencyPhone());
        if (profileData.getAvatarUrl() != null && !profileData.getAvatarUrl().equals(user.getAvatarUrl())) {
            String oldAvatarPublicId = user.getAvatarPublicId();
            user.setAvatarUrl(profileData.getAvatarUrl());
            user.setAvatarPublicId(profileData.getAvatarPublicId());
            if (oldAvatarPublicId != null && !oldAvatarPublicId.equals(profileData.getAvatarPublicId())) {
                cloudinaryService.deleteImage(oldAvatarPublicId);
            }
        }

        User updated = userRepository.save(user);

        notificationService.createNotification(
                updated.getId(),
                Role.USER,
                "Profile Updated",
                "Your profile was updated successfully.",
                NotificationType.SUCCESS,
                "PROFILE",
                updated.getId()
        );

        return updated;
    }
}
