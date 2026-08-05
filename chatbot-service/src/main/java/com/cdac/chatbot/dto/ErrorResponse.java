package com.cdac.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {

    @Builder.Default
    private boolean success = false;
    private String message;
    private Object details;

    public static ErrorResponse of(String message) {
        return ErrorResponse.builder().message(message).build();
    }
}
