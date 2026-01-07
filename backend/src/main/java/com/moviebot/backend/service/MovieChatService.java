package com.moviebot.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.moviebot.backend.dto.response.ChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MovieChatService {

    private final GptService gptService;
    private final TmdbService tmdbService;
    private final TmdbMapper tmdbMapper;

    public ChatResponse recommend(String userMessage, List<Map<String, String>> history) {

        // 🔥 서버에서 의미 보정 (중요)
        String normalizedMessage = normalizeUserMessage(userMessage);

        JsonNode gptJson = gptService.recommend3(normalizedMessage, history);

        // GPT error 응답
        if (gptJson.has("error")) {
            return fallback();
        }

        List<ChatResponse.RecommendedMovie> movies = new ArrayList<>();

        JsonNode arr = gptJson.path("movies");
        if (arr.isArray()) {
            for (JsonNode m : arr) {
                String title = m.path("title").asText("");
                String reason = m.path("reason").asText("");

                if (title.isBlank()) continue;

                String searchJson = tmdbService.searchMovieTop1ByTitle(title);
                JsonNode top1 = tmdbMapper.pickTop1(searchJson);
                if (top1 == null) continue;

                movies.add(ChatResponse.RecommendedMovie.builder()
                        .tmdbId(top1.path("id").asLong())
                        .title(top1.path("title").asText(title))
                        .posterPath(top1.path("poster_path").asText(null))
                        .reason(reason)
                        .build()
                );
            }
        }

        //  TMDB 매칭 실패 → 무조건 fallback
        if (movies.isEmpty()) {
            return fallback();
        }

        return ChatResponse.builder()
                .assistantMessage(
                        "내가 추천해준 영화 어때? 맘에 들면 카드를 클릭해줘! " +
                                "별로면 '별로야'라고 말해줘."
                )
                .movies(movies)
                .build();
    }

    private ChatResponse fallback() {
        return ChatResponse.builder()
                .assistantMessage("잘 알아듣질 못했어요 😥 어떤 영화를 추천해드릴까요?")
                .movies(Collections.emptyList())
                .build();
    }

    /**
     *  핵심: 애매한 문장을 GPT가 이해 가능한 문장으로 변환
     */
    private String normalizeUserMessage(String msg) {
        String m = msg.trim();

        if (m.equals("다른 영화 추천해줘") || m.equals("다른 거 추천해줘")) {
            return "이전에 추천한 영화는 제외하고 영화 3개를 다시 추천해줘";
        }

        return m;
    }
}
