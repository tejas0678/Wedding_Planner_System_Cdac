package com.cdac.weddingplanner.planner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "venues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long plannerId;

    private String name;

    private String location;

    private Integer capacity;

    private BigDecimal price;

    @Column(length = 2000)
    private String description;
}
