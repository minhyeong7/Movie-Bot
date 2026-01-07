package com.moviebot.backend.repository;

import com.moviebot.backend.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    // 추천 수 기준 상위 10개 영화 조회
    List<Movie> findTop10ByOrderByRecommendCountDesc();

    Optional<Movie> findByTitle(String title);


}
