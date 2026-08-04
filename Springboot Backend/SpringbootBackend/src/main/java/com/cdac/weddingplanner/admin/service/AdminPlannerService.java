package com.cdac.weddingplanner.admin.service;

import com.cdac.weddingplanner.auth.entity.User;

import java.util.List;
import java.util.Map;

public interface AdminPlannerService {

    List<User> getPlanners();

    Map<String, Object> getPlannerDetails(Long id);
}
