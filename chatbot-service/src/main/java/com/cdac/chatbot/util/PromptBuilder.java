package com.cdac.chatbot.util;

import com.cdac.chatbot.dto.GrokMessage;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Builds the message list sent to Grok: a system prompt carrying the
 * persona, ground rules, and live context, followed by the user's message.
 */
@Component
public class PromptBuilder {

    private static final String SYSTEM_INSTRUCTIONS = """
            You are the AI assistant for a Wedding Planner platform. You help visitors with:
            - Finding the best planner, or the best planner in a specific city, or the top-rated planner
            - Finding the cheapest package, a premium package, or packages for photography, decoration, or catering
            - Explaining the booking process, payment process, cancellation policy, and how to contact support

            Rules:
            - Answer ONLY using the data provided in the CONTEXT section below. Do not invent planners, packages, prices, or policies that aren't present in the context.
            - If the context doesn't contain the answer, say so and suggest the user browse the platform or contact support - do not guess.
            - Never mention internal IDs, emails, phone numbers, or any data source/database details.
            - Keep answers concise, friendly, and focused on wedding planning.
            """;

    public List<GrokMessage> build(String context, String userMessage) {
        String systemContent = SYSTEM_INSTRUCTIONS + "\n\nCONTEXT:\n" + context;
        return List.of(
                new GrokMessage("system", systemContent),
                new GrokMessage("user", userMessage)
        );
    }
}
