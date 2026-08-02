package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.request.CreateServiceRequest;
import com.weddingplanner.plannerservice.dto.response.ServiceResponse;
import com.weddingplanner.plannerservice.entity.ServiceOffering;
import com.weddingplanner.plannerservice.exception.ResourceNotFoundException;
import com.weddingplanner.plannerservice.repository.ServiceOfferingRepository;
import com.weddingplanner.plannerservice.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceOfferingServiceImpl implements ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;

    @Override
    public List<ServiceResponse> getServices(Long plannerId) {
        return serviceOfferingRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public ServiceResponse addService(Long plannerId, CreateServiceRequest request) {
        ServiceOffering entity = ServiceOffering.builder()
                .plannerId(plannerId)
                .name(request.getName())
                .category(request.getCategory())
                .price(request.getPrice())
                .pricingType(request.getPricingType())
                .description(request.getDescription())
                .build();

        ServiceOffering saved = serviceOfferingRepository.save(entity);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public ServiceResponse updateService(Long plannerId, Long serviceId, CreateServiceRequest request) {
        ServiceOffering entity = serviceOfferingRepository.findByIdAndPlannerId(serviceId, plannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        entity.setName(request.getName());
        entity.setCategory(request.getCategory());
        entity.setPrice(request.getPrice());
        entity.setPricingType(request.getPricingType());
        entity.setDescription(request.getDescription());

        ServiceOffering saved = serviceOfferingRepository.save(entity);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteService(Long plannerId, Long serviceId) {
        ServiceOffering entity = serviceOfferingRepository.findByIdAndPlannerId(serviceId, plannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));
        serviceOfferingRepository.delete(entity);
    }

    private ServiceResponse toResponse(ServiceOffering entity) {
        return ServiceResponse.builder()
                .id(entity.getId())
                .plannerId(entity.getPlannerId())
                .name(entity.getName())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .pricingType(entity.getPricingType())
                .description(entity.getDescription())
                .build();
    }
}
