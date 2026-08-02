package com.cdac.weddingplanner.admin.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.weddingplanner.admin.custom_exception.ResourceNotFoundException;
import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.PaymentDTO;
import com.cdac.weddingplanner.admin.entities.Payment;
import com.cdac.weddingplanner.admin.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<PaymentDTO> getAllPayments(Pageable pageable) {

        Page<Payment> page = paymentRepository.findAll(pageable);

        return page.map(payment -> {

            PaymentDTO dto = modelMapper.map(payment, PaymentDTO.class);

            dto.setClient(payment.getClient().getFullName());

            dto.setWeddingId(
                    payment.getBooking().getBookingNumber()
            );

            dto.setWeddingDate(
                    payment.getBooking().getWeddingDate()
            );

            return dto;
        });
    }

    @Override
    public PaymentDTO getPaymentById(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id " + id
                        )
                );

        PaymentDTO dto = modelMapper.map(payment, PaymentDTO.class);

        dto.setClient(payment.getClient().getFullName());

        dto.setWeddingId(
                payment.getBooking().getBookingNumber()
        );

        dto.setWeddingDate(
                payment.getBooking().getWeddingDate()
        );

        return dto;
    }
	@Override
	@Transactional
	public ApiResponse deletePayment(Long id) {
		Payment payment = paymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Payment not found with id " + id));
		paymentRepository.delete(payment);
		return new ApiResponse("Success", "Payment deleted successfully");
	}
}