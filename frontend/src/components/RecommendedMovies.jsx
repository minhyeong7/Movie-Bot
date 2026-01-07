import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { fetchTopMovies } from "../api/movieApi";
import { IMAGE_BASE_URL } from "../api/header";
import { Link } from "react-router-dom";

export default function RecommendedMovies() {
  const [movies, setMovies] = useState([]);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const VISIBLE = 5;
  const GAP = 16;

  const [cardW, setCardW] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchTopMovies().then(setMovies);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, movies.length - VISIBLE),
    [movies.length]
  );

  useEffect(() => {
    if (!viewportRef.current) return;

    const el = viewportRef.current;
    const ro = new ResizeObserver(() => {
      const width = el.clientWidth;
      const w = (width - GAP * (VISIBLE - 1)) / VISIBLE;
      setCardW(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const step = useMemo(() => cardW + GAP, [cardW]);

  const syncIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || !step) return;
    const next = Math.round(track.scrollLeft / step);
    setIndex(Math.max(0, Math.min(maxIndex, next)));
  }, [maxIndex, step]);

 useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncIndexFromScroll, { passive: true });

    //  핵심 수정 부분
    // 세로 스크롤(deltaY)은 허용 → 페이지 스크롤 정상
    // 가로 스크롤(deltaX)만 캐러셀에서 제어
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      track.removeEventListener("scroll", syncIndexFromScroll);
      track.removeEventListener("wheel", handleWheel);
    };
  }, [syncIndexFromScroll]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(maxIndex, i));
    setIndex(clamped);
    track.scrollTo({ left: clamped * step, behavior: "smooth" });
  };

  const renderStars = (vote) => {
    const rating = Math.round(vote) / 2;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className="text-yellow-400 text-sm">★</span>
        ))}
        {half && <span className="text-yellow-400 text-sm">☆</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className="text-gray-600 text-sm">★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-red-600 mr-3" />
          <h2 className="text-xl font-bold tracking-wide">
            무비봇 가장 많이 추천된 영화 TOP 10
          </h2>
        </div>

        <div className="relative">
          <div className="px-10">
            <div ref={viewportRef} className="overflow-hidden">
              <ul
                ref={trackRef}
                className="flex gap-4 overflow-x-auto
                           [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {movies.map((movie, idx) => (
                  <li
                    key={movie.id}
                    className="shrink-0 bg-zinc-900 rounded-md overflow-hidden
                               hover:scale-105 transition-transform duration-200"
                    style={{ width: cardW }}
                  >
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={
                          movie.poster_path
                            ? `${IMAGE_BASE_URL}${movie.poster_path}`
                            : "/no-poster.png"
                        }
                        alt={movie.title}
                        className="w-full h-56 object-cover"
                        loading="lazy"
                      />

                      <div className="p-3 space-y-1">
                        <p className="text-xs text-red-500 font-semibold">
                          TOP {idx + 1}
                        </p>

                        <h3 className="text-sm font-semibold truncate">
                          {movie.title}
                        </h3>

                        {renderStars(movie.vote_average)}

                        <p className="text-xs text-gray-400 line-clamp-2">
                          {movie.overview}
                        </p>

                        <div className="mt-2">
                          <span
                            className="inline-block text-xs font-semibold
                                       px-2 py-0.5
                                       bg-red-600/20 text-red-400
                                       border border-red-600/40"
                          >
                            추천 {movie.recommendCount}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2
                       text-red-600 text-2xl px-2 disabled:opacity-30"
          >
            ◀
          </button>

          <button
            onClick={() => goTo(index + 1)}
            disabled={index === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2
                       text-red-600 text-2xl px-2 disabled:opacity-30"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
