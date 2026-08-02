package com.cdac.weddingplanner.admin.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cdac.weddingplanner.admin.dto.StatusUpdateDTO;
import com.cdac.weddingplanner.admin.service.ClientService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;


    @GetMapping
    @Operation(summary = "Get all client Details")
    public ResponseEntity<?> getAllClients(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "100") int size) {
    	Pageable pageable = Pageable.ofSize(size).withPage(page);
        return ResponseEntity.ok(clientService.getAllClients(pageable).getContent());

    }
    
    
    @GetMapping("/{id}")
    @Operation(summary = "Get client Details by id")
    public ResponseEntity<?> getClientById(@PathVariable Long id) {

        return ResponseEntity.ok(clientService.getClientById(id));

    }
    
    @Operation(summary = "Update ClientStatus Activate/ deactivate by id")
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateClientStatus(@PathVariable Long id,@Valid @RequestParam StatusUpdateDTO dto) {
		return ResponseEntity.ok(clientService.updateClientStatus(id, dto.getStatus()));
	}
    
    @Operation(summary = "Delete Client by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
    	return ResponseEntity.ok(clientService.deleteClient(id));
    }
}