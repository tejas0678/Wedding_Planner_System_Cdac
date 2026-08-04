package com.cdac.weddingplanner.payment.exception;

// Maps to 404 — the referenced booking or payment order does not exist.
public class PaymentNotFoundException extends RuntimeException {
    public PaymentNotFoundException(String message) {
        super(message);
    }
}
