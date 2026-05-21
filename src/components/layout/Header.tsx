// File: src/components/layout/Header.tsx
"use client";

import Link from "next/link";
import { Locale } from "@/i18n-config";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  lang: Locale;
}

export default function Header({ lang }: HeaderProps) {
  // Logic cho hiệu ứng Magnetic theo thiết kế
  const magneticRefs = useRef<
    (HTMLAnchorElement | HTMLDivElement | HTMLButtonElement | null)[]
  >([]);

  useEffect(() => {
    const elements = magneticRefs.current;

    const handleMouseMove = (e: MouseEvent, el: HTMLElement) => {
      const position = el.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      const moveX = (x / position.width) * 10;
      const moveY = (y / position.height) * 10;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = (el: HTMLElement) => {
      el.style.transform = `translate(0px, 0px)`;
    };

    elements.forEach((el) => {
      if (el) {
        el.addEventListener("mousemove", (e) => handleMouseMove(e, el));
        el.addEventListener("mouseleave", () => handleMouseLeave(el));
      }
    });

    return () => {
      elements.forEach((el) => {
        if (el) {
          el.removeEventListener("mousemove", (e) => handleMouseMove(e, el));
          el.removeEventListener("mouseleave", () => handleMouseLeave(el));
        }
      });
    };
  }, []);

  const addToRefs = (el: any) => {
    if (el && !magneticRefs.current.includes(el)) {
      magneticRefs.current.push(el);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl transition-all duration-500 ease-out flex justify-between items-center px-margin-desktop py-unit max-w-container-max mx-auto hidden md:flex">
      <div
        ref={addToRefs}
        className="font-headline-md text-headline-md font-extrabold text-on-background transition-transform duration-300"
      >
        <Link href={`/${lang}`}>Greentech Analysis</Link>
      </div>

      <div className="flex gap-gutter items-center">
        <Link
          ref={addToRefs}
          className="font-body-lg text-body-lg text-on-surface-variant hover:scale-105 transition-transform duration-300 cursor-pointer"
          href={`/${lang}/platform`}
        >
          Platform
        </Link>
        <Link
          ref={addToRefs}
          className="font-body-lg text-body-lg text-on-surface-variant hover:scale-105 transition-transform duration-300 cursor-pointer"
          href={`/${lang}/analysis`}
        >
          Analysis
        </Link>
        <Link
          ref={addToRefs}
          className="font-body-lg text-body-lg text-primary font-bold border-b-2 border-primary hover:scale-105 transition-transform duration-300 cursor-pointer"
          href={`/${lang}/services`}
        >
          Services
        </Link>
        <Link
          ref={addToRefs}
          className="font-body-lg text-body-lg text-on-surface-variant hover:scale-105 transition-transform duration-300 cursor-pointer"
          href={`/${lang}/insights`}
        >
          Insights
        </Link>
      </div>

      <div className="flex gap-unit items-center">
        <Link
          ref={addToRefs}
          className="font-body-lg text-body-lg text-on-surface-variant transition-transform duration-300 mr-4"
          href={`/${lang}/login`}
        >
          Login
        </Link>
        <button
          ref={addToRefs}
          className="btn-wipe border border-outline px-6 py-2 rounded-full font-body-lg text-body-lg text-on-background flex items-center gap-2 transition-transform duration-300"
        >
          Connect Now
          <span className="material-symbols-outlined text-primary-container">
            arrow_forward
          </span>
        </button>
      </div>
    </nav>
  );
}
