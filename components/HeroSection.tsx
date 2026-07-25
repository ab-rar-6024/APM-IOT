"use client";

import { useEffect, useState } from "react";

// The hero video is a large (200MB+) desktop background asset — loading or
// autoplaying it on mobile would waste significant data/battery for a purely
// decorative element with no unique content, so phones/tablets get a static
// branded panel instead and never fetch the video file at all.
export default function HeroSection({ src = "/videos/0623.mp4" }: { src?: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setShowVideo(mql.matches);
    const handler = (e: MediaQueryListEvent) => setShowVideo(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <>
      {/* Spacer — reserves the scroll room the hero would occupy once it
          becomes fixed (and leaves normal flow) at lg+. Without this, the
          page below would start right under the navbar with no scroll
          distance for the hero to be visible before content covers it. */}
      <div
        className="hidden lg:block landing-snap-section lg:h-screen lg:min-h-[600px]"
        aria-hidden="true"
      />
      <section className="landing-snap-section relative w-full aspect-[16/9] lg:fixed lg:inset-0 lg:aspect-auto lg:h-screen lg:min-h-[600px] lg:z-0 bg-gradient-to-br from-navy via-navy to-[#0F2857] overflow-hidden flex items-center justify-center">
        {showVideo && (
          <video
            className="w-full h-full object-cover"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
      </section>
    </>
  );
}
