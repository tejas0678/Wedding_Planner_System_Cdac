package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminReportService;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminReportServiceImpl implements AdminReportService {

    private final BookingRepository bookingRepository;

    @Override
    public Map<String, Object> getReportsSummary() {
        Map<String, Object> reports = new HashMap<>();
        reports.put("generatedAt", java.time.LocalDateTime.now());
        reports.put("totalBookingsCount", bookingRepository.count());
        return reports;
    }
}
