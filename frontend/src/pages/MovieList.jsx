// src/pages/MovieList.jsx
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/movieApi";
import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">인기 영화 TOP 10</h1>
          <Link
            to="/chat"
            className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition"
          >
            챗봇
          </Link>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {movies.map(movie => (
            <li
              key={movie.id}
              className="bg-gray-800 rounded overflow-hidden hover:scale-105 transition"
            >
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-sm text-gray-400">
                  이미지 없음
                </div>
              )}

              <div className="p-2">
                <h2 className="text-sm font-semibold truncate">
                  {movie.title}
                </h2>
                <p className="text-xs text-gray-400">
                  평점 {movie.vote_average}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
