// File: src/components/layout/Footer.tsx
import Link from "next/link";
import { Locale } from "@/i18n-config";

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  return (
    // FIX: Thêm px-margin-mobile md:px-margin-desktop
    <footer className="w-full py-stack-md mt-stack-md md:mt-stack-lg bg-on-background flex flex-col md:flex-row justify-between items-start px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface mb-8 md:mb-0">
        Greentech Analysis
      </div>
      <div className="flex flex-col gap-4 items-start md:items-end">
        <div className="flex gap-6 flex-wrap">
          <Link
            className="font-label-caps text-label-caps text-surface-variant/60 hover:text-primary-fixed transition-colors duration-200 hover:translate-x-1 transition-transform"
            href={{ pathname: `/${lang}/privacy-policy` }}
          >
            Privacy Policy
          </Link>
          <Link
            className="font-label-caps text-label-caps text-surface-variant/60 hover:text-primary-fixed transition-colors duration-200 hover:translate-x-1 transition-transform"
            href={{ pathname: `/${lang}/terms-of-service` }}
          >
            Terms of Service
          </Link>
          <Link
            className="font-label-caps text-label-caps text-surface-variant/60 hover:text-primary-fixed transition-colors duration-200 hover:translate-x-1 transition-transform"
            href={{ pathname: `/${lang}/carbon-methodology` }}
          >
            Carbon Methodology
          </Link>
          <Link
            className="font-label-caps text-label-caps text-surface-variant/60 hover:text-primary-fixed transition-colors duration-200 hover:translate-x-1 transition-transform"
            href={{ pathname: `/${lang}/investor-relations` }}
          >
            Investor Relations
          </Link>
        </div>
        <div className="font-label-caps text-label-caps text-surface-variant/60 mt-4">
          © {new Date().getFullYear()} Greentech Analysis. Precision in
          Sustainability.
        </div>
      </div>
    </footer>
  );
}
