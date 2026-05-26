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

// 2. Định nghĩa Type cho Dữ liệu
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
  price?: number;
  currency?: string;
  duration?: string;
  featured_image?: string;
  author?: { full_name: string };
}

// Bổ sung Interface cho trang Chi tiết Dịch vụ theo API Docs
export interface ServiceDetail extends Service {
  content: string; // Nội dung bài viết
  // Bản đồ slug để chuyển đổi đa ngôn ngữ (Zustand mapping)
  translations: { locale: string; slug: string }[];
}

export interface News {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
  created_at: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// 3. Các hàm Fetch API
export const homeApi = {
  getSliders: async (lang: string): Promise<Slider[]> => {
    const res = await api.get("/sliders", {
      params: { position: "HOME_TOP", lang },
    });
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

export const servicesApi = {
  // Lấy danh sách có phân trang
  getServices: async (
    lang: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Service>> => {
    const res = await api.get("/services", {
      params: { lang, page, limit, sortBy: "order", order: "asc" },
    });
    return res.data; // Trả về dạng { data: [...], meta: {...} }
  },
  // Lấy chi tiết bằng Slug
  getServiceBySlug: async (
    slug: string,
    lang: string,
  ): Promise<ServiceDetail> => {
    const res = await api.get(`/services/${slug}`, { params: { lang } });
    return res.data?.data ? res.data.data : res.data;
  },
};
