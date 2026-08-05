package com.cdac.chatbot.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequest {

    @NotBlank(message = "message must not be blank")
    @Size(max = 1000, message = "message must be at most 1000 characters")
    private String message;

    private String sessionId;
}
