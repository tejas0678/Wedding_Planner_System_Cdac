package com.weddingplanner.plannerservice.service.impl;

import com.weddingplanner.plannerservice.dto.request.CreatePortfolioItemRequest;
import com.weddingplanner.plannerservice.dto.response.PortfolioItemResponse;
import com.weddingplanner.plannerservice.entity.PortfolioItem;
import com.weddingplanner.plannerservice.exception.ResourceNotFoundException;
import com.weddingplanner.plannerservice.repository.PortfolioItemRepository;
import com.weddingplanner.plannerservice.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioServiceImpl implements PortfolioService {

    private final PortfolioItemRepository portfolioItemRepository;

    @Override
    public List<PortfolioItemResponse> getItems(Long plannerId) {
        return portfolioItemRepository.findByPlannerIdOrderByCreatedAtDesc(plannerId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public PortfolioItemResponse addItem(Long plannerId, CreatePortfolioItemRequest request) {
        PortfolioItem entity = PortfolioItem.builder()
                .plannerId(plannerId)
                .title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .description(request.getDescription())
                .location(request.getLocation())
                .build();

        PortfolioItem saved = portfolioItemRepository.save(entity);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteItem(Long plannerId, Long itemId) {
        PortfolioItem entity = portfolioItemRepository.findByIdAndPlannerId(itemId, plannerId)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio item not found with id: " + itemId));
        portfolioItemRepository.delete(entity);
    }

    private PortfolioItemResponse toResponse(PortfolioItem entity) {
        return PortfolioItemResponse.builder()
                .id(entity.getId())
                .plannerId(entity.getPlannerId())
                .title(entity.getTitle())
                .imageUrl(entity.getImageUrl())
                .category(entity.getCategory())
                .description(entity.getDescription())
                .location(entity.getLocation())
                .build();
    }
}
