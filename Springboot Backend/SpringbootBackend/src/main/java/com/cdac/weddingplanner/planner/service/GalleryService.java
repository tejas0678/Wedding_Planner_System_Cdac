package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.GalleryItem;

import java.util.List;

public interface GalleryService {

    GalleryItem addGalleryItem(GalleryItem galleryItem);

    List<GalleryItem> getGalleryByPlanner(Long plannerId);
}
