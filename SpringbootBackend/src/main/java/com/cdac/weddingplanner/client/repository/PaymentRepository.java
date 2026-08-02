package com.cdac.weddingplanner.client.repository;

import com.cdac.weddingplanner.client.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByUserIdOrderByPaymentDateDesc(Long userId);

    boolean existsByPaymentNumber(String paymentNumber);
}
