// File: src/components/ui/LanguageSwitcher.tsx
"use client";

import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { useUIStore } from "@/hooks/useUIStore";
import { i18n, Locale } from "@/i18n-config";

interface LanguageSwitcherProps {
  currentLang: Locale;
}

const langNames: Record<Locale, string> = {
  en: "EN",
  vi: "VN",
  zh: "ZH",
};

export default function LanguageSwitcher({
  currentLang,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { dynamicSlugs, currentRouteKey } = useUIStore();

  const changeLocale = (nextLocale: string) => {
    if (nextLocale === currentLang) return;

    // TRƯỜNG HỢP 1: Trang động (Có dynamic slug và đã cấu hình route)
    if (dynamicSlugs && dynamicSlugs[nextLocale] && currentRouteKey) {
      router.replace(
        // @ts-expect-error - Bypass union type phức tạp của next-intl
        {
          pathname: currentRouteKey,
          params: { ...params, slug: dynamicSlugs[nextLocale] },
        },
        { locale: nextLocale },
      );
    }
    // TRƯỜNG HỢP 2: Trang động nhưng bài viết CHƯA được dịch sang ngôn ngữ đích
    else if (dynamicSlugs && !dynamicSlugs[nextLocale]) {
      // Đẩy về trang danh sách (Trang chủ tạm thời)
      router.push("/", { locale: nextLocale });
    }
    // TRƯỜNG HỢP 3: Các trang tĩnh bình thường
    else {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale },
      );
    }
  };

  return (
    <div className="flex gap-2 items-center bg-surface-variant/50 rounded-full p-1 border border-outline-variant">
      {i18n.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => changeLocale(loc)}
          className={`w-8 h-8 rounded-full font-label-caps text-xs flex items-center justify-center transition-all duration-300 ${
            currentLang === loc
              ? "bg-primary-container text-on-primary-container shadow-sm font-bold"
              : "text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          {langNames[loc as Locale]}
        </button>
      ))}
    </div>
  );
}
