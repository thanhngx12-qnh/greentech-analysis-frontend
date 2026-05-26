// // File: src/proxy.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { i18n } from "./i18n-config";
// import { match as matchLocale } from "@formatjs/intl-localematcher";
// import Negotiator from "negotiator";

// function getLocale(request: NextRequest): string | undefined {
//   const negotiatorHeaders: Record<string, string> = {};
//   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

//   const locales: string[] = [...i18n.locales];
//   const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
//     locales,
//   );
//   const defaultLocale = i18n.defaultLocale;

//   return matchLocale(languages, locales, defaultLocale);
// }

// // Đã đổi tên hàm từ 'middleware' thành 'proxy' theo chuẩn Next 16
// export function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   const pathnameIsMissingLocale = i18n.locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
//   );

//   if (pathnameIsMissingLocale) {
//     const locale = getLocale(request);
//     return NextResponse.redirect(
//       new URL(
//         `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
//         request.url,
//       ),
//     );
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// File: src/proxy.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./navigation";

export const proxy = createMiddleware(routing);

export const config = {
  // Thay đổi matcher để bắt mọi request gốc (ngoại trừ các file hệ thống và api)
  // Việc này giúp Middleware có thể bắt trang chủ '/' và nhận diện ngôn ngữ
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
