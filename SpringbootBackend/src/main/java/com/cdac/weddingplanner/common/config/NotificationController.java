package com.cdac.weddingplanner.common.config;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @GetMapping
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getNotifications() {
        List<Map<String, Object>> mockNotifications = List.of(
            Map.of("id", 1, "title", "Booking Confirmed", "message", "Your Royal Heritage Package booking has been confirmed by Royal Touch Weddings.", "time", "10 mins ago", "read", false),
            Map.of("id", 2, "title", "Payment Received", "message", "30% Advance Payment of ₹2,29,680 processed successfully via Razorpay.", "time", "1 hour ago", "read", true)
        );

        return ResponseEntity.ok(ApiResponse.success(mockNotifications));
    }
}
