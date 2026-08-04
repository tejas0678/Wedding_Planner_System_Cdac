package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.auth.entity.User;

public interface ClientProfileService {

    User getProfile(Long userId);

    User updateProfile(Long userId, User profileData);
}
