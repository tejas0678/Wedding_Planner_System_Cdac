package com.cdac.weddingplanner.common.service;

import com.cdac.weddingplanner.common.dto.ImageUploadResponseDTO;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

    /**
     * Validates, uploads the file to Cloudinary under the given folder, and returns its
     * secure URL and public ID. Reused by every module that needs image upload.
     */
    ImageUploadResponseDTO uploadImage(MultipartFile file, String folder);

    /**
     * Deletes an image from Cloudinary by public ID. Safe to call with a null/blank
     * public ID (no-op) so delete-cascade call sites don't need to null-check first.
     */
    void deleteImage(String publicId);
}
