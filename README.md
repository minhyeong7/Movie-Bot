# MovieBot – AI 기반 영화 추천 웹 서비스

MovieBot은 **GPT 기반 대화형 추천 시스템**과 **TMDB 영화 데이터 API**를 결합한  
AI 영화 추천 웹 서비스입니다.  
사용자는 자연어로 영화 취향을 입력하고, 대화를 통해 맞춤형 영화를 추천받을 수 있습니다.

---

## 📌 프로젝트 개요

- 프로젝트명: MovieBot
- 형태: AI 기반 영화 추천 웹 서비스
- 개발 목적  
  - GPT API를 활용한 자연어 기반 추천 경험 구현  
  - 외부 API(TMDB)와의 연동 경험  
  - 프론트엔드–백엔드–AI–DB를 아우르는 풀스택 구조 이해

---

## ✨ 주요 기능

- 자연어 입력 기반 영화 추천
- GPT를 활용한 맞춤형 영화 **3개 추천**
- TMDB API 연동을 통한 영화 포스터 및 상세 정보 제공
- 사용자가 선택한 영화 데이터 저장 및 추천 횟수 누적
- 추천 횟수를 기반으로 한 Top 영화 목록 제공

---

## 🛠️ 기술 스택

### Frontend
- React (Vite)
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Axios

### Backend
- Spring Boot 
- Java 17
- Spring Web
- Spring Data JPA
- Spring Security (JWT 기반 인증 구조)
- RESTful API

### Database
- PostgreSQL
- JPA / Hibernate

### AI & External API
- OpenAI GPT API (영화 추천 로직)
- TMDB API (영화 검색, 포스터, 상세 정보)

### Deployment
- Frontend: Vercel
- Backend & Database: Render
- 환경 변수 기반 설정 (.env, application.yml)

---

## 🧩 시스템 아키텍처

[Client (React)]
↓
[Spring Boot API Server]
↓
┌─────────────────┐
│ OpenAI GPT API │ → 영화 추천 결과(JSON)
└─────────────────┘
↓
┌─────────────────┐
│ TMDB API │ → 포스터 및 영화 상세 정보
└─────────────────┘
↓
[PostgreSQL Database]


---

## 🧠 AI 추천 로직 설명

- 사용자의 입력 문장을 그대로 GPT에 전달
- 추천 결과는 **JSON 형식으로만 응답하도록 프롬프트 강제**
- 항상 3개의 영화를 추천하도록 규칙 설정
- 프론트엔드에서는 해당 JSON을 파싱하여 카드 UI로 렌더링

---



