package com.moviebot.backend.repository;

import com.moviebot.backend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findTop3ByGenreOrderByCreatedAtDesc(String genre);
}
