package com.cdac.weddingplanner.planner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "planner_packages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlannerPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long plannerId;

    private String packageName;

    private BigDecimal price;

    private String category;

    private String eventType;

    private String theme;

    private String city;

    private String venue;

    private Integer guestCapacity;

    @Column(length = 2000)
    private String image;

    private String imagePublicId;

    @Builder.Default
    private String status = "Active";

    @Column(length = 1000)
    private String servicesIncluded;

    @Column(length = 2000)
    private String description;

    private Integer advancePaymentPercentage;
    
    @Column(length = 2000)
    private String cancellationPolicy;
    
    private String foodPreference;
    
    private Boolean welcomeDrink;
    
    private Boolean photography;
    
    private Boolean cinematicVideo;
    
    private Boolean preWeddingShoot;
    
    private Boolean dj;
    
    private Boolean liveBand;
    
    private Boolean danceFloor;
    
    private Boolean fireworks;
    
    private Boolean makeup;
    
    private Boolean mehendiArtist;
    
    private Boolean invitationCards;
    
    private Boolean transportation;
    
    private Boolean accommodation;
}
