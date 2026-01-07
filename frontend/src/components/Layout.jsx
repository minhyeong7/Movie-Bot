import { Link, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname.startsWith(path)
      ? "text-white border-b-2 border-red-600"
      : "text-gray-400 hover:text-white";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 상단바 */}
      <header className="fixed top-0 w-full z-20 bg-black/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* 로고 */}
          <Link
            to="/movies"
            className="text-2xl font-extrabold tracking-wide text-red-600"
          >
            MOVIEBOT
          </Link>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-6">
            <Link
              to="/movies"
              className={`text-sm pb-1 transition ${isActive("/movies")}`}
            >
              인기영화
            </Link>

            <Link
              to="/chat"
              className="ml-4 px-4 py-1.5 bg-red-600 text-sm font-semibold
                         hover:bg-red-700 transition"
            >
              챗봇
            </Link>
          </nav>
        </div>
      </header>

      {/* 페이지 콘텐츠 */}
      <main className="pt-20 px-6">
        {children}
      </main>
    </div>
  );
}
