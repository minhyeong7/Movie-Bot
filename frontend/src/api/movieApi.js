// src/api/movieApi.js
import axios from "axios";
import { BASE_URL } from "./header";


// 최신 인기 영화 TOP 10
export const fetchPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/api/movies/popular`);
  return res.data.results.slice(0, 10);
};

// 사용자에게 추천된 TOP 10 영화 조회
export const fetchTopMovies = async () => {
  const response = await axios.get(`${BASE_URL}/api/movies/top10`);
  return response.data;
};

export async function recommendMovie(title) {
  await fetch(`${BASE_URL}/api/movies/recommend?title=${encodeURIComponent(title)}`, {
    method: "POST",
  });
}


// 영화 상세조회
export const fetchMovieDetail = async (id) => {
  const res = await axios.get(`${BASE_URL}/api/movies/${id}`);
  return res.data;
};

// 영화 검색
export async function searchMovies(keyword) {
  if (!keyword.trim()) return [];

  const res = await fetch(
    `${BASE_URL}/api/movies/search?keyword=${encodeURIComponent(keyword)}`
  );

  if (!res.ok) {
    throw new Error("영화 검색 실패");
  }

  return res.json();
}
