// File: src/components/home/LatestNews.tsx
import Image from "next/image";
import { Link } from "@/navigation";
import type { News } from "@/lib/api";
import { useTranslations, useLocale } from "next-intl";

interface LatestNewsProps {
  news: News[];
}

export default function LatestNews({ news }: LatestNewsProps) {
  const t = useTranslations("Home");
  const locale = useLocale();

  if (!news || news.length === 0) return null;

  return (
    <section className="flex flex-col gap-stack-md">
      <div className="flex justify-between items-end border-b border-surface-variant pb-4">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
          {t("latestInsights")}
        </h2>
        <Link
          href="/news"
          className="link-reveal font-body-lg text-body-lg text-on-background font-bold hidden md:inline-flex"
        >
          {t("viewAllNews")}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {news.map((item) => {
          const imgSrc = item.featured_image?.trim();
          return (
            <Link
              key={item.id}
              href={{
                pathname: "/news/[slug]",
                params: { slug: item.slug || item.id },
              }}
              className="group flex flex-col gap-4 cursor-pointer"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-sm bg-surface-variant/30 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-container/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <span className="material-symbols-outlined text-outline text-4xl opacity-50">
                    article
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-label-caps text-outline">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString(
                        locale === "vi"
                          ? "vi-VN"
                          : locale === "zh"
                            ? "zh-CN"
                            : "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )
                    : t("recent")}
                </span>
                <h4 className="font-headline-md text-2xl font-bold text-on-background line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
