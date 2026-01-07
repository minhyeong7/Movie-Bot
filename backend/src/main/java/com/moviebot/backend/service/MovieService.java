package com.moviebot.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.moviebot.backend.entity.Movie;
import com.moviebot.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final TmdbService tmdbService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // TOP10 조회 (TMDB + DB recommendCount 병합)
    public List<JsonNode> getTop10RecommendedMovies() {
        List<Movie> movies = movieRepository.findTop10ByOrderByRecommendCountDesc();
        List<JsonNode> result = new ArrayList<>();

        for (Movie movie : movies) {
            try {
                String json = tmdbService.searchMovieTop1ByTitle(movie.getTitle());
                if (json == null) continue;

                JsonNode root = objectMapper.readTree(json);
                JsonNode results = root.path("results");

                if (results.isArray() && results.size() > 0 && results.get(0).isObject()) {
                    ObjectNode movieNode =
                            ((ObjectNode) results.get(0)).deepCopy();

                    //  DB 추천 수 주입
                    movieNode.put("recommendCount", movie.getRecommendCount());

                    result.add(movieNode);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    // 추천 수 증가
    @Transactional
    public void increaseRecommendCount(String title) {
        Movie movie = movieRepository.findByTitle(title)
                .orElseThrow(() -> new IllegalArgumentException("영화 없음"));

        movie.increaseRecommendCount();
    }
}
