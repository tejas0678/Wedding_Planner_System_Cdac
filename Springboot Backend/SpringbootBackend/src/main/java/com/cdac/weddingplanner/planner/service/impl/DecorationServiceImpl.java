package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.planner.entity.DecorationOption;
import com.cdac.weddingplanner.planner.repository.DecorationRepository;
import com.cdac.weddingplanner.planner.service.DecorationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DecorationServiceImpl implements DecorationService {

    private final DecorationRepository decorationRepository;

    @Override
    public DecorationOption addDecoration(DecorationOption decoration) {
        return decorationRepository.save(decoration);
    }

    @Override
    public List<DecorationOption> getDecorationsByPlanner(Long plannerId) {
        return decorationRepository.findByPlannerId(plannerId);
    }
}
