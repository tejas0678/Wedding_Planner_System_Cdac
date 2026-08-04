package com.cdac.weddingplanner.planner.repository;

import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface PlannerPackageRepository extends JpaRepository<PlannerPackage, Long> {

    List<PlannerPackage> findByPlannerId(Long plannerId);

    @Query("SELECT p FROM PlannerPackage p WHERE " +
           "(:plannerId IS NULL OR p.plannerId = :plannerId) AND " +
           "(:eventType IS NULL OR :eventType = '' OR LOWER(:eventType) = 'all' OR LOWER(p.eventType) = LOWER(:eventType)) AND " +
           "(:theme IS NULL OR :theme = '' OR LOWER(:theme) = 'all' OR LOWER(p.theme) LIKE LOWER(CONCAT('%', :theme, '%')) OR LOWER(p.category) LIKE LOWER(CONCAT('%', :theme, '%'))) AND " +
           "(:city IS NULL OR :city = '' OR LOWER(:city) = 'all' OR LOWER(p.city) = LOWER(:city)) AND " +
           "(:keyword IS NULL OR :keyword = '' OR LOWER(p.packageName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.servicesIncluded) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<PlannerPackage> filterPackages(
            @Param("plannerId") Long plannerId,
            @Param("eventType") String eventType,
            @Param("theme") String theme,
            @Param("city") String city,
            @Param("keyword") String keyword
    );

    @Query("SELECT DISTINCT p.eventType FROM PlannerPackage p WHERE p.eventType IS NOT NULL AND p.eventType <> ''")
    List<String> findDistinctEventTypes();

    @Query("SELECT DISTINCT p.theme FROM PlannerPackage p WHERE p.theme IS NOT NULL AND p.theme <> ''")
    List<String> findDistinctThemes();

    @Query("SELECT DISTINCT p.city FROM PlannerPackage p WHERE p.city IS NOT NULL AND p.city <> ''")
    List<String> findDistinctCities();
}
