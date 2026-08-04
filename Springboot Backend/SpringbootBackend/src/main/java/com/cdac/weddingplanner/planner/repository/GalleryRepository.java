package com.cdac.weddingplanner.planner.repository;

import com.cdac.weddingplanner.planner.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepository extends JpaRepository<GalleryItem, Long> {
    List<GalleryItem> findByPlannerId(Long plannerId);
}
