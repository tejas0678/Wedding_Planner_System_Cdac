package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.auth.entity.User;

import java.util.List;

public interface PublicPlannerService {

    List<User> getPublicPlanners(String city, String keyword);

    List<User> searchPlanners(String keyword);

    List<User> getPlannersByCity(String city);

    User getPlannerDetails(Long id);
}
