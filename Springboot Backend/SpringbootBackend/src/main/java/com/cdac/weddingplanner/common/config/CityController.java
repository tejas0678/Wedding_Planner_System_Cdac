package com.cdac.weddingplanner.common.config;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.common.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/cities", "/api/cities"})
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getCities() {
        List<Map<String, Object>> result = cityService.getCities();
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}
