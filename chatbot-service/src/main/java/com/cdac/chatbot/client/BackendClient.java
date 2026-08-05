package com.cdac.chatbot.client;

import com.cdac.chatbot.dto.BackendApiResponse;
import com.cdac.chatbot.dto.FaqDTO;
import com.cdac.chatbot.dto.PackageDTO;
import com.cdac.chatbot.dto.PlannerDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

/**
 * Calls the main Wedding Planner backend's public /api/chat/* endpoints only.
 * This is the sole way chatbot-service ever obtains domain data - it never
 * touches MySQL, repositories, or entities directly.
 *
 * <p>Failures degrade gracefully: an empty list is returned and logged so a
 * single flaky upstream call doesn't take down the whole chat response.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class BackendClient {

    private final WebClient backendWebClient;

    public List<PlannerDTO> getPlanners() {
        return fetch("/api/planners", new ParameterizedTypeReference<>() {});
    }

    public List<PackageDTO> getPackages() {
        return fetch("/api/packages", new ParameterizedTypeReference<>() {});
    }

    public List<FaqDTO> getFaqs() {
        return fetch("/api/faqs", new ParameterizedTypeReference<>() {}); // Returns empty list if endpoint missing
    }

    private <T> List<T> fetch(String path, ParameterizedTypeReference<BackendApiResponse<List<T>>> type) {
        try {
            BackendApiResponse<List<T>> response = backendWebClient.get()
                    .uri(path)
                    .retrieve()
                    .bodyToMono(type)
                    .timeout(Duration.ofSeconds(5))
                    .block();
            return response != null && response.getData() != null ? response.getData() : List.of();
        } catch (Exception ex) {
            log.warn("Backend call to {} failed, continuing without this context: {}", path, ex.getMessage());
            return List.of();
        }
    }
}
