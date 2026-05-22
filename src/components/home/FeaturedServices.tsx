// File: src/components/home/FeaturedServices.tsx
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/api";

interface FeaturedServicesProps {
  services: Service[];
  lang: string;
}

export default function FeaturedServices({
  services,
  lang,
}: FeaturedServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="flex flex-col gap-stack-md">
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background border-b border-surface-variant pb-4">
        01. Featured Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {services.map((service) => {
          const imgSrc = service.featured_image?.trim();

          return (
            <Link
              key={service.id}
              href={{
                pathname: `/${lang}/services/${service.slug || service.id}`,
              }}
              className="bg-surface-container-lowest p-8 relative overflow-hidden group hover-grainy hover:scale-[1.02] transition-transform duration-300 cursor-pointer block h-full flex flex-col"
            >
              <div className="grainy-overlay"></div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-container transition-colors duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col gap-4 flex-1">
                <div className="relative w-full h-48 mb-4 bg-surface-variant/30 rounded-sm overflow-hidden flex items-center justify-center">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={service.title || "Service Image"}
                      fill
                      unoptimized
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-outline text-4xl opacity-50">
                      category
                    </span>
                  )}
                </div>
                <h4 className="font-headline-md text-2xl text-on-background line-clamp-2">
                  {service.title || "Untitled Service"}
                </h4>
                <div className="mt-auto flex items-center gap-2 text-primary pt-4">
                  <span className="font-label-caps text-label-caps uppercase">
                    View Detail
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
