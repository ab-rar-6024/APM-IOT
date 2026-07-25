"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/lenis-instance";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-navy/50 shadow-[0_4px_16px_rgba(15,23,42,0.12)] ring-1 ring-black/5 transition-all duration-300 hover:text-primary hover:shadow-[0_6px_20px_rgba(15,23,42,0.18)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V6.5M6 11.5L12 5.5L18 11.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 19h12" />
      </svg>
    </button>
  );
}
