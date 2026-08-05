package com.cdac.chatbot.exception;

/**
 * Thrown when the Groq API call fails or returns an unusable response.
 */
public class GrokApiException extends RuntimeException {

    public GrokApiException(String message) {
        super(message);
    }

    public GrokApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
