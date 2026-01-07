import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import ChatPage from "./pages/ChatPage";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 기본 진입 */}
          <Route path="/" element={<Navigate to="/movies" />} />

          {/* 영화 목록 */}
          <Route path="/movies" element={<MainPage />} />

          {/* 영화 상세 */}
          <Route path="/movies/:id" element={<MovieDetail/>} />

          {/* 챗봇 */}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
