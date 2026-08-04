package com.cdac.weddingplanner.payment.exception;

// Maps to 409 — booking isn't in a payable state (not confirmed, cancelled, or already paid),
// or this specific order/payment was already processed (duplicate-payment guard).
public class PaymentConflictException extends RuntimeException {
    public PaymentConflictException(String message) {
        super(message);
    }
}
