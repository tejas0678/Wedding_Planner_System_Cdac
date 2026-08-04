package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.service.ClientProfileService;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import com.cdac.weddingplanner.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientProfileServiceImpl implements ClientProfileService {

    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final CloudinaryService cloudinaryService;

    @Override
    public User getProfile(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found with ID: " + userId));
    }

    @Override
    public User updateProfile(Long userId, User profileData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User profile not found with ID: " + userId));

        if (profileData.getFullName() != null) user.setFullName(profileData.getFullName());
        if (profileData.getPhone() != null) user.setPhone(profileData.getPhone());
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
