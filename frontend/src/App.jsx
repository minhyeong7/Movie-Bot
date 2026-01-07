import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import MovieDetail from "./components/MovieDetail";
import MovieSearchPage from "./pages/MovieSearchPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  랜딩 페이지 (Layout 없음) */}
        <Route path="/" element={<LandingPage />} />

        {/*  Layout이 필요한 페이지들 */}
        <Route element={<Layout />}>
          <Route path="/movies" element={<MainPage />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/search" element={<MovieSearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
