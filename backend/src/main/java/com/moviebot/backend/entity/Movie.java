package com.moviebot.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "movie")
@Getter
@NoArgsConstructor
public class Movie {

    // PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 영화 제목
    @Column(nullable = false)
    private String title;

    // 영화 간단 설명
    @Column(length = 500)
    private String overview;

    // TMDB poster_path 값 (/xxxx.jpg)
    @Column(nullable = false)
    private String posterPath;

    // 추천 누적 횟수
    @Column(nullable = false)
    private int recommendCount;

    // 생성 시각
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // 엔티티 최초 저장 시 자동 세팅
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // 신규 영화 생성용 생성자
    // 신규 영화는 추천 수 0부터 시작
    public Movie(String title, String overview, String posterPath) {
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
        this.recommendCount = 0;
    }

    // 추천 횟수 증가
    // 외부에서 직접 set 하지 않도록 메서드로만 제어
    public void increaseRecommendCount() {
        this.recommendCount++;
    }
}
