import { Link, useLocation, Outlet } from "react-router-dom";

export default function Layout() {
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
              
               className="px-5 py-2 bg-red-600 rounded text-sm font-semibold hover:bg-red-700 transition"
            >
              로그인
            </Link>

            <Link
              to="/chat"
               className="px-5 py-2 bg-red-600 rounded text-sm font-semibold hover:bg-red-700 transition"
            >
              무비봇
            </Link>
          </nav>
        </div>
      </header>

      {/* 페이지 콘텐츠 */}
      <main className="pt-20 px-6">
        <Outlet />
      </main>
    </div>
  );
}
