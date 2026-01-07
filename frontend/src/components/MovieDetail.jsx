import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../api/movieApi";
import { IMAGE_BASE_URL } from "../api/header";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetail(id).then(setMovie);
  }, [id]);

  if (!movie) return <div className="text-white p-6">로딩중...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Link to="/" className="text-indigo-400">← 목록</Link>

      <div className="flex gap-6 mt-6">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          className="w-64 rounded"
        />

        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{movie.release_date}</p>

          <p className="mt-4">{movie.overview}</p>

          <p className="mt-2">⭐ {movie.vote_average}</p>
          <p>🎬 {movie.runtime}분</p>
          <p>
            🎭 {movie.genres?.map((g) => g.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
