package com.cdac.weddingplanner.auth.repository;

import com.cdac.weddingplanner.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.weddingplanner.auth.entity.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> findByRoleAndEnabledTrue(Role role);

    List<User> findByRoleAndCityIgnoreCaseAndEnabledTrue(Role role, String city);

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.enabled = true AND (LOWER(u.fullName) LIKE LOWER(CONCAT('%', :kw, '%')) OR LOWER(u.businessName) LIKE LOWER(CONCAT('%', :kw, '%')) OR LOWER(u.city) LIKE LOWER(CONCAT('%', :kw, '%')))")
    List<User> searchPlanners(@Param("role") Role role, @Param("kw") String keyword);

    @Query("SELECT DISTINCT u.city FROM User u WHERE u.role = :role AND u.city IS NOT NULL AND u.city <> '' AND u.enabled = true")
    List<String> findDistinctCitiesByRole(@Param("role") Role role);
}
