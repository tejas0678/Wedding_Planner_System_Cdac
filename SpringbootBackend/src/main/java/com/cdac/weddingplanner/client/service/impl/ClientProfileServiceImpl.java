package com.cdac.weddingplanner.client.service.impl;

import com.cdac.weddingplanner.client.dto.ClientProfileResponse;
import com.cdac.weddingplanner.client.dto.ClientProfileUpdateRequest;
import com.cdac.weddingplanner.client.entity.ClientProfile;
import com.cdac.weddingplanner.client.repository.ClientProfileRepository;
import com.cdac.weddingplanner.client.service.ClientProfileService;
import org.springframework.stereotype.Service;

@Service
public class ClientProfileServiceImpl implements ClientProfileService {

    private final ClientProfileRepository clientProfileRepository;

    public ClientProfileServiceImpl(ClientProfileRepository clientProfileRepository) {
        this.clientProfileRepository = clientProfileRepository;
    }

    @Override
    public ClientProfileResponse getProfile(Long userId) {
        ClientProfile profile = clientProfileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));
        return toResponse(profile);
    }

    @Override
    public ClientProfileResponse updateProfile(Long userId, ClientProfileUpdateRequest request) {
        ClientProfile profile = clientProfileRepository.findByUserId(userId)
                .orElseGet(() -> createDefaultProfile(userId));

        if (request.getFullName() != null) profile.setFullName(request.getFullName());
        if (request.getEmail() != null) profile.setEmail(request.getEmail());
        if (request.getPhone() != null) profile.setPhone(request.getPhone());
        if (request.getCity() != null) profile.setCity(request.getCity());
        if (request.getPartnerName() != null) profile.setPartnerName(request.getPartnerName());
        if (request.getEmergencyPhone() != null) profile.setEmergencyPhone(request.getEmergencyPhone());
        if (request.getAvatarUrl() != null) profile.setAvatarUrl(request.getAvatarUrl());

        ClientProfile saved = clientProfileRepository.save(profile);
        return toResponse(saved);
    }

    private ClientProfile createDefaultProfile(Long userId) {
        ClientProfile profile = new ClientProfile();
        profile.setUserId(userId);
        profile.setFullName("Guest User");
        profile.setEmail("client" + userId + "@gmail.com");
        return clientProfileRepository.save(profile);
    }

    private ClientProfileResponse toResponse(ClientProfile profile) {
        ClientProfileResponse response = new ClientProfileResponse();
        response.setUserId(profile.getUserId());
        response.setFullName(profile.getFullName());
        response.setEmail(profile.getEmail());
        response.setPhone(profile.getPhone());
        response.setCity(profile.getCity());
        response.setPartnerName(profile.getPartnerName());
        response.setEmergencyPhone(profile.getEmergencyPhone());
        response.setAvatarUrl(profile.getAvatarUrl());
        return response;
    }
}
