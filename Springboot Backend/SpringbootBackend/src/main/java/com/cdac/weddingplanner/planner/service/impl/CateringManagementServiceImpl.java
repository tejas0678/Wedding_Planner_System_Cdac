package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.planner.entity.CateringService;
import com.cdac.weddingplanner.planner.repository.CateringRepository;
import com.cdac.weddingplanner.planner.service.CateringManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CateringManagementServiceImpl implements CateringManagementService {

    private final CateringRepository cateringRepository;

    @Override
    public CateringService addCatering(CateringService catering) {
        return cateringRepository.save(catering);
    }

    @Override
    public List<CateringService> getCateringByPlanner(Long plannerId) {
        return cateringRepository.findByPlannerId(plannerId);
    }
}
