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

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
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
    return () => track.removeEventListener("scroll", syncIndexFromScroll);
  }, [syncIndexFromScroll]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(maxIndex, i));
    setIndex(clamped);
    track.scrollTo({ left: clamped * step, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">인기 영화 TOP 10</h1>
          <Link to="/chat" className="px-4 py-2 bg-indigo-500 rounded">
            챗봇
          </Link>
        </div>

        <div className="relative">
          <div className="px-12">
            <div ref={viewportRef} className="overflow-hidden">
              <ul
                ref={trackRef}
                className="flex gap-4 overflow-x-auto
                           [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {movies.map((movie) => (
                  <li
                    key={movie.id}
                    className="shrink-0 bg-gray-800 rounded overflow-hidden"
                    style={{ width: cardW }}
                  >
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-2">
                        <h2 className="text-sm font-semibold truncate">
                          {movie.title}
                        </h2>
                        <p className="text-xs text-gray-400">
                          평점 {movie.vote_average}
                        </p>
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
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            ◀
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
