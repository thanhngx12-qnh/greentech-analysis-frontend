// File: src/app/[lang]/page.tsx
import { homeApi } from "@/lib/api";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedServices from "@/components/home/FeaturedServices";
import LatestNews from "@/components/home/LatestNews";
import { Locale } from "@/i18n-config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;

  // Fetch dữ liệu song song (Parallel Data Fetching) trên Server Component
  // Nếu 1 API lỗi, bắt catch([]) để tránh làm sập toàn bộ trang chủ
  const [sliders, services, news] = await Promise.all([
    homeApi.getSliders(lang).catch(() => []),
    homeApi.getFeaturedServices(lang).catch(() => []),
    homeApi.getLatestNews(lang).catch(() => []),
  ]);

  return (
    <>
      {/* Component 1: Hero Banner Slider */}
      <HeroSlider sliders={sliders} lang={lang} />

      {/* Component 2: Danh sách Dịch vụ nổi bật */}
      <FeaturedServices services={services} lang={lang} />

      {/* Component 3: Tin tức mới nhất */}
      <LatestNews news={news} lang={lang} />
    </>
  );
}
