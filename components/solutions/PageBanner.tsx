"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function PageBanner({
  image,
  name,
  tagline,
}: {
  image: string;
  name: string;
  tagline: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative w-full aspect-[16/7] min-h-[260px] max-h-[560px] overflow-hidden bg-navy">
      <Image
        src={image}
        alt={`${name} — APM Group`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/10" />
      <div
        ref={ref}
        style={{ transitionDuration: "700ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        className={`absolute inset-0 flex flex-col justify-end px-6 lg:px-10 pb-10 lg:pb-14 max-w-7xl mx-auto transition-all ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight max-w-3xl">
          {name}
        </h1>
        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">{tagline}</p>
      </div>
    </section>
  );
}
