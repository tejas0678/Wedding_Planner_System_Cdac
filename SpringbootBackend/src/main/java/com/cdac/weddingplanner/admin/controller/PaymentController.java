
	package com.cdac.weddingplanner.admin.controller;

	import java.util.List;

	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.GetMapping;
	import org.springframework.web.bind.annotation.PathVariable;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	import org.springframework.web.bind.annotation.RestController;
	import org.springframework.web.bind.annotation.DeleteMapping;
	import com.cdac.weddingplanner.admin.service.PaymentService;
	
	import io.swagger.v3.oas.annotations.Operation;
	import lombok.RequiredArgsConstructor;

	@RestController
	@RequestMapping("/api/payments")
	@RequiredArgsConstructor
	public class PaymentController {

	    private final PaymentService paymentService;

					@GetMapping
					@Operation(summary = "Get all payment details")
					public ResponseEntity<?> getAllPayments(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "100") int size) {
						org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.Pageable.ofSize(size).withPage(page);
						return ResponseEntity.ok(
								paymentService.getAllPayments(pageable).getContent()
						);
					}

	    @GetMapping("/{id}")
	    @Operation(summary = "Get payment details by id")
	    public ResponseEntity<?> getPaymentById(
	            @PathVariable Long id) {

	        return ResponseEntity.ok(
	                paymentService.getPaymentById(id)
	        );
	    }
	    @Operation(summary = "Delete a payment record")
		@DeleteMapping("/{id}")
		public ResponseEntity<?> deletePayment(@PathVariable Long id) {
			return ResponseEntity.ok(paymentService.deletePayment(id));
		}
	}

