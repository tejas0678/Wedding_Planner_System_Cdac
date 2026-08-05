package com.cdac.weddingplanner.client.service;

import com.cdac.weddingplanner.auth.entity.User;

public interface ClientDashboardService {

    User getClientProfile(String requestedEmail);

    User updateClientProfile(User profileData);
}
