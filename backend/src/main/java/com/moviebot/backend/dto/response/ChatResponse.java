package com.moviebot.backend.dto.response;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class ChatResponse {
    private String reply;              // GPT 설명 문구
    private List<MovieResponse> movies; // 추천 영화 3개
}
