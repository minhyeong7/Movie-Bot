package com.moviebot.backend.dto.request;

import lombok.Getter;
import java.util.List;

@Getter
public class ChatRequest {
    private String message;              // 유저 입력
    private List<ChatTurn> history;      // 프론트가 들고 있던 대화 이력(선택)

    @Getter
    public static class ChatTurn {
        private String role;   // "user" | "assistant"
        private String content;
    }
}
