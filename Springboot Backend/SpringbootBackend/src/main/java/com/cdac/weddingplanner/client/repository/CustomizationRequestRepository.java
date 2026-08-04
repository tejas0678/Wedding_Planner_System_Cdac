package com.cdac.weddingplanner.client.repository;

import com.cdac.weddingplanner.client.entity.CustomizationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomizationRequestRepository extends JpaRepository<CustomizationRequest, Long> {
    List<CustomizationRequest> findByPlannerId(Long plannerId);
    List<CustomizationRequest> findByBookingId(Long bookingId);
    List<CustomizationRequest> findByClientId(Long clientId);
}
