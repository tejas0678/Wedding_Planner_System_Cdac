package com.cdac.weddingplanner.planner.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gallery_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long plannerId;

    private String imageUrl;

    private String imagePublicId;

    private String title;
    
    private String category;
    
    @Column(length = 2000)
    private String description;
    
    private String location;
}
