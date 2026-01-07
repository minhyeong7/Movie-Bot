package com.moviebot.backend.service;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class TmdbService {

    @Value("${tmdb.api-key}")
    private String apiKey;

    @Value("${tmdb.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    // 최신 인기영화 TOP10
    public String getPopularTop10() {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/popular")
                .queryParam("api_key", apiKey)
                .queryParam("language", "ko-KR")
                .queryParam("page", 1)
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
    // 최신 인기영화 상세 조회
    public String getMovieDetail(Long movieId) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/movie/" + movieId)
                .queryParam("api_key", apiKey)
                .queryParam("language", "ko-KR")
                .toUriString();

        return restTemplate.getForObject(url, String.class);
    }
}

