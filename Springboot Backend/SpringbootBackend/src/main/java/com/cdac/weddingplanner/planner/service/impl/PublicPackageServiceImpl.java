package com.cdac.weddingplanner.planner.service.impl;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.planner.entity.PlannerPackage;
import com.cdac.weddingplanner.planner.repository.PlannerPackageRepository;
import com.cdac.weddingplanner.planner.service.PublicPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PublicPackageServiceImpl implements PublicPackageService {

    private final PlannerPackageRepository packageRepository;
    private final UserRepository userRepository;

    @Override
    public List<PlannerPackage> getPublicPackages(
            Long plannerId,
            String eventType,
            String theme,
            String category,
            String city,
            String keyword,
            String search
    ) {
        String activeTheme = (theme != null && !theme.trim().isEmpty()) ? theme.trim() : category;
        String activeKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : search;
        String activeEventType = (eventType != null && !eventType.trim().isEmpty()) ? eventType.trim() : null;
        String activeCity = (city != null && !city.trim().isEmpty()) ? city.trim() : null;

        List<PlannerPackage> allPackages = packageRepository.findAll();
        Map<Long, User> plannerMap = new HashMap<>();
        for (User u : userRepository.findByRoleAndEnabledTrue(Role.PLANNER)) {
            plannerMap.put(u.getId(), u);
        }

        return allPackages.stream().filter(pkg -> {
            if (plannerId != null && !plannerId.equals(pkg.getPlannerId())) {
                return false;
            }

            if (activeEventType != null && !"all".equalsIgnoreCase(activeEventType)) {
                String eType = pkg.getEventType() != null ? pkg.getEventType() : "";
                boolean matchesEType = eType.equalsIgnoreCase(activeEventType);
                if (!matchesEType) return false;
            }

            if (activeTheme != null && !"all".equalsIgnoreCase(activeTheme)) {
                String pTheme = pkg.getTheme() != null ? pkg.getTheme() : "";
                String cat = pkg.getCategory() != null ? pkg.getCategory() : "";
                boolean matchesTheme = pTheme.equalsIgnoreCase(activeTheme) || cat.equalsIgnoreCase(activeTheme);
                if (!matchesTheme) return false;
            }

            if (activeCity != null && !"all".equalsIgnoreCase(activeCity)) {
                String pkgCity = pkg.getCity() != null ? pkg.getCity() : "";
                User planner = pkg.getPlannerId() != null ? plannerMap.get(pkg.getPlannerId()) : null;
                String plannerCity = (planner != null && planner.getCity() != null) ? planner.getCity() : "";
                boolean matchesCity = pkgCity.equalsIgnoreCase(activeCity)
                        || plannerCity.equalsIgnoreCase(activeCity);
                if (!matchesCity) return false;
            }

            if (activeKeyword != null && !activeKeyword.isEmpty()) {
                String kw = activeKeyword.toLowerCase();
                String pName = pkg.getPackageName() != null ? pkg.getPackageName().toLowerCase() : "";
                String desc = pkg.getDescription() != null ? pkg.getDescription().toLowerCase() : "";
                String services = pkg.getServicesIncluded() != null ? pkg.getServicesIncluded().toLowerCase() : "";
                String cat = pkg.getCategory() != null ? pkg.getCategory().toLowerCase() : "";
                String th = pkg.getTheme() != null ? pkg.getTheme().toLowerCase() : "";
                String et = pkg.getEventType() != null ? pkg.getEventType().toLowerCase() : "";

                boolean matchesKw = pName.contains(kw) || desc.contains(kw) || services.contains(kw)
                        || cat.contains(kw) || th.contains(kw) || et.contains(kw);
                if (!matchesKw) return false;
            }

            return true;
        }).toList();
    }

    @Override
    public Map<String, Object> getPackageFilters() {
        List<PlannerPackage> allPackages = packageRepository.findAll();
        List<User> planners = userRepository.findByRoleAndEnabledTrue(Role.PLANNER);

        Set<String> eventTypesSet = new LinkedHashSet<>();
        Set<String> themesSet = new LinkedHashSet<>();
        Set<String> citiesSet = new LinkedHashSet<>();

        for (PlannerPackage p : allPackages) {
            if (p.getEventType() != null && !p.getEventType().trim().isEmpty()) eventTypesSet.add(p.getEventType().trim());
            if (p.getTheme() != null && !p.getTheme().trim().isEmpty()) themesSet.add(p.getTheme().trim());
            if (p.getCategory() != null && !p.getCategory().trim().isEmpty()) themesSet.add(p.getCategory().trim());
            if (p.getCity() != null && !p.getCity().trim().isEmpty()) citiesSet.add(p.getCity().trim());
        }

        for (User u : planners) {
            if (u.getCity() != null && !u.getCity().trim().isEmpty()) citiesSet.add(u.getCity().trim());
        }

        List<Map<String, Object>> plannerList = planners.stream().map(p -> Map.<String, Object>of(
                "id", p.getId(),
                "name", p.getBusinessName() != null ? p.getBusinessName() : p.getFullName(),
                "city", p.getCity() != null ? p.getCity() : "India"
        )).toList();

        return Map.of(
                "eventTypes", new ArrayList<>(eventTypesSet),
                "themes", new ArrayList<>(themesSet),
                "cities", new ArrayList<>(citiesSet),
                "planners", plannerList
        );
    }

    @Override
    public List<PlannerPackage> getPackagesByPlanner(Long plannerId) {
        return packageRepository.findByPlannerId(plannerId);
    }

    @Override
    public PlannerPackage getPackageById(Long id) {
        return packageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found with ID: " + id));
    }
}
