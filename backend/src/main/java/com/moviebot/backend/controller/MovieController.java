package com.moviebot.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.moviebot.backend.service.MovieService;
import com.moviebot.backend.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final TmdbService tmdbService;


    // 최신 인기 영화
    @GetMapping("/popular")
    public ResponseEntity<String> popularTop10() {
        return ResponseEntity.ok(tmdbService.getPopularTop10());
    }

    // 영화 상세 조회
    @GetMapping("/{movieId}")
    public String detail(@PathVariable Long movieId) {
        return tmdbService.getMovieDetail(movieId);
    }

    // TOP10 조회
    @GetMapping("/top10")
    public List<JsonNode> top10() {
        return movieService.getTop10RecommendedMovies();
    }

    // 추천 수 증가
    @PostMapping("/recommend")
    public void recommend(@RequestParam String title) {
        movieService.increaseRecommendCount(title);
    }


    // 영화 검색
    @GetMapping("/search")
    public ResponseEntity<String> searchMovies(@RequestParam String keyword) {
        return ResponseEntity.ok(tmdbService.searchMovies(keyword));
    }

}
