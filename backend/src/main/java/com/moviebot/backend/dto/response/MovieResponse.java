package com.moviebot.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MovieResponse {
    private Long id;
    private String title;
    private String genre;
}
