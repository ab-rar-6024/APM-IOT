"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import type { Certificate } from "@/lib/certificates-data";

interface Props {
  certificate: Certificate;
  direction: 1 | -1;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  priority?: boolean;
}

export default function CertificatePreview({ certificate, direction, mouseX, mouseY, priority }: Props) {
  const reduceMotion = useReducedMotion();

  const rotateX = useTransform(mouseY, [-1, 1], [7, -7]);
  const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);
  const translateX = useTransform(mouseX, [-1, 1], [-10, 10]);
  const translateY = useTransform(mouseY, [-1, 1], [-6, 6]);

  const variants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: direction === 1 ? 56 : -56, rotate: direction === 1 ? 2 : -2, scale: 0.95 },
        animate: { opacity: 1, y: 0, rotate: 0, scale: 1 },
        exit: { opacity: 0, y: direction === 1 ? -40 : 40, rotate: direction === 1 ? -2 : 2, scale: 0.94 },
      };

  return (
    <div className="relative flex items-center justify-center h-full w-full [perspective:1600px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={certificate.id}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={reduceMotion ? { duration: 0.2 } : { type: "spring", stiffness: 110, damping: 20, mass: 1 }}
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, x: translateX, y: translateY, transformStyle: "preserve-3d" }
          }
          className="relative flex flex-col items-center gap-8"
        >
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-full p-10 sm:p-12 bg-white backdrop-blur-2xl border border-slate-200"
            style={{
              boxShadow: `0 40px 100px -20px rgba(15,58,117,0.18), 0 0 0 1px rgba(15,58,117,0.03), 0 0 70px -15px ${certificate.accentColor}40`,
            }}
          >
            <div className="relative w-[min(46vw,300px)] h-[min(46vw,300px)] sm:w-[300px] sm:h-[300px] rounded-full overflow-hidden bg-gradient-to-br from-white to-slate-100 flex items-center justify-center">
              <div className="relative w-[72%] h-[72%]">
                <Image
                  src={certificate.certificateImage}
                  alt={`${certificate.issuingAuthority} seal`}
                  fill
                  sizes="(max-width: 1280px) 46vw, 300px"
                  className="object-contain"
                  priority={priority}
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent mix-blend-overlay" />
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-2 text-center max-w-md px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy leading-tight">
              {certificate.title}
            </h2>
            <p className="text-sm text-slate-400">{certificate.issuingAuthority}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
