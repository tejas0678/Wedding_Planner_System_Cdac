package com.cdac.weddingplanner.common.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.common.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final UserRepository userRepository;

    @Override
    public List<Map<String, Object>> getCities() {
        List<String> dbCities = userRepository.findDistinctCitiesByRole(Role.PLANNER);
        if (dbCities == null || dbCities.isEmpty()) {
            dbCities = List.of("Pune", "Mumbai", "Udaipur", "Goa", "Jaipur", "Delhi", "Bengaluru", "Nagpur");
        }

        List<Map<String, Object>> result = new ArrayList<>();
        long idCounter = 1;
        for (String cName : dbCities) {
            result.add(Map.of("id", idCounter++, "name", cName));
        }

        return result;
    }
}
