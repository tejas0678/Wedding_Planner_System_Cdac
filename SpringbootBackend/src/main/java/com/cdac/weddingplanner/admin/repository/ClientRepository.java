package com.cdac.weddingplanner.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.weddingplanner.admin.entities.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
