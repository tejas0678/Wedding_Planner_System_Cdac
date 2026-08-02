package com.cdac.weddingplanner.admin.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.weddingplanner.admin.service.FeedbackService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/admin/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {
	
		private final FeedbackService feedbackService;

		@Operation(summary = "Get all feedback / reviews (paginated internally, returned as a plain array)")
		@GetMapping("/feedback")
		public ResponseEntity<?> getAllFeedbacks(@RequestParam(defaultValue = "0") int page,
				@RequestParam(defaultValue = "100") int size) {
			Pageable pageable = Pageable.ofSize(size).withPage(page);
			return ResponseEntity.ok(feedbackService.getAllFeedbacks(pageable).getContent());
		}

		@Operation(summary = "Get a single feedback entry by id")
		@GetMapping("/admin/feedbacks/{id}")
		public ResponseEntity<?> getFeedbackById(@PathVariable Long id) {
			return ResponseEntity.ok(feedbackService.getFeedbackById(id));
		}

		@Operation(summary = "Delete / moderate a feedback entry")
		@DeleteMapping("/admin/feedbacks/{id}")
		public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
			return ResponseEntity.ok(feedbackService.deleteFeedback(id));
		}

	

}
