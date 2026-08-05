package com.cdac.weddingplanner.common.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.common.dto.NotificationDTO;
import com.cdac.weddingplanner.common.entity.Notification;
import com.cdac.weddingplanner.common.entity.NotificationType;
import com.cdac.weddingplanner.common.repository.NotificationRepository;
import com.cdac.weddingplanner.common.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void createNotification(
            Long recipientId,
            Role recipientRole,
            String title,
            String message,
            NotificationType type,
            String relatedEntityType,
            Long relatedEntityId
    ) {
        if (recipientId == null) {
            return;
        }
        Notification notification = Notification.builder()
                .recipientId(recipientId)
                .recipientRole(recipientRole)
                .title(title)
                .message(message)
                .type(type)
                .relatedEntityType(relatedEntityType)
                .relatedEntityId(relatedEntityId)
                .isRead(false)
                .build();
        notificationRepository.save(notification);
    }

    @Override
    public Page<NotificationDTO> getMyNotifications(Pageable pageable) {
        Long userId = getCurrentUser().getId();
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::toDto);
    }

    @Override
    public List<NotificationDTO> getMyUnreadNotifications() {
        Long userId = getCurrentUser().getId();
        return notificationRepository.findByRecipientIdAndIsReadFalseOrderByCreatedAtDesc(userId).stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public long getUnreadCount() {
        Long userId = getCurrentUser().getId();
        return notificationRepository.countByRecipientIdAndIsReadFalse(userId);
    }

    @Override
    @Transactional
    public NotificationDTO markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        assertOwnership(notification);
        notification.setIsRead(true);
        return toDto(notificationRepository.save(notification));
    }

    @Override
    @Transactional
    public void markAllAsRead() {
        Long userId = getCurrentUser().getId();
        List<Notification> unread = notificationRepository.findByRecipientIdAndIsReadFalseOrderByCreatedAtDesc(userId);
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
    }

    @Override
    @Transactional
    public void deleteNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        assertOwnership(notification);
        notificationRepository.delete(notification);
    }

    @Override
    @Transactional
    public void deleteAllNotifications() {
        Long userId = getCurrentUser().getId();
        notificationRepository.deleteByRecipientId(userId);
    }

    private void assertOwnership(Notification notification) {
        Long userId = getCurrentUser().getId();
        if (!notification.getRecipientId().equals(userId)) {
            throw new RuntimeException("You do not have access to this notification");
        }
    }

    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            throw new RuntimeException("Not authenticated");
        }
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private NotificationDTO toDto(Notification n) {
        return NotificationDTO.builder()
                .id(n.getId())
                .title(n.getTitle())
                .message(n.getMessage())
                .type(n.getType() != null ? n.getType().name() : NotificationType.INFO.name())
                .relatedEntityType(n.getRelatedEntityType())
                .relatedEntityId(n.getRelatedEntityId())
                .isRead(n.getIsRead())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
