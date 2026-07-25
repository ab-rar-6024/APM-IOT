"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useMemo } from "react";

interface Props {
  accentColor: string;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const PARTICLE_COUNT = 26;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export default function CertificateBackground({ accentColor, mouseX, mouseY }: Props) {
  const reduceMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        left: Number((seededRandom(i + 1) * 100).toFixed(2)),
        top: Number((seededRandom(i + 51) * 100).toFixed(2)),
        size: Number((1.5 + seededRandom(i + 101) * 2.5).toFixed(2)),
        duration: Number((13 + seededRandom(i + 151) * 16).toFixed(2)),
        delay: Number((-seededRandom(i + 201) * 18).toFixed(2)),
      })),
    []
  );

  const glowAX = useTransform(mouseX, [-1, 1], [-26, 26]);
  const glowAY = useTransform(mouseY, [-1, 1], [-18, 18]);
  const glowBX = useTransform(mouseX, [-1, 1], [16, -16]);
  const glowBY = useTransform(mouseY, [-1, 1], [12, -12]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[radial-gradient(#2F8FEF_1px,transparent_1.5px)] bg-[size:32px_32px] opacity-[0.035]" />

      <motion.div
        className="absolute w-[46rem] h-[46rem] rounded-full blur-[120px]"
        style={{
          right: "6%",
          top: "-12%",
          x: reduceMotion ? 0 : glowAX,
          y: reduceMotion ? 0 : glowAY,
        }}
        animate={{ backgroundColor: accentColor, opacity: 0.1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-[32rem] h-[32rem] rounded-full blur-[110px]"
        style={{
          left: "0%",
          bottom: "-10%",
          x: reduceMotion ? 0 : glowBX,
          y: reduceMotion ? 0 : glowBY,
        }}
        animate={{ backgroundColor: accentColor, opacity: 0.06 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      />

      {!reduceMotion && (
        <motion.div
          className="absolute inset-y-0 w-1/3 opacity-[0.04]"
          style={{ background: "linear-gradient(115deg, transparent, #2F8FEF, transparent)" }}
          animate={{ x: ["-40%", "140%"] }}
          transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
        />
      )}

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px` }}
          animate={reduceMotion ? undefined : { y: [0, -18, 0], opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
