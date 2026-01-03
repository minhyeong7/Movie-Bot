package com.moviebot.backend.repository;

import com.moviebot.backend.entity.TestMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestMessageRepository
        extends JpaRepository<TestMessage, Long> {
}

