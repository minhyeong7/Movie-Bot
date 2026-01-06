package com.moviebot.backend.service;

import com.moviebot.backend.dto.request.ChatRequest;
import com.moviebot.backend.dto.response.ChatResponse;
import com.moviebot.backend.dto.response.MovieResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final MovieService movieService;

    public ChatResponse chat(ChatRequest request) {

        // ZGPT 분석 (예시는 단순 키워드 추출)
        String genre = extractGenre(request.getMessage());

        //  영화 추천
        List<MovieResponse> movies = movieService.recommendByGenre(genre);

        //  응답 구성
        return ChatResponse.builder()
                .reply("이 중에서 마음에 드는 영화가 있나요? 😊")
                .movies(movies)
                .build();
    }

    private String extractGenre(String message) {
        if (message.contains("로맨스")) return "로맨스";
        if (message.contains("액션")) return "액션";
        return "기타";
    }
}
