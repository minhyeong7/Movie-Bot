import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 상단바 */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/movies" className="text-xl font-bold text-white">
             MovieBot
          </Link>

          <nav className="flex gap-4">
            <Link
              to="/movies"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              인기영화
            </Link>
            <Link
              to="/chat"
              className="px-3 py-1 bg-indigo-500 rounded text-sm hover:bg-indigo-600 transition"
            >
              챗봇
            </Link>
          </nav>
        </div>
      </header>

      {/* 페이지 콘텐츠 */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
