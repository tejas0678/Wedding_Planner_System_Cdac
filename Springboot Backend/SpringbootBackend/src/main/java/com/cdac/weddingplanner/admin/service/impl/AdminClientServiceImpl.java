package com.cdac.weddingplanner.admin.service.impl;

import com.cdac.weddingplanner.admin.service.AdminClientService;
import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.CustomizationRequest;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.CustomizationRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminClientServiceImpl implements AdminClientService {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final CustomizationRequestRepository customizationRequestRepository;

    @Override
    public List<User> getClients() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.USER)
                .toList();
    }

    @Override
    public Map<String, Object> getClientDetails(Long id) {
        User client = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        if (client.getRole() != Role.USER) {
            throw new RuntimeException("User is not a client");
        }

        List<Booking> bookings = bookingRepository.findByUserId(id);
        List<CustomizationRequest> customizations = customizationRequestRepository.findByClientId(id);

        Map<String, Object> details = new HashMap<>();
        details.put("profile", client);
        details.put("bookings", bookings);
        details.put("customizations", customizations);

        return details;
    }
}
