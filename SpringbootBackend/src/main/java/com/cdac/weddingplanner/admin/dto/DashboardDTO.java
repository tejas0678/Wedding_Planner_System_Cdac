package com.cdac.weddingplanner.admin.dto;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardDTO {
	    private long totalClients;
		private long totalPlanners;
		private long totalWeddings;
		private long pendingBookings;
		private long pendingApprovals;
		private List<RecentActivityDTO> recentActivities;
		private List<TopPlannerDTO> topPlanners;
}
