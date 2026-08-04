package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.planner.service.PublicPlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicPlannerServiceImpl implements PublicPlannerService {

    private final UserRepository userRepository;

    @Override
    public List<User> getPublicPlanners(String city, String keyword) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            return userRepository.searchPlanners(Role.PLANNER, keyword.trim());
        } else if (city != null && !city.trim().isEmpty() && !"all".equalsIgnoreCase(city.trim())) {
            return userRepository.findByRoleAndCityIgnoreCaseAndEnabledTrue(Role.PLANNER, city.trim());
        }
        return userRepository.findByRoleAndEnabledTrue(Role.PLANNER);
    }

    @Override
    public List<User> searchPlanners(String keyword) {
        return userRepository.searchPlanners(Role.PLANNER, keyword != null ? keyword.trim() : "");
    }

    @Override
    public List<User> getPlannersByCity(String city) {
        if ("all".equalsIgnoreCase(city)) {
            return userRepository.findByRoleAndEnabledTrue(Role.PLANNER);
        }
        return userRepository.findByRoleAndCityIgnoreCaseAndEnabledTrue(Role.PLANNER, city);
    }

    @Override
    public User getPlannerDetails(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Planner not found with ID: " + id));
    }
}
