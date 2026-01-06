package com.moviebot.backend.controller;

import com.moviebot.backend.entity.Movie;
import com.moviebot.backend.service.MovieService;
import com.moviebot.backend.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;
    private final TmdbService tmdbService;

    @GetMapping("/{id}")
    public Movie getMovie(@PathVariable Long id) {
        return movieService.getMovie(id);
    }

    @GetMapping("/popular")
    public ResponseEntity<String> popularTop10() {
        return ResponseEntity.ok(tmdbService.getPopularTop10());
    }
}
