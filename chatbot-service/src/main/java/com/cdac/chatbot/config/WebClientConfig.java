package com.cdac.chatbot.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient backendWebClient(
            @Value("${backend.base-url}") String backendBaseUrl,
            @Value("${backend.timeout-ms}") int timeoutMs
    ) {
        return WebClient.builder()
                .baseUrl(backendBaseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient(timeoutMs)))
                .build();
    }

    @Bean
    public WebClient grokWebClient(@Value("${groq.timeout-ms}") int timeoutMs) {
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient(timeoutMs)))
                .build();
    }

    private HttpClient httpClient(int timeoutMs) {
        return HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, timeoutMs)
                .doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(timeoutMs, TimeUnit.MILLISECONDS)));
    }
}
