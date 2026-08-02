package com.cdac.weddingplanner.client.repository;

import com.cdac.weddingplanner.client.entity.WeddingPackage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeddingPackageRepository extends JpaRepository<WeddingPackage, Long> {
}
