package com.moviebot.backend.dto.request;



import lombok.Getter;

@Getter
public class MovieCreateRequest {

    private String title;
    private String overview;
    private String posterPath;
}

