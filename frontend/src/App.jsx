import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieChat from "./pages/MovieChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기본 진입 시 영화 목록 */}
        <Route path="/" element={<Navigate to="/movies" />} />

        <Route path="/movies" element={<MovieList />} />
        <Route path="/chat" element={<MovieChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
