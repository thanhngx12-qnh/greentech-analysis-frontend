// File: src/navigation.ts
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { i18n } from "./i18n-config";

export const routing = defineRouting({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: "as-needed", // TỰ ĐỘNG ẨN /vi, CHỈ HIỆN /en, /zh

  // KHAI BÁO PATHNAMES: Bắt buộc để sử dụng tính năng href Object Routing
  pathnames: {
    "/": "/",
    "/login": "/login",
    "/platform": "/platform",
    "/analysis": "/analysis",
    "/insights": "/insights",
    "/services": "/services",
    "/services/[slug]": "/services/[slug]",
    "/news": "/news",
    "/news/[slug]": "/news/[slug]",
    "/privacy-policy": "/privacy-policy",
    "/terms-of-service": "/terms-of-service",
    "/carbon-methodology": "/carbon-methodology",
    "/investor-relations": "/investor-relations",
  },
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
