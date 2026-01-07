package com.moviebot.backend.dto.response;

import com.moviebot.backend.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MovieResponse {

    private Long id;
    private String title;
    private String overview;
    private String posterPath;
    private int recommendCount;

    // Entity → Response 변환
    public static MovieResponse from(Movie movie) {
        return new MovieResponse(
                movie.getId(),
                movie.getTitle(),
                movie.getOverview(),
                movie.getPosterPath(),
                movie.getRecommendCount()
        );
    }
}
