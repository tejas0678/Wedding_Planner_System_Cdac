package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.service.PublicPlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/planners", "/api/planners"})
@RequiredArgsConstructor
public class PublicPlannerController {

    private final PublicPlannerService publicPlannerService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getPublicPlanners(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String keyword
    ) {
        List<User> planners = publicPlannerService.getPublicPlanners(city, keyword);
        return ResponseEntity.ok(ApiResponse.success(planners));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<User>>> searchPlanners(@RequestParam String keyword) {
        List<User> planners = publicPlannerService.searchPlanners(keyword);
        return ResponseEntity.ok(ApiResponse.success(planners));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<ApiResponse<List<User>>> getPlannersByCity(@PathVariable String city) {
        List<User> planners = publicPlannerService.getPlannersByCity(city);
        return ResponseEntity.ok(ApiResponse.success(planners));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<User>> getPlannerDetails(@PathVariable Long id) {
        User planner = publicPlannerService.getPlannerDetails(id);
        return ResponseEntity.ok(ApiResponse.success(planner));
    }
}
