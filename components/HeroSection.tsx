"use client";

export default function HeroSection({ src = "/videos/0623.mp4" }: { src?: string }) {
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
        <video
          className="w-full h-full object-cover"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </section>
    </>
  );
}
