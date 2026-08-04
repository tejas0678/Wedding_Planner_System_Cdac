package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminAnalyticsService;
import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsServiceImpl implements AdminAnalyticsService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    @Override
    public Map<String, Object> getAnalyticsSummary() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalClients", userRepository.findAll().stream().filter(u -> u.getRole() == Role.USER).toList().size());
        analytics.put("totalPlanners", userRepository.findAll().stream().filter(u -> u.getRole() == Role.PLANNER).toList().size());
        analytics.put("totalBookings", bookingRepository.count());
        return analytics;
    }
}
