package com.cdac.weddingplanner.payment.exception;

// Maps to 502 — Razorpay itself rejected the request or was unreachable.
public class RazorpayGatewayException extends RuntimeException {
    public RazorpayGatewayException(String message, Throwable cause) {
        super(message, cause);
    }
}
