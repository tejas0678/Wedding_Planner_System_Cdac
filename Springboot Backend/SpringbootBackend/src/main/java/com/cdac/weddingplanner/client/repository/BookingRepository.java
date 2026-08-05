package com.cdac.weddingplanner.client.repository;

import com.cdac.weddingplanner.client.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByUserIdOrderByIdDesc(Long userId);

    List<Booking> findByPlannerId(Long plannerId);
}
