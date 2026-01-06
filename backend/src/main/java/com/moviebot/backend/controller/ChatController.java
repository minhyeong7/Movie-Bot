package com.moviebot.backend.controller;

import com.moviebot.backend.dto.request.ChatRequest;
import com.moviebot.backend.dto.response.ChatResponse;
import com.moviebot.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatService.chat(request);
    }
}
