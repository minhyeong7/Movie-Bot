// src/api/movieApi.js
import axios from "axios";
import { BASE_URL } from "./header";


export const fetchPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/api/movies/popular`);
  return res.data.results.slice(0, 10);
};
