package com.weddingplanner.plannerservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "package_offerings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PackageOffering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long plannerId;

    @Column(nullable = false, length = 150)
    private String title;

    /** Stored exactly as entered/displayed, e.g. "₹7,65,600". */
    @Column(nullable = false, length = 50)
    private String price;

    @Column(length = 100)
    private String category;

    @Column(length = 50)
    private String capacity;

    @ElementCollection
    @CollectionTable(name = "package_offering_features", joinColumns = @JoinColumn(name = "package_offering_id"))
    @Column(name = "feature", length = 255)
    @Builder.Default
    private List<String> features = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
