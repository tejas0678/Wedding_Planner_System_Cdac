package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminReportService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class AdminReportController {

    private final AdminReportService adminReportService;

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getReports() {
        Map<String, Object> reports = adminReportService.getReportsSummary();
        return ResponseEntity.ok(ApiResponse.success(reports));
    }
}
