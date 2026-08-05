package com.cdac.weddingplanner.planner.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "decoration_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DecorationOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long plannerId;

    private String themeName;

    private BigDecimal price;

    @Column(length = 2000)
    private String description;
}
