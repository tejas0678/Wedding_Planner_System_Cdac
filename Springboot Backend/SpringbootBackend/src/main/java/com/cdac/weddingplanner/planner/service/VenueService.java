package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.Venue;

import java.util.List;

public interface VenueService {

    Venue addVenue(Venue venue);

    List<Venue> getVenuesByPlanner(Long plannerId);
}
