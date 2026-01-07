package com.moviebot.backend.controller;

import com.moviebot.backend.dto.request.MovieCreateRequest;
import com.moviebot.backend.dto.response.MovieResponse;
import com.moviebot.backend.entity.Movie;
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

    // 가장 많이 추천된 영화 TOP 10
    @GetMapping("/top")
    public List<MovieResponse> getTopMovies() {
        return movieService.getMostRecommendedMovies();
    }

    // 추천 수 증가 (챗봇 호출용)
    @PostMapping("/recommend")
    public void increaseRecommend(@RequestBody List<Long> movieIds) {
        movieService.increaseRecommendCount(movieIds);
    }

    // 신규 영화 등록
    @PostMapping
    public void createMovie(@RequestBody MovieCreateRequest request) {
        movieService.createMovie(request);
    }
}
