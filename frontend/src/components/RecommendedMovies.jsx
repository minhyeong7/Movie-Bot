import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { fetchTopMovies } from "../api/movieApi";
import { IMAGE_BASE_URL } from "../api/header";

export default function RecommendedMovies() {
  const [movies, setMovies] = useState([]);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const VISIBLE = 5;      // 화면에 딱 5개
  const GAP = 16;         // gap-4 = 16px
  const SIDE_PAD = 48;    // 좌우 버튼 공간

  const [cardW, setCardW] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchTopMovies().then(setMovies);
  }, []);

  const maxIndex = useMemo(() => {
    return Math.max(0, movies.length - VISIBLE);
  }, [movies.length]);

  // viewport 크기 기준으로 카드 너비 계산
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

    const onScroll = () => syncIndexFromScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [syncIndexFromScroll]);

  const goTo = useCallback(
    (nextIndex) => {
      const track = trackRef.current;
      if (!track || !step) return;

      const clamped = Math.max(0, Math.min(maxIndex, nextIndex));
      setIndex(clamped);
      track.scrollTo({ left: clamped * step, behavior: "smooth" });
    },
    [maxIndex, step]
  );

  const canLeft = index > 0;
  const canRight = index < maxIndex;

  return (
    <div className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          챗봇 추천 영화 TOP 10
        </h2>

        <div className="relative">
          {/* 버튼 공간 확보 */}
          <div className="px-12">
            <div ref={viewportRef} className="overflow-hidden">
              <ul
                ref={trackRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
                           [scrollbar-width:none] [-ms-overflow-style:none]
                           [&::-webkit-scrollbar]:hidden"
              >
                {movies.map((movie, idx) => (
                  <li
                    key={movie.id}
                    className="shrink-0 snap-start bg-gray-800 rounded overflow-hidden"
                    style={{
                      width: cardW ? `${cardW}px` : undefined,
                    }}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}${movie.posterPath}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />

                    <div className="p-3">
                      <p className="text-sm text-gray-400 mb-1">
                        {idx + 1}위
                      </p>

                      <h3 className="text-sm font-semibold truncate">
                        {movie.title}
                      </h3>

                      <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                        {movie.overview}
                      </p>

                      <p className="text-xs text-gray-500 mt-2">
                        추천 수 {movie.recommendCount}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Left */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={!canLeft}
            aria-label="이전"
            className={`absolute left-0 top-1/2 -translate-y-1/2
                        h-10 w-10 rounded-full flex items-center justify-center
                        bg-black/50 hover:bg-black/70 transition
                        ${!canLeft ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            ‹
          </button>

          {/* Right */}
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={!canRight}
            aria-label="다음"
            className={`absolute right-0 top-1/2 -translate-y-1/2
                        h-10 w-10 rounded-full flex items-center justify-center
                        bg-black/50 hover:bg-black/70 transition
                        ${!canRight ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
