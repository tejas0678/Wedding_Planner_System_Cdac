package com.cdac.weddingplanner.admin.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.FeedbackDTO;

public interface FeedbackService {

	Page<FeedbackDTO> getAllFeedbacks(Pageable pageable);

	FeedbackDTO  getFeedbackById(Long id);

	ApiResponse deleteFeedback(Long id);

}
