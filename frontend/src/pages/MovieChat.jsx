// src/pages/MovieChat.jsx
import { Link } from "react-router-dom";

export default function MovieChat() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">영화 추천 챗봇</h1>
          <Link
            to="/movies"
            className="text-sm text-indigo-400 hover:underline"
          >
            영화 목록으로
          </Link>
        </div>

        <div className="bg-gray-800 p-4 rounded h-96">
          <p className="text-gray-400">
            영화 추천을 대화로 받아볼 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
