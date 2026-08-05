package com.cdac.chatbot.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FaqDTO {

    private String topic;
    private String question;
    private String answer;
}
