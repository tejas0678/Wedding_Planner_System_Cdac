package com.cdac.weddingplanner.common.config;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/cities", "/api/cities"})
public class CityController {

    private final UserRepository userRepository;

    public CityController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getCities() {
        List<String> dbCities = userRepository.findDistinctCitiesByRole(Role.PLANNER);
        if (dbCities == null || dbCities.isEmpty()) {
            dbCities = List.of("Pune", "Mumbai", "Udaipur", "Goa", "Jaipur", "Delhi", "Bengaluru", "Nagpur");
        }

        List<Map<String, Object>> result = new ArrayList<>();
        long idCounter = 1;
        for (String cName : dbCities) {
            result.add(Map.of("id", idCounter++, "name", cName));
        }

        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
