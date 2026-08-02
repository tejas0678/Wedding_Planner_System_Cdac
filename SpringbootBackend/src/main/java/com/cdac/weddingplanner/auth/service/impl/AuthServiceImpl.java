package com.cdac.weddingplanner.auth.service.impl;

import com.cdac.weddingplanner.auth.dto.request.*;
import com.cdac.weddingplanner.auth.dto.response.AuthData;
import com.cdac.weddingplanner.auth.dto.response.LoginResponse;
import com.cdac.weddingplanner.auth.entity.PasswordResetToken;
import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.exception.EmailAlreadyExistsException;
import com.cdac.weddingplanner.auth.exception.InvalidCredentialsException;
import com.cdac.weddingplanner.auth.exception.UserNotFoundException;
import com.cdac.weddingplanner.auth.repository.PasswordResetTokenRepository;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.common.security.JwtService;
import com.cdac.weddingplanner.auth.service.AuthService;
import com.cdac.weddingplanner.auth.service.EmailService;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final SecureRandom secureRandom = new SecureRandom();

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            EmailService emailService
    ) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public ApiResponse<String> registerClient(RegisterClientRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered: " + request.getEmail());
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .enabled(true)
                .build();

        userRepository.save(user);

        return ApiResponse.success("Client registered successfully");
    }

    @Override
    @Transactional
    public ApiResponse<String> registerPlanner(RegisterPlannerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered: " + request.getEmail());
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .businessName(request.getBusinessName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.PLANNER)
                .enabled(true)
                .build();

        userRepository.save(user);

        return ApiResponse.success("Planner registered successfully");
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String jwt = jwtService.generateToken(user);
        return buildLoginResponse(user, jwt, "Login successful");
    }

    @Override
    @Transactional
    public ApiResponse<String> forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.getEmail()));

        // Generate 6-digit OTP
        int otpInt = 100000 + secureRandom.nextInt(900000);
        String otp = String.valueOf(otpInt);
        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = tokenRepository.findByUser(user)
                .orElse(PasswordResetToken.builder()
                        .user(user)
                        .build());

        resetToken.setToken(token);
        resetToken.setOtp(otp);
        resetToken.setVerified(false);
        resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(5)); // 5 minutes expiry

        tokenRepository.save(resetToken);

        // Send OTP via Email
        emailService.sendOtpEmail(user.getEmail(), otp);

        return ApiResponse.success("6-digit OTP sent to your email. Valid for 5 minutes.");
    }

    @Override
    @Transactional
    public ApiResponse<String> verifyOtp(VerifyOtpRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.getEmail()));

        PasswordResetToken resetToken = tokenRepository.findByUser(user)
                .orElseThrow(() -> new InvalidCredentialsException("No OTP request found for this email."));

        if (resetToken.isExpired()) {
            throw new InvalidCredentialsException("OTP has expired. Please request a new OTP.");
        }

        if (!resetToken.getOtp().equals(request.getOtp().trim())) {
            throw new InvalidCredentialsException("Invalid OTP code. Please check and try again.");
        }

        resetToken.setVerified(true);
        tokenRepository.save(resetToken);

        return ApiResponse.success("OTP verified successfully. You can now reset your password.");
    }

    @Override
    @Transactional
    public ApiResponse<String> resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + request.getEmail()));

        PasswordResetToken resetToken = tokenRepository.findByUser(user)
                .orElseThrow(() -> new InvalidCredentialsException("Password reset session invalid. Please request a new OTP."));

        if (resetToken.isExpired()) {
            tokenRepository.delete(resetToken);
            throw new InvalidCredentialsException("OTP session has expired. Please request a new OTP.");
        }

        // Verify OTP code matches or token is verified
        boolean isOtpValid = request.getOtp() != null && resetToken.getOtp().equals(request.getOtp().trim());
        if (!resetToken.getVerified() && !isOtpValid) {
            throw new InvalidCredentialsException("OTP not verified. Please verify OTP first.");
        }

        // Update password with BCrypt
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        // Invalidate OTP immediately after successful reset
        tokenRepository.delete(resetToken);

        return ApiResponse.success("Password reset successful");
    }

    private LoginResponse buildLoginResponse(User user, String token, String message) {
        String displayName = user.getBusinessName() != null && !user.getBusinessName().isBlank()
                ? user.getBusinessName()
                : user.getFullName();

        AuthData authData = AuthData.builder()
                .token(token)
                .tokenType("Bearer")
                .role(user.getRole().name())
                .userName(displayName)
                .userEmail(user.getEmail())
                .userId(user.getId())
                .build();

        return LoginResponse.builder()
                .success(true)
                .message(message)
                .data(authData)
                .build();
    }
}
