import axios from "axios";

const api = axios.create({
  baseURL: "",
});

api.interceptors.request.use((config) => {
  // Debug logging for developers
  const fullUrl = config.url;
  console.log(`[API Request] ${config.method?.toUpperCase()} ${fullUrl}`);
  
  const token = localStorage.getItem("foryouscale_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
