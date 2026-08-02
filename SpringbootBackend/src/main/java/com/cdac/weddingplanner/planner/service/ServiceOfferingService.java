package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.request.CreateServiceRequest;
import com.weddingplanner.plannerservice.dto.response.ServiceResponse;

import java.util.List;

public interface ServiceOfferingService {
    List<ServiceResponse> getServices(Long plannerId);
    ServiceResponse addService(Long plannerId, CreateServiceRequest request);
    ServiceResponse updateService(Long plannerId, Long serviceId, CreateServiceRequest request);
    void deleteService(Long plannerId, Long serviceId);
}
