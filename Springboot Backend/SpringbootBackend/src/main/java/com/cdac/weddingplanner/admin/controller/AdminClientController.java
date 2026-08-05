package com.cdac.weddingplanner.admin.controller;

import com.cdac.weddingplanner.admin.service.AdminClientService;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/clients")
@RequiredArgsConstructor
public class AdminClientController {

    private final AdminClientService adminClientService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<User>>> getClients() {
        List<User> clients = adminClientService.getClients();
        return ResponseEntity.ok(ApiResponse.success(clients));
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getClientDetails(@PathVariable Long id) {
        Map<String, Object> details = adminClientService.getClientDetails(id);
        return ResponseEntity.ok(ApiResponse.success(details));
    }
}
