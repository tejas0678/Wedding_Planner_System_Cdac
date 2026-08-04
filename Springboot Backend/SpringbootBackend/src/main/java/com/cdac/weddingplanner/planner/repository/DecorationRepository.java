package com.cdac.weddingplanner.planner.repository;

import com.cdac.weddingplanner.planner.entity.DecorationOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DecorationRepository extends JpaRepository<DecorationOption, Long> {
    List<DecorationOption> findByPlannerId(Long plannerId);
}
