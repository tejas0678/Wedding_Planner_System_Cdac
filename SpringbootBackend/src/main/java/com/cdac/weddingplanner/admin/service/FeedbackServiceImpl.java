package com.cdac.weddingplanner.admin.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.weddingplanner.admin.custom_exception.ResourceNotFoundException;
import com.cdac.weddingplanner.admin.dto.ApiResponse;
import com.cdac.weddingplanner.admin.dto.FeedbackDTO;
import com.cdac.weddingplanner.admin.entities.Feedback;
import com.cdac.weddingplanner.admin.repository.FeedbackRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    // depcy - dao layer
    private final FeedbackRepository feedbackRepository;
    private final ModelMapper modelMapper;


    // Convert Feedback entity to FeedbackDTO
    private FeedbackDTO entityToDto(Feedback feedback) {

        FeedbackDTO dto =
                modelMapper.map(feedback, FeedbackDTO.class);

        dto.setClientName(
                feedback.getClient().getFullName());

        dto.setPlannerName(
                feedback.getPlanner().getBusinessName());

        dto.setDate(
                feedback.getFeedbackDate());

        return dto;
    }


    @Override
    public Page<FeedbackDTO> getAllFeedbacks(
            Pageable pageable) {

        // Invoke dao's method
        Page<Feedback> feedbacks =
                feedbackRepository.findAll(pageable);

        // Convert entity list to DTO list
        return feedbacks.map(this::entityToDto);
    }


    @Override
    public FeedbackDTO getFeedbackById(Long id) {

        // 1. Get feedback details by id
        Feedback feedback =
                feedbackRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Invalid feedback id : " + id));

        // 2. Convert entity to DTO
        return entityToDto(feedback);
    }


    @Override
    @Transactional
    public ApiResponse deleteFeedback(Long id) {

        // 1. Get feedback
        Feedback feedback =
                feedbackRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Invalid feedback id : " + id));

        // 2. Delete feedback
        feedbackRepository.delete(feedback);

        return new ApiResponse(
                "Success","Feedback deleted successfully");
    }
}


