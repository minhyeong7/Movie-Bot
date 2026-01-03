package com.moviebot.backend.controller;

import com.moviebot.backend.entity.TestMessage;
import com.moviebot.backend.repository.TestMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")

public class TestController {

    private final TestMessageRepository repository;

    public TestController(TestMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Map<String, String> body) {
        String content = body.get("content");
        repository.save(new TestMessage(null, content));
        return ResponseEntity.ok("saved");
    }
}

