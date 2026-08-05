package com.cdac.chatbot.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Mirrors the main backend's {@code ApiResponse<T>} envelope so responses
 * from the safe /api/chat/* endpoints can be deserialized directly.
 */
@Getter
@Setter
@NoArgsConstructor
public class BackendApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
}
