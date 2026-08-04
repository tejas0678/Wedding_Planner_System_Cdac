package com.cdac.weddingplanner.planner.repository;

import com.cdac.weddingplanner.planner.entity.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findByPlannerId(Long plannerId);
}
