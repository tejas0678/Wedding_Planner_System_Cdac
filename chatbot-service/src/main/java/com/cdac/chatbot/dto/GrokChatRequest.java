package com.cdac.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Request payload for Groq's Chat Completions API (OpenAI-compatible schema).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrokChatRequest {

    private String model;
    private List<GrokMessage> messages;
    private Double temperature;
}
