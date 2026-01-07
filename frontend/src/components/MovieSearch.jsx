import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MovieSearch() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <div className="mb-6 w-1/2 mx-auto">
      <form
        onSubmit={handleSearch}
        className="
          flex items-center gap-2
          bg-black/80
          border border-gray-700
          rounded-full
          px-5 py-3
          shadow-md
          focus-within:border-white
          transition
        "
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="영화 검색"
          className="
            flex-1
            bg-transparent
            text-white
            placeholder-gray-400
            px-4
            py-2
            outline-none
            text-md
            tracking-wide
          "
        />

        <button
          type="submit"
          className="
            px-6 py-3
            rounded-full
            bg-red-600
            text-white
            text-sm
            font-semibold
            tracking-wide
            hover:bg-red-700
            active:scale-95
            transition
          "
        >
          검색
        </button>
      </form>
    </div>
  );
}
