package com.moviebot.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GptService {

    @Value("${openai.api-key}")
    private String apiKey;

    @Value("${openai.base-url}")
    private String baseUrl;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper om = new ObjectMapper();

    public JsonNode recommend3(String userMessage, List<Map<String, String>> history) {
        try {
            String url = baseUrl + "/responses";

            String system = """
너는 영화 추천 챗봇이다.
사용자의 조건을 반영해서 영화 3개를 추천해라.

[애니메이션 정의]
- "애니 영화"는 극장용 애니메이션 영화를 의미한다.
- 일본 애니메이션 및 디즈니·픽사 애니메이션을 포함한다.
- TV 시리즈 극장판은 제외한다.

[출력 규칙]
- 반드시 아래 JSON 형식 중 하나로만 출력해라.
- 다른 텍스트는 절대 출력하지 마라.

[정상 응답]
{
  "movies":[
    {"title":"영화제목","reason":"추천 이유"},
    {"title":"영화제목","reason":"추천 이유"},
    {"title":"영화제목","reason":"추천 이유"}
  ]
}

[예외 응답]
{
  "error":"잘 알아듣질 못했어요."
}

[추천 규칙]
- 항상 정확히 3개의 영화만 추천해라.
- 너무 마이너한 작품은 제외해라.
- 반드시 TMDB에 존재하는 작품만 추천해라.
- 제목은 한국어 제목 우선(없으면 원제).
""";

            StringBuilder convo = new StringBuilder();
            convo.append("[SYSTEM]\n").append(system).append("\n\n");

            if (history != null) {
                for (var turn : history) {
                    convo.append("[")
                            .append(turn.getOrDefault("role", "user").toUpperCase())
                            .append("]\n")
                            .append(turn.getOrDefault("content", ""))
                            .append("\n\n");
                }
            }

            convo.append("[USER]\n").append(userMessage);

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);
            body.put("input", convo.toString());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            String raw = restTemplate.postForObject(url, entity, String.class);

            JsonNode root = om.readTree(raw);
            String text = extractOutputText(root);

            return om.readTree(text);

        } catch (Exception e) {
            // GPT가 뭔 짓을 해도 서버는 절대 죽지 않게
            return om.createObjectNode()
                    .put("error", "잘 알아듣질 못했어요.");
        }
    }

    private String extractOutputText(JsonNode root) {
        StringBuilder sb = new StringBuilder();
        JsonNode output = root.path("output");

        if (output.isArray()) {
            for (JsonNode item : output) {
                JsonNode content = item.path("content");
                if (content.isArray()) {
                    for (JsonNode c : content) {
                        String t = c.path("text").asText(null);
                        if (t != null) sb.append(t);
                    }
                }
            }
        }

        String merged = sb.toString().trim();
        if (merged.isEmpty()) {
            merged = root.path("output_text").asText("").trim();
        }
        return merged;
    }
}
