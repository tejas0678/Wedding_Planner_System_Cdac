package com.cdac.weddingplanner.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.weddingplanner.admin.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	   boolean existsByBookingId(Long bookingId);
}
