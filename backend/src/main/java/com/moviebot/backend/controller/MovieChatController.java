package com.moviebot.backend.controller;

import com.moviebot.backend.dto.request.ChatRequest;
import com.moviebot.backend.dto.request.MovieClickRequest;
import com.moviebot.backend.dto.response.ChatResponse;
import com.moviebot.backend.service.MovieChatService;
import com.moviebot.backend.service.MovieUpsertService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class MovieChatController {

    private final MovieChatService movieChatService;
    private final MovieUpsertService movieUpsertService;

    @GetMapping("/start")
    public Map<String, String> start() {
        return Map.of("message", "어떤 영화를 추천해드릴까요?");
    }

    @PostMapping("/recommend")
    public ChatResponse recommend(@RequestBody ChatRequest req) {
        List<Map<String, String>> history = new ArrayList<>();
        if (req.getHistory() != null) {
            for (var t : req.getHistory()) {
                history.add(Map.of(
                        "role", t.getRole(),
                        "content", t.getContent()
                ));
            }
        }
        return movieChatService.recommend(req.getMessage(), history);
    }

    @PostMapping("/click")
    public Map<String, String> click(@RequestBody MovieClickRequest req) {
        movieUpsertService.clickMovie(req.getTitle());
        return Map.of("result", "ok");
    }
}
