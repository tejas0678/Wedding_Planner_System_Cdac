package com.cdac.chatbot.service;

import com.cdac.chatbot.client.BackendClient;
import com.cdac.chatbot.dto.ChatRequest;
import com.cdac.chatbot.dto.ChatResponse;
import com.cdac.chatbot.dto.FaqDTO;
import com.cdac.chatbot.dto.GrokMessage;
import com.cdac.chatbot.dto.PackageDTO;
import com.cdac.chatbot.dto.PlannerDTO;
import com.cdac.chatbot.util.ChatContextBuilder;
import com.cdac.chatbot.util.PromptBuilder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

/**
 * Orchestrates a single chat turn: fetch safe context from the main
 * backend, build the prompt, and delegate to Grok for the answer.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final BackendClient backendClient;
    private final ChatContextBuilder chatContextBuilder;
    private final PromptBuilder promptBuilder;
    private final GrokAIService grokAIService;

    public ChatResponse handleChat(ChatRequest request) {
        String sessionId = StringUtils.hasText(request.getSessionId())
                ? request.getSessionId()
                : UUID.randomUUID().toString();

        log.info("Handling chat message for session {}", sessionId);

        List<PlannerDTO> planners = backendClient.getPlanners();
        List<PackageDTO> packages = backendClient.getPackages();
        List<FaqDTO> faqs = backendClient.getFaqs();

        String context = chatContextBuilder.build(planners, packages, faqs);
        List<GrokMessage> messages = promptBuilder.build(context, request.getMessage());

        String reply = grokAIService.getCompletion(messages);

        return ChatResponse.of(reply, sessionId);
    }
}
