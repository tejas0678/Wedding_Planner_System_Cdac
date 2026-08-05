package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.GalleryItem;
import com.cdac.weddingplanner.planner.service.GalleryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    @PostMapping
    public ResponseEntity<ApiResponse<GalleryItem>> addGalleryItem(@RequestBody GalleryItem galleryItem) {
        GalleryItem saved = galleryService.addGalleryItem(galleryItem);
        return ResponseEntity.ok(ApiResponse.success("Gallery item added successfully", saved));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<GalleryItem>>> getGallery(@PathVariable Long plannerId) {
        List<GalleryItem> list = galleryService.getGalleryByPlanner(plannerId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
