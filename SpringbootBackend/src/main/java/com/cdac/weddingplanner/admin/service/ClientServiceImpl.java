package com.cdac.weddingplanner.admin.service;

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.weddingplanner.admin.custom_exception.ResourceNotFoundException;
import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.ClientDTO;
import com.cdac.weddingplanner.admin.dto.ClientResponse;
import com.cdac.weddingplanner.admin.entities.Client;
import com.cdac.weddingplanner.admin.entities.Status;
import com.cdac.weddingplanner.admin.repository.ClientRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ModelMapper modelMapper;

    @Override
    public Page<ClientDTO> getAllClients(Pageable pageable)
    {

       Page<Client> clients = clientRepository.findAll(pageable);

        return clients.map(client -> modelMapper.map(client, ClientDTO.class));
    }

    @Override
    public ClientDTO getClientById(Long id) {

        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

        return modelMapper.map(client, ClientDTO.class);
        
    }
    
    @Override
    @Transactional
    public 	ApiResponse updateClientStatus(Long id, String status)
    {
    	Client client = clientRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Client not found"));
    	Status clientStatus;
    	try
    	{
    		clientStatus = Status.valueOf(status.toUpperCase());	
    	}catch(IllegalArgumentException e)
		{
			throw new IllegalArgumentException("Invalid status value. Allowed values are: ACTIVE, INACTIVE, SUSPENDED");
		}
    	client.setStatus(clientStatus);
    	clientRepository.save(client);
    	return new ApiResponse("success", "Client status updated successfully");
    }
    
    @Override
    @Transactional
    public ApiResponse deleteClient(Long id)
    {
    	Client client = clientRepository.findById(id)
    			.orElseThrow(() -> new ResourceNotFoundException("Client not found"));
    	clientRepository.delete(client);
    	return new ApiResponse("success", "Client deleted successfully");
    }
}
