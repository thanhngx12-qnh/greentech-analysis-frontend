// File: src/components/layout/Header.tsx
"use client";

import { Link } from "@/navigation"; // DÙNG LINK TỪ NAVIGATION
import { Locale } from "@/i18n-config";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const magneticRefs = useRef<
    (HTMLAnchorElement | HTMLDivElement | HTMLButtonElement | null)[]
  >([]);
  const t = useTranslations("Header");

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const elements = magneticRefs.current;
    const handleMouseMove = (e: MouseEvent, el: HTMLElement) => {
      const position = el.getBoundingClientRect();
      const moveX =
        ((e.clientX - position.left - position.width / 2) / position.width) *
        10;
      const moveY =
        ((e.clientY - position.top - position.height / 2) / position.height) *
        10;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    const handleMouseLeave = (el: HTMLElement) =>
      (el.style.transform = `translate(0px, 0px)`);
    elements.forEach((el) =>
      el?.addEventListener("mousemove", (e) => handleMouseMove(e, el)),
    );
    elements.forEach((el) =>
      el?.addEventListener("mouseleave", () => handleMouseLeave(el)),
    );
    return () => {
      elements.forEach((el) =>
        el?.removeEventListener("mousemove", (e) => handleMouseMove(e, el)),
      );
      elements.forEach((el) =>
        el?.removeEventListener("mouseleave", () => handleMouseLeave(el)),
      );
    };
  }, []);

  const addToRefs = (el: any) => {
    if (el && !magneticRefs.current.includes(el)) magneticRefs.current.push(el);
  };

  const navLinks = [
    { label: t("platform"), href: "/platform", isPrimary: false },
    { label: t("analysis"), href: "/analysis", isPrimary: false },
    { label: t("services"), href: "/services", isPrimary: true },
    { label: t("insights"), href: "/insights", isPrimary: false },
  ] as const;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl transition-all duration-500 ease-out border-b border-surface-variant/30">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3 md:py-unit max-w-container-max mx-auto">
          <div
            ref={addToRefs}
            className="font-headline-md text-2xl md:text-headline-md font-extrabold text-on-background transition-transform duration-300"
          >
            <Link href="/">Greentech Analysis</Link>
          </div>

          <div className="hidden md:flex gap-gutter items-center">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                ref={addToRefs}
                href={link.href}
                className={`font-body-lg text-body-lg hover:scale-105 transition-transform duration-300 cursor-pointer ${link.isPrimary ? "text-primary font-bold border-b-2 border-primary" : "text-on-surface-variant"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <LanguageSwitcher currentLang={lang} />
            <div className="h-6 w-px bg-outline-variant mx-2"></div>
            <Link
              ref={addToRefs}
              className="font-body-lg text-body-lg text-on-surface-variant transition-transform duration-300"
              href="/login"
            >
              {t("login")}
            </Link>
            <button
              ref={addToRefs}
              className="btn-wipe border border-outline px-6 py-2 rounded-full font-body-lg text-body-lg text-on-background flex items-center gap-2 transition-transform duration-300"
            >
              {t("connectNow")}{" "}
              <span className="material-symbols-outlined text-primary-container">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher currentLang={lang} />
            <button
              className="flex items-center justify-center p-2 text-on-background"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface pt-24 px-margin-mobile flex flex-col gap-6 md:hidden"
          >
            <div className="flex flex-col gap-4 border-b border-surface-variant pb-6">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`font-headline-md text-3xl ${link.isPrimary ? "text-primary" : "text-on-background"}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <Link
                href="/login"
                onClick={() => setIsMobileOpen(false)}
                className="font-body-lg text-xl text-on-background"
              >
                {t("login")}
              </Link>
              <button className="bg-primary-container text-on-primary-container px-6 py-4 rounded-sm font-bold flex justify-center items-center gap-2 w-full mt-2">
                {t("connectNow")}{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
