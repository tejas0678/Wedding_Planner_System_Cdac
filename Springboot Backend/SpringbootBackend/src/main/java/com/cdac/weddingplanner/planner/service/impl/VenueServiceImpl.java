package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.planner.entity.Venue;
import com.cdac.weddingplanner.planner.repository.VenueRepository;
import com.cdac.weddingplanner.planner.service.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VenueServiceImpl implements VenueService {

    private final VenueRepository venueRepository;

    @Override
    public Venue addVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    @Override
    public List<Venue> getVenuesByPlanner(Long plannerId) {
        return venueRepository.findByPlannerId(plannerId);
    }
}
