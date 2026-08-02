package com.cdac.weddingplanner.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.weddingplanner.admin.entities.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
