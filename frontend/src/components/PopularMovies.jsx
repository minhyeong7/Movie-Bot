// src/pages/PopularMovies.jsx
import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/movieApi";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h2>🔥 인기 영화 TOP 10</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} ⭐ {movie.vote_average}
          </li>
        ))}
      </ul>
    </div>
  );
}
