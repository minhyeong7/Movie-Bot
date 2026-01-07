package com.moviebot.backend.dto.request;

import lombok.Getter;

@Getter
public class MovieClickRequest {
    private String title;
    private Long tmdbId;
}
