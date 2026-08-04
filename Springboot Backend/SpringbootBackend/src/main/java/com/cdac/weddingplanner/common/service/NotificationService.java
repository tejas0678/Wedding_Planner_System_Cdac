package com.cdac.weddingplanner.common.service;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.common.dto.NotificationDTO;
import com.cdac.weddingplanner.common.entity.NotificationType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {

    /** Reusable trigger point called by other services when a notify-worthy business event occurs. */
    void createNotification(
            Long recipientId,
            Role recipientRole,
            String title,
            String message,
            NotificationType type,
            String relatedEntityType,
            Long relatedEntityId
    );

    Page<NotificationDTO> getMyNotifications(Pageable pageable);

    List<NotificationDTO> getMyUnreadNotifications();

    long getUnreadCount();

    NotificationDTO markAsRead(Long id);

    void markAllAsRead();

    void deleteNotification(Long id);

    void deleteAllNotifications();
}
