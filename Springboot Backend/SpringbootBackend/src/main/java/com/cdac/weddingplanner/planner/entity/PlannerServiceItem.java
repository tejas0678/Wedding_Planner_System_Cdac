package com.cdac.weddingplanner.planner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "planner_service_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlannerServiceItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long plannerId;

    private String category; // e.g., DECORATION, CATERING, PHOTOGRAPHY
    
    private String status; // e.g., Enabled, Disabled
    
    private String name; // e.g., Royal Mandap & Floral Decor
    
    @Column(length = 2000)
    private String description;
    
    private BigDecimal price; // e.g., 150000.00
    
    private String pricingType; // e.g., (Fixed), (Per Guest), (Per Day)
}
