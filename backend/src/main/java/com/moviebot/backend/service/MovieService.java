package com.moviebot.backend.service;

import com.moviebot.backend.dto.request.MovieCreateRequest;
import com.moviebot.backend.dto.response.MovieResponse;
import com.moviebot.backend.entity.Movie;
import com.moviebot.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    // 가장 많이 추천된 영화 목록
    @Transactional(readOnly = true)
    public List<MovieResponse> getMostRecommendedMovies() {
        return movieRepository.findTop10ByOrderByRecommendCountDesc()
                .stream()
                .map(MovieResponse::from)
                .toList();
    }

    // 추천 수 증가
    @Transactional
    public void increaseRecommendCount(List<Long> movieIds) {
        List<Movie> movies = movieRepository.findAllById(movieIds);
        for (Movie movie : movies) {
            movie.increaseRecommendCount();
        }
    }

    // 신규 영화 등록
    @Transactional
    public void createMovie(MovieCreateRequest request) {
        Movie movie = new Movie(
                request.getTitle(),
                request.getOverview(),
                request.getPosterPath()
        );
        movieRepository.save(movie);
    }
}
