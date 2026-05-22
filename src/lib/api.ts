// File: src/lib/api.ts
import axios from "axios";

// 1. Logic phân luồng Base URL
const isServer = typeof window === "undefined";
const baseURL = isServer ? "http://localhost:3000/api/public" : "/api/proxy";

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Định nghĩa Type
export interface Slider {
  id: number;
  image_desktop: string;
  image_mobile: string;
  title: string;
  subtitle: string;
  link_url: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
  created_at: string;
}

// 3. Hàm Fetch Data - Đã fix lỗi cấu trúc mảng
export const homeApi = {
  getSliders: async (lang: string): Promise<Slider[]> => {
    const res = await api.get("/sliders", {
      params: { position: "HOME_TOP", lang },
    });
    // Trích xuất mảng an toàn dù backend bọc trong { data: [] } hay trả thẳng []
    const rawData = res.data?.data ? res.data.data : res.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  getFeaturedServices: async (lang: string): Promise<Service[]> => {
    const res = await api.get("/services", {
      params: { lang, limit: 6, sortBy: "order", order: "asc" },
    });
    const rawData = res.data?.data ? res.data.data : res.data;
    return Array.isArray(rawData) ? rawData : [];
  },

  getLatestNews: async (lang: string): Promise<News[]> => {
    const res = await api.get("/news", {
      params: { lang, limit: 3, sortBy: "created_at", order: "desc" },
    });
    const rawData = res.data?.data ? res.data.data : res.data;
    return Array.isArray(rawData) ? rawData : [];
  },
};
