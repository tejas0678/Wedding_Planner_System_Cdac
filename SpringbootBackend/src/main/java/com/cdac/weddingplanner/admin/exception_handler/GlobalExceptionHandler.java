package com.cdac.weddingplanner.admin.exception_handler;

	import java.util.List;
	import java.util.Map;
	import java.util.stream.Collectors;

	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.validation.FieldError;
	import org.springframework.web.bind.MethodArgumentNotValidException;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cdac.weddingplanner.admin.custom_exception.ApiException;
import com.cdac.weddingplanner.admin.custom_exception.InvalidInputException;
import com.cdac.weddingplanner.admin.custom_exception.ResourceNotFoundException;
import com.cdac.weddingplanner.admin.dto.ApiResponse;




	/*
	 * @RestControllerAdvice = @ControllerAdvice + @ResponseBody
	 *  - This supplies common advice to all rest controllers
	 *   - regarding exception handling (recurring task)
	 */
	@RestControllerAdvice
	public class GlobalExceptionHandler {

		// exception handling method - ResourceNotFoundException
		@ExceptionHandler(ResourceNotFoundException.class)
		public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
			System.out.println("in handle res not found exc ");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)// SC 404
					.body(new ApiResponse("Failed", e.getMessage()));
		}

		// exception handling method - ApiException (e.g. duplicate email/code)
		@ExceptionHandler(ApiException.class)
		public ResponseEntity<?> handleApiException(ApiException e) {
			System.out.println("in handle api exc ");
			return ResponseEntity.status(HttpStatus.CONFLICT)// SC 409
					.body(new ApiResponse("Failed", e.getMessage()));
		}

		// exception handling method - InvalidInputException
		@ExceptionHandler(InvalidInputException.class)
		public ResponseEntity<?> handleInvalidInputException(InvalidInputException e) {
			System.out.println("in handle invalid i/p exc ");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)// SC 400
					.body(new ApiResponse("FAILED", e.getMessage()));
		}

		// exception handling method - Exception (catch-all)
		@ExceptionHandler(Exception.class)
		public ResponseEntity<?> handleException(Exception e) {
			System.out.println("in catch-all ");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)// SC 500
					.body(new ApiResponse("Failed", e.getMessage()));
		}

		//@Valid - P.L for request body -
		// exception handling method - MethodArgumentNotValidException
		@ExceptionHandler(MethodArgumentNotValidException.class)
		public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
			System.out.println("in catch @Valid P.L ");
			//1. Extract List of rejected field errors
			List<FieldError> fieldErrors = e.getFieldErrors();
			/*
			 * 2. Convert List -> Map
			 * Key - name of rejected field - FieldError.getField
			 * Value - error message - FieldError.getDefaultMessage
			 */
			Map<String, String> fieldErrorMap = fieldErrors.stream() //Stream<FieldError>
					//in case of multiple errors for a field - concat err messages
					.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (v1, v2) -> v1 + "," + v2));

			return ResponseEntity.status(HttpStatus.BAD_REQUEST)// SC 400
					.body(fieldErrorMap);
		}

	

}
