import PopularMovies from "../components/PopularMovies";
import RecommendedMovies from "../components/RecommendedMovies";


export default function MainPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* 기존 인기 영화 (TMDB 기준 등) */}
      <PopularMovies />

      {/* 추천 수 기준 인기 영화 TOP 10 */}
      <RecommendedMovies />
    </div>
  );
}
