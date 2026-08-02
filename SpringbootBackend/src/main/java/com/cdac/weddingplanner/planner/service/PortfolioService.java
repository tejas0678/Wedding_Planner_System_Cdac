package com.weddingplanner.plannerservice.service;

import com.weddingplanner.plannerservice.dto.request.CreatePortfolioItemRequest;
import com.weddingplanner.plannerservice.dto.response.PortfolioItemResponse;

import java.util.List;

public interface PortfolioService {
    List<PortfolioItemResponse> getItems(Long plannerId);
    PortfolioItemResponse addItem(Long plannerId, CreatePortfolioItemRequest request);
    void deleteItem(Long plannerId, Long itemId);
}
