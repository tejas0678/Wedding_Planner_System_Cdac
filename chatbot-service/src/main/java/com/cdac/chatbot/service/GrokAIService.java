package com.cdac.chatbot.service;

import com.cdac.chatbot.dto.GrokChatRequest;
import com.cdac.chatbot.dto.GrokChatResponse;
import com.cdac.chatbot.dto.GrokMessage;
import com.cdac.chatbot.exception.GrokApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.net.URI;
import java.time.Duration;
import java.util.List;

/**
 * Talks to Groq's OpenAI-compatible Chat Completions API. The API key is
 * read from an environment variable only - it is never hardcoded or logged.
 */
@Slf4j
@Service
public class GrokAIService {

    private final WebClient grokWebClient;
    private final String apiUrl;
    private final String apiKey;
    private final String model;
    private final long timeoutMs;

    public GrokAIService(
            WebClient grokWebClient,
            @Value("${groq.api-url}") String apiUrl,
            @Value("${groq.api-key}") String apiKey,
            @Value("${groq.model}") String model,
            @Value("${groq.timeout-ms}") long timeoutMs
    ) {
        this.grokWebClient = grokWebClient;
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.model = model;
        this.timeoutMs = timeoutMs;
    }

    public String getCompletion(List<GrokMessage> messages) {
        if (apiKey == null || apiKey.isBlank()) {
            log.error("GROQ_API_KEY is not configured");
            throw new GrokApiException("AI service is not configured. Missing Groq API key.");
        }

        GrokChatRequest request = new GrokChatRequest(model, messages, 0.3);

        try {
            GrokChatResponse response = grokWebClient.post()
                    .uri(URI.create(apiUrl))
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(GrokChatResponse.class)
                    .timeout(Duration.ofMillis(timeoutMs))
                    .block();

            if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
                throw new GrokApiException("Groq returned an empty response");
            }

            String content = response.getChoices().get(0).getMessage().getContent();
            if (content == null || content.isBlank()) {
                throw new GrokApiException("Groq returned an empty message");
            }
            return content.trim();
        } catch (WebClientResponseException ex) {
            log.error("Groq request failed with status {}: {}", ex.getStatusCode(), ex.getResponseBodyAsString());
            throw new GrokApiException("Groq request failed with status " + ex.getStatusCode(), ex);
        } catch (GrokApiException ex) {
            throw ex;
        } catch (Exception ex) {
            log.error("Unexpected error calling Groq", ex);
            throw new GrokApiException("Unexpected error calling Groq", ex);
        }
    }
}
