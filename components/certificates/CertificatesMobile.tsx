"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMotionValue } from "framer-motion";
import type { Certificate } from "@/lib/certificates-data";
import CertificateBackground from "./CertificateBackground";

export default function CertificatesMobile({ certificates }: { certificates: Certificate[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          const idx = Number((mostVisible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActiveIndex(idx);
        }
      },
      { threshold: [0.55] }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [certificates.length]);

  const active = certificates[activeIndex];

  return (
    <div
      className="relative lg:hidden h-[calc(100dvh-5rem)] overflow-y-auto snap-y snap-mandatory overscroll-y-contain"
    >
      <div className="fixed inset-x-0 top-20 bottom-0 -z-10">
        <CertificateBackground accentColor={active.accentColor} mouseX={mouseX} mouseY={mouseY} />
      </div>

      {certificates.map((cert, i) => {
        const year = new Date(cert.issueDate).getFullYear();
        return (
          <section
            key={cert.id}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
            data-index={i}
            className="snap-start h-[calc(100dvh-5rem)] flex flex-col justify-center px-6 py-8 gap-4 overflow-y-auto"
          >
            <div className="relative w-full flex items-center justify-center shrink-0">
              <div
                className="relative rounded-full p-7 bg-white backdrop-blur-xl border border-slate-200"
                style={{ boxShadow: `0 30px 80px -20px rgba(15,58,117,0.18), 0 0 40px -10px ${cert.accentColor}40` }}
              >
                <div className="relative w-[38vw] h-[38vw] max-w-[190px] max-h-[190px] rounded-full overflow-hidden bg-gradient-to-br from-white to-slate-100 flex items-center justify-center">
                  <div className="relative w-[72%] h-[72%]">
                    <Image
                      src={cert.certificateImage}
                      alt={`${cert.issuingAuthority} seal`}
                      fill
                      sizes="38vw"
                      className="object-contain"
                      loading={i === 0 ? "eager" : "lazy"}
                      priority={i === 0}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400 shrink-0">
              <span style={{ color: cert.accentColor }}>{String(cert.displayOrder).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-slate-300" />
              <span>{year}</span>
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-navy leading-[1.15] shrink-0">{cert.title}</h2>
            <p className="text-sm text-primary font-semibold shrink-0">{cert.issuingAuthority}</p>
            <p className="text-sm text-slate-500 leading-relaxed shrink-0">{cert.shortDescription}</p>
          </section>
        );
      })}
    </div>
  );
}
