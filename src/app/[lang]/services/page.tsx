// File: src/app/[lang]/services/page.tsx
import Image from "next/image";
import { Link } from "@/navigation";
import { servicesApi } from "@/lib/api";
import { Locale } from "@/i18n-config";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Services" });

  return {
    title: `${t("title")} | Greentech Analysis`,
    // Google sẽ lấy đoạn SEO này làm Meta Description luôn, cực kỳ chuẩn bài!
    description: t("seoDescription"),
  };
}

export default async function ServicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;

  setRequestLocale(lang);

  const t = await getTranslations("Services");
  const homeT = await getTranslations("Home");

  const currentPage =
    typeof resolvedSearchParams.page === "string"
      ? parseInt(resolvedSearchParams.page)
      : 1;

  const { data: services, meta } = await servicesApi
    .getServices(lang, currentPage, 9)
    .catch((err) => {
      console.error("❌ Lỗi API Danh sách Dịch vụ:", err.message);
      return { data: [], meta: { total: 0, page: 1, limit: 9, totalPages: 0 } };
    });

  const totalPages = meta?.totalPages || 0;

  return (
    <div className="flex flex-col gap-24">
      {/* Header Section (ĐÃ NÂNG CẤP CHUẨN SEO) */}
      <section className="flex flex-col items-center text-center gap-8 bg-surface-variant/20 py-24 px-6 rounded-xl border border-surface-variant relative overflow-hidden">
        {/* Lớp hạt nhiễu trang trí nền */}
        <div className="grainy-overlay opacity-50"></div>

        <div className="relative z-10 flex flex-col items-center gap-4">
          <h1 className="font-display-xl text-5xl md:text-7xl text-on-background reveal-up active">
            {t("title")}
          </h1>
          <p
            className="font-headline-md text-xl md:text-2xl text-primary font-bold reveal-up active"
            style={{ transitionDelay: "0.1s" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Đoạn Text SEO - Rộng hơn để chứa nhiều từ khóa, màu text nhạt hơn để không lấn át H1 */}
        <p
          className="relative z-10 font-body-lg text-lg text-on-surface-variant max-w-4xl mt-2 reveal-up active"
          style={{ transitionDelay: "0.2s" }}
        >
          {t("seoDescription")}
        </p>
      </section>

      {/* Danh sách Services */}
      <section className="flex flex-col gap-16">
        {!services || services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">
              search_off
            </span>
            <p className="font-body-lg text-lg">{t("notFound")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const rawImgSrc = service.featured_image?.trim();
              const imgSrc = rawImgSrc
                ? rawImgSrc.startsWith("http")
                  ? rawImgSrc
                  : `http://localhost:3000${rawImgSrc.startsWith("/") ? "" : "/"}${rawImgSrc}`
                : null;

              return (
                <Link
                  key={service.id}
                  href={{
                    pathname: "/services/[slug]",
                    params: { slug: service.slug || service.id },
                  }}
                  className="bg-surface-container-lowest p-8 relative overflow-hidden group hover-grainy hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col h-full border border-transparent hover:border-primary-container"
                >
                  <div className="grainy-overlay"></div>

                  <div className="relative z-10 flex flex-col gap-4 flex-1">
                    <div className="relative w-full h-56 mb-4 bg-surface-variant/30 rounded-sm overflow-hidden flex items-center justify-center">
                      {imgSrc ? (
                        <Image
                          src={imgSrc}
                          alt={service.title}
                          fill
                          unoptimized
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-outline text-4xl opacity-50">
                          category
                        </span>
                      )}
                    </div>

                    <h2 className="font-headline-md text-2xl font-bold text-on-background line-clamp-2">
                      {service.title}
                    </h2>

                    <div className="flex flex-col gap-1 mt-2 mb-4 border-l-2 border-primary-container pl-4">
                      {service.price && (
                        <p className="font-body-sm text-sm text-on-surface-variant">
                          <span className="font-bold">{t("price")}:</span>{" "}
                          {service.price.toLocaleString()}{" "}
                          {service.currency || "VND"}
                        </p>
                      )}
                      {service.duration && (
                        <p className="font-body-sm text-sm text-on-surface-variant">
                          <span className="font-bold">{t("duration")}:</span>{" "}
                          {service.duration}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-primary pt-4 border-t border-surface-variant/50">
                      <span className="font-label-caps text-xs tracking-widest uppercase font-bold">
                        {homeT("viewDetail")}
                      </span>
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link
                key={i}
                // @ts-expect-error - Chấp nhận query params để phân trang
                href={{
                  pathname: "/services",
                  query: { page: (i + 1).toString() },
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-sm font-bold text-sm transition-colors ${
                  currentPage === i + 1
                    ? "bg-primary-container text-on-primary-container"
                    : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant border border-outline-variant"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
