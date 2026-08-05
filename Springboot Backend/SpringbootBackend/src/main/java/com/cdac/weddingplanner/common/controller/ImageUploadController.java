package com.cdac.weddingplanner.common.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.common.dto.ImageUploadResponseDTO;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageUploadController {

    private final CloudinaryService cloudinaryService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ImageUploadResponseDTO>> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", required = false) String folder
    ) {
        ImageUploadResponseDTO response = cloudinaryService.uploadImage(file, folder);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Image uploaded successfully", response));
    }

    // Cloudinary public IDs are folder-namespaced (e.g. "wedding-planner/planner/logo_123") and
    // therefore contain slashes; {*publicId} captures the full remaining path, not just one segment.
    @DeleteMapping("/{*publicId}")
    public ResponseEntity<ApiResponse<String>> deleteImage(@PathVariable("publicId") String publicId) {
        String cleanedPublicId = publicId.startsWith("/") ? publicId.substring(1) : publicId;
        cloudinaryService.deleteImage(cleanedPublicId);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully"));
    }
}
