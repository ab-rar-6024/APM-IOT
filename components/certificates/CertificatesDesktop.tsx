"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import type { Certificate } from "@/lib/certificates-data";
import RotaryCertificationDial from "@/components/RotaryCertificationDial";
import CertificateBackground from "./CertificateBackground";
import CertificateContent from "./CertificateContent";
import CertificatePreview from "./CertificatePreview";

const TRANSITION_LOCK_MS = 820;

export default function CertificatesDesktop({ certificates }: { certificates: Certificate[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const lockedRef = useRef(false);
  const indexRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelZoneRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 55, damping: 18 });
  const mouseY = useSpring(rawY, { stiffness: 55, damping: 18 });

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      if (lockedRef.current) return;
      if (next < 0 || next >= certificates.length) return;
      lockedRef.current = true;
      setDirection(dir);
      setIndex(next);
      window.setTimeout(() => {
        lockedRef.current = false;
      }, TRANSITION_LOCK_MS);
    },
    [certificates.length]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onWheel(e: WheelEvent) {
      // The OptionWheel rail handles its own wheel/drag/keyboard interaction
      // (its own scroll-one-step-then-snap logic) — let those events through
      // untouched instead of hijacking them for slide navigation.
      if (wheelZoneRef.current && e.target instanceof Node && wheelZoneRef.current.contains(e.target)) {
        return;
      }

      if (lockedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const goingDown = e.deltaY > 0;
      const nextIndex = indexRef.current + (goingDown ? 1 : -1);
      const inBounds = nextIndex >= 0 && nextIndex < certificates.length;

      if (!inBounds) return;

      e.preventDefault();
      e.stopPropagation();
      goTo(nextIndex, goingDown ? 1 : -1);
    }

    section.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => section.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
  }, [certificates.length, goTo]);

  useEffect(() => {
    function sectionEngaged() {
      const el = sectionRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
    }

    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      if (!sectionEngaged()) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        goTo(indexRef.current + 1, 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        goTo(indexRef.current - 1, -1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0, -1);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(certificates.length - 1, 1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [certificates.length, goTo]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const navigate = (i: number) => goTo(i, i > indexRef.current ? 1 : -1);
  const active = certificates[index];
  const wheelItems = useMemo(
    () => certificates.map((cert) => cert.title.split("—")[0].trim()),
    [certificates]
  );

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative hidden lg:block h-[calc(100dvh-5rem)] overflow-hidden bg-white"
    >
      <CertificateBackground accentColor={active.accentColor} mouseX={mouseX} mouseY={mouseY} />

      <div className="relative z-10 h-full max-w-[1700px] mx-auto flex items-stretch">
        <div
          ref={wheelZoneRef}
          className="relative z-20 shrink-0 w-[clamp(360px,34vw,620px)] flex items-center justify-center"
        >
          <div
            className="relative w-full rounded-[32px] border border-slate-200 bg-slate-50/70 backdrop-blur-xl overflow-hidden"
            style={{
              height: "min(58vh, 620px)",
              boxShadow: `0 30px 90px -30px rgba(15,58,117,0.15), inset 0 1px 0 rgba(255,255,255,0.6), 0 0 90px -20px ${active.accentColor}30`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${active.accentColor}55, transparent)` }}
            />
            <div
              className="pointer-events-none absolute inset-x-6 top-1/2 -translate-y-1/2 h-[104px] rounded-2xl"
              style={{
                background: "linear-gradient(180deg, rgba(47,143,239,0.06), rgba(47,143,239,0.01))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(15,58,117,0.06)",
              }}
            />
            <RotaryCertificationDial
              items={wheelItems}
              value={index}
              onChange={(i) => navigate(i)}
              accentColor={active.accentColor}
              itemHeight={112}
              visibleRadius={2}
              loop
            />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-5 gap-8 px-6 xl:px-10 h-full items-center min-w-0">
          <div className="col-span-2 h-full flex items-center min-w-0">
            <CertificateContent certificate={active} direction={direction} />
          </div>
          <div className="col-span-3 h-full flex flex-col items-center justify-center py-8 min-w-0">
            <CertificatePreview certificate={active} direction={direction} mouseX={mouseX} mouseY={mouseY} priority={index === 0} />
          </div>
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {`Showing certificate ${index + 1} of ${certificates.length}: ${active.title}`}
      </span>
    </div>
  );
}
