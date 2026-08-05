package com.cdac.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {

    private String reply;
    private String sessionId;

    public static ChatResponse of(String reply, String sessionId) {
        return ChatResponse.builder().reply(reply).sessionId(sessionId).build();
    }
}
