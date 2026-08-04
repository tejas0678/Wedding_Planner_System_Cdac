package com.cdac.weddingplanner.payment.repository;

import com.cdac.weddingplanner.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);

    List<Payment> findByClientIdOrderByCreatedAtDesc(Long clientId);

    List<Payment> findByPlannerIdOrderByCreatedAtDesc(Long plannerId);

    List<Payment> findAllByOrderByCreatedAtDesc();

    boolean existsByBookingIdAndStatus(Long bookingId, Payment.PaymentStatus status);

    List<Payment> findByBookingIdOrderByCreatedAtDesc(Long bookingId);
}
