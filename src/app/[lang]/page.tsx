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

  // Gọi API và bắt lỗi chi tiết in ra Terminal để Debug
  const [sliders, services, news] = await Promise.all([
    homeApi.getSliders(lang).catch((err) => {
      console.error("❌ Lỗi API Sliders:", err.message);
      return [];
    }),
    homeApi.getFeaturedServices(lang).catch((err) => {
      console.error("❌ Lỗi API Services:", err.message);
      return [];
    }),
    homeApi.getLatestNews(lang).catch((err) => {
      console.error("❌ Lỗi API News:", err.message);
      return [];
    }),
  ]);

  // Log kiểm tra số lượng dữ liệu lấy được trên Terminal
  console.log(`✅ Đã fetch dữ liệu trang chủ (Ngôn ngữ: ${lang}):`, {
    sliders: sliders.length,
    services: services.length,
    news: news.length,
  });

  return (
    <>
      {/* HeroSlider vẫn cần lang vì đang dùng thẻ <a> thường */}
      <HeroSlider sliders={sliders} lang={lang} />

      {/* Đã bỏ prop lang vì component mới dùng Object Routing của next-intl */}
      <FeaturedServices services={services} />

      {/* Đã bỏ prop lang vì component mới dùng Object Routing của next-intl */}
      <LatestNews news={news} />
    </>
  );
}
