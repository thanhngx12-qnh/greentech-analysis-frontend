// File: src/components/home/HeroSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Slider } from "@/lib/api";

interface HeroSliderProps {
  sliders: Slider[];
  lang: string;
}

export default function HeroSlider({ sliders, lang }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeSliders = Array.isArray(sliders) ? sliders : [];

  useEffect(() => {
    if (safeSliders.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeSliders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [safeSliders.length]);

  if (safeSliders.length === 0) return null;

  const currentSlider = safeSliders[currentIndex];
  if (!currentSlider) return null;

  // Kiểm tra ảnh hợp lệ (không null và không phải chuỗi rỗng)
  const imgSrc = currentSlider.image_desktop?.trim();

  return (
    <section className="min-h-[819px] flex flex-col lg:flex-row items-center gap-gutter relative">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 z-10">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display-xl text-display-xl-mobile md:text-display-xl text-on-background"
            dangerouslySetInnerHTML={{
              __html: currentSlider.title || "Luminous Precision.",
            }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`subtitle-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-lg"
          >
            {currentSlider.subtitle}
          </motion.p>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex gap-6 mt-8"
        >
          <a
            href={currentSlider.link_url || "#"}
            className="btn-wipe border border-on-background px-8 py-4 font-body-lg text-body-lg text-on-background font-bold flex items-center gap-2"
          >
            Explore Now
            <span className="material-symbols-outlined text-primary">
              arrow_forward
            </span>
          </a>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 h-[600px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`image-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={currentSlider.title || "Hero Banner"}
                fill
                unoptimized
                className="object-cover rounded-xl grayscale opacity-80 mix-blend-multiply"
              />
            ) : (
              // Placeholder nếu không có ảnh
              <div className="w-full h-full bg-surface-variant/50 rounded-xl flex items-center justify-center border border-outline-variant border-dashed">
                <span className="material-symbols-outlined text-outline text-6xl opacity-50">
                  image
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-primary-container/10 mix-blend-overlay rounded-xl pointer-events-none"></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
