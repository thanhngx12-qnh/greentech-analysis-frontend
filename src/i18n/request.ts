// File: src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "../navigation";

export default getRequestConfig(async ({ requestLocale }) => {
  // Đọc locale từ middleware truyền sang
  let locale = await requestLocale;

  // Nếu không có hoặc không hợp lệ, dùng mặc định
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Import đúng từ điển dựa trên locale
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});
