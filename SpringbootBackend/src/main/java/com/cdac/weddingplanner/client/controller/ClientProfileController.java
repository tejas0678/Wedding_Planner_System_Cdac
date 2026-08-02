package com.cdac.weddingplanner.client.controller;

import com.cdac.weddingplanner.client.dto.ApiResponse;
import com.cdac.weddingplanner.client.dto.ClientProfileResponse;
import com.cdac.weddingplanner.client.dto.ClientProfileUpdateRequest;
import com.cdac.weddingplanner.client.service.ClientProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/client/profile")
public class ClientProfileController {

    private final ClientProfileService clientProfileService;

    public ClientProfileController(ClientProfileService clientProfileService) {
        this.clientProfileService = clientProfileService;
    }

    @GetMapping
    public ApiResponse<ClientProfileResponse> getProfile(@RequestParam(defaultValue = "1") Long userId) {
        return ApiResponse.success(clientProfileService.getProfile(userId));
    }

    @PutMapping
    public ApiResponse<ClientProfileResponse> updateProfile(@RequestParam(defaultValue = "1") Long userId,
                                                              @RequestBody ClientProfileUpdateRequest request) {
        return ApiResponse.success("Profile updated successfully", clientProfileService.updateProfile(userId, request));
    }
}
