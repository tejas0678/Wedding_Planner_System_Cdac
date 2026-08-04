package com.cdac.weddingplanner.admin.service;

import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.client.entity.Booking;

import java.util.List;
import java.util.Map;

public interface AdminDashboardService {

    Map<String, Object> getAdminDashboardSummary();

    List<User> getClients();

    List<User> getPlanners();

    User approvePlanner(Long id);

    User rejectPlanner(Long id);

    List<Booking> getBookings();
}
