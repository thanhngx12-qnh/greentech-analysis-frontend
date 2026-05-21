// File: src/app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CursorAurora from "@/components/ui/CursorAurora";
import { i18n, Locale } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Greentech Analysis | Luminous Precision",
  description: "High-Tech Minimalist Data Analysis & Consulting Platform",
};

// Đã cập nhật params thành Promise theo chuẩn Next 15+
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  // Await params để unwrap dữ liệu
  const resolvedParams = await params;

  return (
    <html
      lang={resolvedParams.lang}
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-primary-container selection:text-on-background min-h-screen flex flex-col">
        <CursorAurora />
        <Header lang={resolvedParams.lang} />
        <main className="flex-1 pt-stack-lg max-w-container-max mx-auto px-margin-desktop pb-stack-lg flex flex-col gap-stack-lg w-full">
          {children}
        </main>
        <Footer lang={resolvedParams.lang} />
      </body>
    </html>
  );
}
