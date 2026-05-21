// File: src/lib/api.ts
import axios from "axios";

export const api = axios.create({
  // Thay vì gọi thẳng localhost:3000 (gây CORS), ta gọi qua proxy của Next.js
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api/proxy",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});
