import axios from "axios";

import { BASE_URL } from "./header";

export async function fetchChatStart() {
  const { data } = await axios.get(`${BASE_URL}/api/chat/start`);
  return data;
}

export async function fetchRecommend(message, history) {
  const { data } = await axios.post(`${BASE_URL}/api/chat/recommend`, {
    message,
    history,
  });
  return data;
}

export async function clickMovie(title, tmdbId) {
  const { data } = await axios.post(`${BASE_URL}/api/chat/click`, {
    title,
    tmdbId,
  });
  return data;
}
