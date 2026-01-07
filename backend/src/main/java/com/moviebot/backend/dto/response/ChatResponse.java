package com.moviebot.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ChatResponse {
    private String assistantMessage; // "어때요?..."
    private List<RecommendedMovie> movies;

    @Getter
    @Builder
    public static class RecommendedMovie {
        private Long tmdbId;
        private String title;
        private String posterPath; // "/xxx.jpg"
        private String reason;     // GPT가 준 이유
    }
}
