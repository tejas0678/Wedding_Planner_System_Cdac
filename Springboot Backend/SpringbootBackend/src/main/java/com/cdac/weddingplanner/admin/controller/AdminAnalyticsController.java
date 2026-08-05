package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminAnalyticsService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AdminAnalyticsService adminAnalyticsService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAnalytics() {
        Map<String, Object> analytics = adminAnalyticsService.getAnalyticsSummary();
        return ResponseEntity.ok(ApiResponse.success(analytics));
    }
}
