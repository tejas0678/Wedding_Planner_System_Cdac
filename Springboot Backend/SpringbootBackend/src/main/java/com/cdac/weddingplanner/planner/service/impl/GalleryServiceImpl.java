package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.planner.entity.GalleryItem;
import com.cdac.weddingplanner.planner.repository.GalleryRepository;
import com.cdac.weddingplanner.planner.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

    private final GalleryRepository galleryRepository;

    @Override
    public GalleryItem addGalleryItem(GalleryItem galleryItem) {
        return galleryRepository.save(galleryItem);
    }

    @Override
    public List<GalleryItem> getGalleryByPlanner(Long plannerId) {
        return galleryRepository.findByPlannerId(plannerId);
    }
}
