"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Splash shown once per hard page load (root layout persists across
// client-side <Link> navigations, so this never remounts/replays when
// browsing between pages — only on a fresh visit or full refresh).
export default function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    const toLeaving = setTimeout(() => setPhase("leaving"), 1900);
    const toDone = setTimeout(() => setPhase("done"), 1900 + 750);
    return () => {
      clearTimeout(toLeaving);
      clearTimeout(toDone);
    };
  }, []);

  if (phase === "done") return null;

  const leaving = phase === "leaving";

  return (
    <div className="fixed inset-0 z-[999]" aria-hidden="true">
      {/* Two panels forming the backdrop, parting like a curtain to reveal the page beneath */}
      <motion.div
        initial={false}
        animate={{ x: leaving ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-y-0 left-0 w-1/2 bg-navy"
      />
      <motion.div
        initial={false}
        animate={{ x: leaving ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-y-0 right-0 w-1/2 bg-navy"
      />

      {/* Centered mark + progress, fades/settles just before the curtain parts */}
      <motion.div
        initial={false}
        animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 0.97 : 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="w-36 sm:w-44 aspect-[280/80]"
          >
            {/* Masked rather than filtered: the source PNG has partial internal
                opacity, so brightness/invert filters render a washed-out gray.
                Masking with the alpha channel and filling solid white keeps the
                mark crisp regardless of the source file's own transparency. */}
            <div
              role="img"
              aria-label="APM Group"
              className="w-full h-full bg-white"
              style={{
                WebkitMaskImage: "url(/images/layoutimg/apm-logo-1.png)",
                maskImage: "url(/images/layoutimg/apm-logo-1.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </motion.div>

          <div className="w-40 sm:w-52 h-px bg-white/15 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.4, ease: EASE }}
              style={{ transformOrigin: "left" }}
              className="h-full w-full bg-white/70"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
