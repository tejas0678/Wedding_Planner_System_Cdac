package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.Venue;
import com.cdac.weddingplanner.planner.service.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/venues")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService venueService;

    @PostMapping
    public ResponseEntity<ApiResponse<Venue>> addVenue(@RequestBody Venue venue) {
        Venue saved = venueService.addVenue(venue);
        return ResponseEntity.ok(ApiResponse.success("Venue added successfully", saved));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<Venue>>> getVenues(@PathVariable Long plannerId) {
        List<Venue> list = venueService.getVenuesByPlanner(plannerId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
