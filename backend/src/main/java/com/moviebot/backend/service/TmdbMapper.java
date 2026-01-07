package com.moviebot.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TmdbMapper {

    private final ObjectMapper om = new ObjectMapper();

    public JsonNode pickTop1(String tmdbSearchJson) {
        try {
            JsonNode root = om.readTree(tmdbSearchJson);
            JsonNode results = root.path("results");
            if (results.isArray() && results.size() > 0) return results.get(0);
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}
