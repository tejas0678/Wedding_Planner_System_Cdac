package com.cdac.weddingplanner.planner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "catering_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CateringService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long plannerId;

    private String menuName;

    private String cuisineType;

    private BigDecimal pricePerPlate;

    @Column(length = 2000)
    private String description;
}
