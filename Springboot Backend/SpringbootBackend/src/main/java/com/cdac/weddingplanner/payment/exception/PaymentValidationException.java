package com.cdac.weddingplanner.payment.exception;

// Maps to 400 — bad input from the caller (invalid amount, missing fields, wrong owner).
public class PaymentValidationException extends RuntimeException {
    public PaymentValidationException(String message) {
        super(message);
    }
}
