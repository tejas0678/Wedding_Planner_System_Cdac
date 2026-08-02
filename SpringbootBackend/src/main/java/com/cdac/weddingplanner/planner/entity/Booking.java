package com.weddingplanner.plannerservice.entity;

import com.weddingplanner.plannerservice.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String bookingNumber;

    @Column(nullable = false)
    private Long plannerId;

    /** Denormalized - no client-service exists yet to join against. */
    @Column(nullable = false, length = 150)
    private String clientName;

    @Column(length = 150)
    private String packageName;

    private LocalDate weddingDate;

    @Column(length = 255)
    private String venue;

    @Column(precision = 12, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    @Column(length = 30)
    @Builder.Default
    private String paymentStatus = "PENDING";

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
