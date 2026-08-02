package com.weddingplanner.plannerservice.repository;

import com.weddingplanner.plannerservice.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPlannerIdOrderByCreatedAtDesc(Long plannerId);
    Optional<Booking> findByIdAndPlannerId(Long id, Long plannerId);
    boolean existsByBookingNumber(String bookingNumber);
    long countByPlannerId(Long plannerId);
}
