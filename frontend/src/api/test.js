const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = (url, options = {}) => {
  return fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
};
