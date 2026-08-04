package com.cdac.weddingplanner.common.service.impl;

import com.cdac.weddingplanner.common.dto.ImageUploadResponseDTO;
import com.cdac.weddingplanner.common.service.CloudinaryService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "image/jpeg", "image/jpg", "image/png", "image/webp"
    );
    private static final List<String> ALLOWED_EXTENSIONS = List.of(".jpg", ".jpeg", ".png", ".webp");
    private static final long MAX_FILE_SIZE_BYTES = 5L * 1024 * 1024; // 5 MB

    private final Cloudinary cloudinary;

    @Override
    public ImageUploadResponseDTO uploadImage(MultipartFile file, String folder) {
        validateFile(file);

        try {
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", folder != null && !folder.isBlank() ? folder : "wedding-planner",
                    "resource_type", "image"
            ));

            return ImageUploadResponseDTO.builder()
                    .imageUrl((String) result.get("secure_url"))
                    .publicId((String) result.get("public_id"))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to Cloudinary: " + e.getMessage());
        }
    }

    @Override
    public void deleteImage(String publicId) {
        if (publicId == null || publicId.isBlank()) {
            return;
        }
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image from Cloudinary: " + e.getMessage());
        }
    }

    private void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("No file was provided for upload");
        }

        if (file.getSize() > MAX_FILE_SIZE_BYTES) {
            throw new RuntimeException("File size exceeds the maximum allowed size of 5 MB");
        }

        String contentType = file.getContentType() != null ? file.getContentType().toLowerCase(Locale.ROOT) : "";
        String filename = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase(Locale.ROOT) : "";
        boolean hasAllowedExtension = ALLOWED_EXTENSIONS.stream().anyMatch(filename::endsWith);

        if (!ALLOWED_CONTENT_TYPES.contains(contentType) || !hasAllowedExtension) {
            throw new RuntimeException("Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed");
        }
    }
}
