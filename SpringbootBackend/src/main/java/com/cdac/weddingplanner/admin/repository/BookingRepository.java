package com.cdac.weddingplanner.admin.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdac.weddingplanner.admin.entities.Booking;
import com.cdac.weddingplanner.admin.entities.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	
	long countByStatus(BookingStatus status);
	
	List<Booking> findTop5ByOrderByCreatedOnDesc();
	
	@Query("SELECT COALESCE(SUM(b.amount), 0) FROM Booking b WHERE b.planner.id = :plannerId AND b.status = 'COMPLETED'")
	BigDecimal sumAmountByPlannerId(@Param("plannerId") Long plannerId);
}