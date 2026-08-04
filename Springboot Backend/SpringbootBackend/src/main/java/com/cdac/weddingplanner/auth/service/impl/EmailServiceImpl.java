package com.cdac.weddingplanner.auth.service.impl;

import com.cdac.weddingplanner.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:tejassayane35@gmail.com}")
    private String senderEmail;

    @Override
    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(senderEmail);
            message.setTo(toEmail);
            message.setSubject("Royal Bliss - Password Reset OTP Code");
            message.setText("Dear User,\n\nYour 6-digit OTP verification code for password reset is: " 
                    + otp + "\n\nThis OTP will expire in 5 minutes.\n\n"
                    + "If you did not request a password reset, please ignore this email.\n\n"
                    + "Best regards,\nRoyal Bliss Wedding Planners");

            mailSender.send(message);
            System.out.println(">>> [LIVE EMAIL SENT] OTP " + otp + " sent successfully to " + toEmail + " via " + senderEmail);
        } catch (Exception e) {
            System.err.println(">>> [EMAIL ERROR] Could not send live email via SMTP (" + e.getMessage() + ").");
            System.out.println(">>> [FALLBACK DEV OTP CODE FOR " + toEmail + "]: " + otp);
        }
    }
}
