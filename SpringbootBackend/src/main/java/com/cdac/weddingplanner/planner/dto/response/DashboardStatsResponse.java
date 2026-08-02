package com.weddingplanner.plannerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalBookings;
    private long pendingBookings;
    private long acceptedBookings;
    private long confirmedBookings;
    private long completedBookings;
    private long rejectedBookings;
    private String totalRevenue;
    private double averageRating;
    private long totalReviews;
    private long totalServices;
    private long totalPortfolioItems;
    private long totalPackages;
}
