package com.cdac.weddingplanner.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.PaymentDTO;

public interface PaymentService {

	Page<PaymentDTO> getAllPayments(Pageable pageable);

	PaymentDTO getPaymentById(Long id);


	ApiResponse deletePayment(Long id);

}
