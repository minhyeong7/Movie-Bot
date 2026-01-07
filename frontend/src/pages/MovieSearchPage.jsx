import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../api/movieApi";
import { IMAGE_BASE_URL } from "../api/header";

export default function MovieSearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;

    setLoading(true);
    searchMovies(keyword)
      .then((data) => setMovies(data.results ?? data))
      .finally(() => setLoading(false));
  }, [keyword]);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* 타이틀 */}
        <h1 className="text-3xl font-extrabold mb-8">
           <span className="text-red-500">"{keyword}"</span> 검색 결과
        </h1>

        {/* 로딩 */}
        {loading && (
          <p className="text-gray-400 animate-pulse">
            영화 정보를 불러오는 중...
          </p>
        )}

        {/* 결과 없음 */}
        {!loading && movies.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg mb-2">검색 결과가 없습니다 😢</p>
            <p className="text-sm">다른 키워드로 다시 검색해보세요.</p>
          </div>
        )}

        {/* 영화 그리드 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
           <Link
  key={movie.id}
  to={`/movies/${movie.id}`}
  className="group"
>
  <div className="relative w-full overflow-hidden rounded-lg">
    {/* 포스터 */}
    <img
      src={
        movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : "/no-image.png"
      }
      alt={movie.title}
      className="
        w-full
        block
        rounded-lg
        transition
        duration-300
        group-hover:scale-105
      "
    />

    {/* 오버레이 */}
    <div
      className="
        absolute inset-0
        bg-black/70
        opacity-0
        group-hover:opacity-100
        transition
        flex items-center justify-center
        px-3
        text-center
      "
    >
      <p className="text-sm font-semibold leading-snug">
        {movie.title}
      </p>
    </div>
  </div>
</Link>

          ))}
        </div>
      </div>
    </div>
  );
}
