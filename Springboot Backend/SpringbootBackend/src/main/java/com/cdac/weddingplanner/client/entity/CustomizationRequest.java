package com.cdac.weddingplanner.client.entity;

import com.cdac.weddingplanner.auth.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "customization_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomizationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private User client;

    private Long plannerId;
    private Long packageId;

    private String foodPreference;

    private Boolean welcomeDrink;
    private String drinkName;
    private Integer drinkQuantity;

    private Boolean preWeddingShoot;
    private String shootLocation;
    private String shootDuration;
    private Boolean cinematicVideo;

    private Boolean djRequired;
    private String djType;

    private BigDecimal updatedPrice;
    
    @Column(length = 2000)
    private String plannerNotes;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private CustomizationStatus status = CustomizationStatus.PENDING;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = CustomizationStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum CustomizationStatus {
        PENDING,
        ACCEPTED,
        REJECTED,
        APPROVED_BY_CLIENT,
        REJECTED_BY_CLIENT
    }
}
