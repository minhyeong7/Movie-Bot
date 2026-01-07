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

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white px-6 py-10">
        로딩중...
      </div>
    );
  }

  const director = movie.credits?.crew?.find(
    (p) => p.job === "Director"
  );

  const cast = movie.credits?.cast?.slice(0, 5) || [];

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const krRelease = movie.release_dates?.results?.find(
    (r) => r.iso_3166_1 === "KR"
  );
  const rating = krRelease?.release_dates?.[0]?.certification;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* 뒤로가기 */}
        <Link
          to="/movies"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← 목록으로
        </Link>

        {/* 상단 정보 */}
        <div className="flex gap-10 mt-10">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-lg shadow-2xl"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-extrabold tracking-wide">
              {movie.title}
            </h1>

            <div className="mt-3 text-sm text-gray-400 space-x-4">
              <span>{movie.release_date}</span>
              <span>{movie.runtime}분</span>
              {rating && (
                <span className="border border-gray-600 px-2 py-0.5">
                  {rating} 관람가
                </span>
              )}
            </div>

            <div className="mt-4 text-red-600 font-semibold">
              평점 {movie.vote_average}
            </div>

            <p className="mt-6 leading-relaxed text-gray-200">
              {movie.overview}
            </p>

            <div className="mt-6 space-y-2 text-sm text-gray-300">
              <p>
                <span className="text-gray-500 mr-2">장르</span>
                {movie.genres?.map((g) => g.name).join(", ")}
              </p>
              {director && (
                <p>
                  <span className="text-gray-500 mr-2">감독</span>
                  {director.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 출연진 */}
        {cast.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center mb-5">
              <div className="w-1.5 h-6 bg-red-600 mr-3" />
              <h2 className="text-2xl font-bold">출연진</h2>
            </div>

            <div className="flex gap-6 overflow-x-auto">
              {cast.map((actor) => (
                <div key={actor.id} className="w-28 flex-shrink-0">
                  {actor.profile_path && (
                    <img
                      src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded-md"
                    />
                  )}
                  <p className="mt-2 text-sm font-medium">
                    {actor.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 예고편 */}
        {trailer && (
          <section className="mt-16">
            <div className="flex items-center mb-5">
              <div className="w-1.5 h-6 bg-red-600 mr-3" />
              <h2 className="text-2xl font-bold">예고편</h2>
            </div>

            <div className="aspect-video max-w-4xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="w-full h-full rounded-lg border border-zinc-800"
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
