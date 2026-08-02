package com.cdac.weddingplanner.admin.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.ClientDTO;
import com.cdac.weddingplanner.admin.dto.ClientResponse;

public interface ClientService {
	
	Page<ClientDTO> getAllClients(Pageable pageable);

	ClientDTO getClientById(Long id);

	ApiResponse updateClientStatus(Long id, String status);

	ApiResponse deleteClient(Long id);

}