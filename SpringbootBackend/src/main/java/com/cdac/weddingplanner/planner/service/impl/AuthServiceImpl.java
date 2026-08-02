package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.request.LoginRequest;
import com.weddingplanner.plannerservice.dto.request.RegisterPlannerRequest;
import com.weddingplanner.plannerservice.dto.response.AuthResponse;
import com.weddingplanner.plannerservice.entity.Planner;
import com.weddingplanner.plannerservice.enums.PlannerStatus;
import com.weddingplanner.plannerservice.exception.DuplicateResourceException;
import com.weddingplanner.plannerservice.exception.InvalidCredentialsException;
import com.weddingplanner.plannerservice.repository.PlannerRepository;
import com.weddingplanner.plannerservice.security.JwtService;
import com.weddingplanner.plannerservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final String ROLE = "PLANNER";

    private final PlannerRepository plannerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponse register(RegisterPlannerRequest request) {
        if (plannerRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("An account with this email already exists");
        }

        Planner planner = Planner.builder()
                .name(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .businessName(request.getBusinessName())
                .password(passwordEncoder.encode(request.getPassword()))
                .status(PlannerStatus.APPROVED)
                .build();

        Planner saved = plannerRepository.save(planner);

        String token = jwtService.generateToken(saved.getId(), saved.getEmail(), ROLE);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .role(ROLE)
                .userName(saved.getName())
                .userEmail(saved.getEmail())
                .userId(saved.getId())
                .build();
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Planner planner = plannerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), planner.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(planner.getId(), planner.getEmail(), ROLE);

        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .role(ROLE)
                .userName(planner.getName())
                .userEmail(planner.getEmail())
                .userId(planner.getId())
                .build();
    }
}
