"use client";

import { useRef, useState, type CSSProperties, type MouseEvent } from "react";

/** Mouse-tracked 3D tilt + glare, matching the interaction already used on the Certifications flip-cards. */
export function useTilt<T extends HTMLElement>(maxTilt = 10) {
  const ref = useRef<T>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transitionDuration: "500ms",
  });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e: MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - y) * maxTilt * 2;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
      transitionDuration: "80ms",
      transitionTimingFunction: "linear",
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  };

  const onMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return { ref, style, glare, onMouseMove, onMouseLeave };
}
