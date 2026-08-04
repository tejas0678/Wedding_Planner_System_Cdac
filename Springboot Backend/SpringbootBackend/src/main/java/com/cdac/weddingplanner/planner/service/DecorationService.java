package com.cdac.weddingplanner.planner.service;

import com.cdac.weddingplanner.planner.entity.DecorationOption;

import java.util.List;

public interface DecorationService {

    DecorationOption addDecoration(DecorationOption decoration);

    List<DecorationOption> getDecorationsByPlanner(Long plannerId);
}
