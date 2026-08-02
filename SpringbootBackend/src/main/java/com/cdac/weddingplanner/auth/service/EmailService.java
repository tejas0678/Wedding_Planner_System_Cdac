package com.cdac.weddingplanner.auth.service;

public interface EmailService {

    void sendOtpEmail(String toEmail, String otp);
}
