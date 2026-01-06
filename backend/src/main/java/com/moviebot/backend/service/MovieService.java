package com.moviebot.backend.service;

import com.moviebot.backend.dto.response.MovieResponse;
import com.moviebot.backend.entity.Movie;
import com.moviebot.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<MovieResponse> recommendByGenre(String genre) {

        List<Movie> movies = movieRepository
                .findTop3ByGenreOrderByCreatedAtDesc(genre);

        if (movies.isEmpty()) {
            throw new IllegalArgumentException("추천할 영화가 없습니다.");
        }

        return movies.stream()
                .map(m -> MovieResponse.builder()
                        .id(m.getId())
                        .title(m.getTitle())
                        .genre(m.getGenre())
                        .build())
                .toList();
    }

    public Movie getMovie(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 영화가 존재하지 않습니다."));
    }
}

