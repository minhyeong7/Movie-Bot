import { useEffect, useMemo, useRef, useState } from "react";
import { fetchChatStart, fetchRecommend, clickMovie } from "../api/chatApi";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

export default function ChatPage() {
  /**
   * messages 구조
   * - user / assistant : 일반 채팅
   * - recommend        : 추천 카드 (채팅의 한 종류)
   */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // 백엔드로 보낼 대화 히스토리 (recommend 제외)
  const historyForBackend = useMemo(() => {
    return messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));
  }, [messages]);

  // 최초 인사
  useEffect(() => {
    fetchChatStart().then((data) => {
      setMessages([{ role: "assistant", content: data.message }]);
    });
  }, []);

  // 항상 최신 메시지로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setLoading(true);

    // 사용자 메시지 추가
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const res = await fetchRecommend(text, historyForBackend);

      // assistant 메시지 + 추천 카드 메시지를 "순서대로" 추가
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.assistantMessage },
        {
          role: "recommend",
          movies: res.movies || [],
        },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "잠깐 문제가 생겼어. 다시 말해줄래?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onClickMovie = async (movie) => {
    try {
      await clickMovie(movie.title, movie.tmdbId);

      // 저장 결과도 채팅 메시지로 추가 (추천 카드 위치는 그대로)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `좋아! "${movie.title}"를 저장했어. 더 추천받을래? 😎`,
        },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "저장에 실패했어… 다시 클릭해줄래?",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Chat area */}
        <div className="space-y-4">
          {messages.map((m, idx) => {
            // 일반 채팅 (user / assistant)
            if (m.role === "user" || m.role === "assistant") {
              return (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed ${
                      m.role === "user"
                        ? "bg-red-600/90"
                        : "bg-white/10 border border-white/10"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            }

            // 추천 카드 메시지
            if (m.role === "recommend") {
              return (
                <div key={idx} className="mt-6">
                  <div className="text-white/70 mb-3">
                    추천 3개 (클릭하면 저장)
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {m.movies.map((movie) => (
                      <button
                        key={movie.tmdbId}
                        onClick={() => onClickMovie(movie)}
                        className="text-left rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition"
                      >
                        <div className="aspect-[2/3] bg-white/5">
                          {movie.posterPath ? (
                            <img
                              src={`${IMAGE_BASE_URL}${movie.posterPath}`}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/40">
                              NO IMAGE
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="font-bold line-clamp-1">
                            {movie.title}
                          </div>
                          <div className="text-white/70 text-sm mt-2 line-clamp-3">
                            {movie.reason}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/10 rounded-2xl px-4 py-3 text-white/70">
                추천 고르는 중...
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="mt-8 sticky bottom-0 pb-6 bg-gradient-to-t from-black via-black/95 to-transparent">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="예: 톰 크루즈 나오는 최신 액션, 가볍게 볼 거"
              className="flex-1 rounded-2xl px-4 py-3 bg-white/10 border border-white/10 outline-none focus:border-white/30"
            />
            <button
              onClick={send}
              className="px-6 rounded-2xl bg-red-600 hover:bg-red-500 transition font-bold"
            >
              보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
