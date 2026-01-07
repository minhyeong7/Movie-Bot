import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-white">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/d13e2d55-5cdd-48c0-a55b-4b292d0b9889/web/KR-ko-20251229-TRIFECTA-perspective_fddea74d-f34c-4b03-ba19-a4d78e39c46a_large.jpg')",
        }}
      />

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 상단 바 */}
      <header className="relative z-10 flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-wide">
          MOVIEBOT
        </h1>

        <button
          
          className="px-5 py-2 bg-red-600 rounded text-sm font-semibold hover:bg-red-700 transition"
        >
          로그인
        </button>
      </header>

      {/* 중앙 콘텐츠 */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-24">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          영화, 시리즈 등을<br />
          <span className="text-white">무비봇에서</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mb-3">
          최신 영화와 인기 작품을 한 곳에서
        </p>

        <p className="text-sm text-gray-300 mb-8">
          지금 시작하고 추천 영화를 만나보세요.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="
            flex items-center gap-2
            px-10 py-4
            bg-red-600
            rounded
            text-xl
            font-bold
            hover:bg-red-700
            transition
            active:scale-95
          "
        >
          시작하기
        </button>
      </main>
    </div>
  );
}
