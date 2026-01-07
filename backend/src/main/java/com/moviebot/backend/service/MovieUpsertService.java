package com.moviebot.backend.service;

import com.moviebot.backend.entity.Movie;
import com.moviebot.backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MovieUpsertService {

    private final MovieRepository movieRepository;

    @Transactional
    public void clickMovie(String title) {
        Movie movie = movieRepository.findByTitle(title).orElse(null);

        if (movie == null) {
            Movie created = Movie.builder()
                    .title(title)
                    .recommendCount(1)
                    .build();
            movieRepository.save(created);
            return;
        }
        movie.increaseRecommendCount();
    }
}
