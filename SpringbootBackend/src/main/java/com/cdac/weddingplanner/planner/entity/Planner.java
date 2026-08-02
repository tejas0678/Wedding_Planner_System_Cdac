package com.weddingplanner.plannerservice.entity;

import com.weddingplanner.plannerservice.enums.PlannerStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "planners", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Planner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Owner / contact person name. */
    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 20)
    private String phone;

    @Column(length = 150)
    private String businessName;

    @Column(length = 50)
    private String gstNumber;

    @Column(length = 50)
    private String experience;

    @Column(length = 150)
    private String specialization;

    @Column(length = 100)
    private String city;

    /** Bio / studio description. */
    @Column(columnDefinition = "TEXT")
    private String bio;

    /** Profile / avatar image URL. */
    @Column(length = 500)
    private String image;

    @Builder.Default
    @Column(nullable = false)
    private Double rating = 0.0;

    @Builder.Default
    @Column(nullable = false)
    private Integer reviewsCount = 0;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private PlannerStatus status = PlannerStatus.APPROVED;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
