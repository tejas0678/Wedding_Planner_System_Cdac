package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.response.DashboardStatsResponse;

public interface DashboardService {
    DashboardStatsResponse getStats(Long plannerId);
}
