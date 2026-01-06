package com.moviebot.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movies")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PostgreSQL도 보통 OK (Hibernate가 처리)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = true, length = 80)
    private String genre;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
