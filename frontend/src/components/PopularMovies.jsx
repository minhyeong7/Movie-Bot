import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { fetchPopularMovies } from "../api/movieApi";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/header";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const VISIBLE = 5;
  const GAP = 16;

  const [cardW, setCardW] = useState(0);
  const [index, setIndex] = useState(0);

  /* ===================== 데이터 로드 ===================== */
  useEffect(() => {
    fetchPopularMovies().then(setMovies);
  }, []);

  /* ===================== 최대 인덱스 ===================== */
  const maxIndex = useMemo(
    () => Math.max(0, movies.length - VISIBLE),
    [movies.length]
  );

  /* ===================== 카드 너비 계산 ===================== */
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

  /* ===================== 스크롤 → 인덱스 동기화 ===================== */
  const syncIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || !step) return;

    const next = Math.round(track.scrollLeft / step);
    setIndex(Math.max(0, Math.min(maxIndex, next)));
  }, [maxIndex, step]);

  /* ===================== 이벤트 바인딩 ===================== */
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

  /* ===================== 버튼 이동 ===================== */
  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(maxIndex, i));
    setIndex(clamped);
    track.scrollTo({ left: clamped * step, behavior: "smooth" });
  };

  /* ===================== 별점 렌더 ===================== */
  const renderStars = (vote) => {
    const rating = Math.round(vote) / 2;
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className="text-yellow-400">★</span>
        ))}
        {half && <span className="text-yellow-400">☆</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className="text-gray-600">★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="text-white py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* 타이틀 */}
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-red-600 mr-3" />
          <h1 className="text-xl font-bold tracking-wide">
            인기 영화 TOP 10
          </h1>
        </div>

        <div className="relative">
          <div className="px-10">
            <div ref={viewportRef} className="overflow-hidden">
              <ul
                ref={trackRef}
                className="flex gap-4 overflow-x-auto
                           [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {movies.map((movie) => (
                  <li
                    key={movie.id}
                    className="shrink-0 bg-zinc-900 rounded-md overflow-hidden
                               hover:scale-105 transition-transform duration-200"
                    style={{ width: cardW }}
                  >
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-56 object-cover"
                      />

                      <div className="p-3 space-y-1">
                        <h2 className="text-sm font-semibold truncate">
                          {movie.title}
                        </h2>

                        {renderStars(movie.vote_average)}

                        <p className="text-xs text-gray-400 line-clamp-2">
                          {movie.overview || "줄거리 정보가 없습니다."}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 좌 버튼 */}
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2
                       text-red-600 text-2xl px-2 disabled:opacity-30"
          >
            ◀
          </button>

          {/* 우 버튼 */}
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
