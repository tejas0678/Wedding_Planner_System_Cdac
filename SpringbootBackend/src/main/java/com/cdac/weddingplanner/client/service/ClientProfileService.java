package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.client.dto.ClientProfileResponse;
import com.cdac.weddingplanner.client.dto.ClientProfileUpdateRequest;

public interface ClientProfileService {

    ClientProfileResponse getProfile(Long userId);

    ClientProfileResponse updateProfile(Long userId, ClientProfileUpdateRequest request);
}
