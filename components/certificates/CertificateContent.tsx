"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Certificate } from "@/lib/certificates-data";

interface Props {
  certificate: Certificate;
  direction: 1 | -1;
}

export default function CertificateContent({ certificate, direction }: Props) {
  const reduceMotion = useReducedMotion();
  const year = new Date(certificate.issueDate).getFullYear();

  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: direction === 1 ? 28 : -28, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: direction === 1 ? -20 : 20, filter: "blur(4px)" },
      };

  return (
    <div className="relative flex flex-col justify-center h-full max-w-xl w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={certificate.id}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={
            reduceMotion
              ? { duration: 0.2 }
              : { type: "spring", stiffness: 120, damping: 18, mass: 0.9 }
          }
          className="flex flex-col gap-5"
        >
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-slate-400">
            <span style={{ color: certificate.accentColor }}>{String(certificate.displayOrder).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-slate-300" />
            <span>{year}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-[3.4rem] font-semibold tracking-tight text-navy leading-[1.05]">
            {certificate.title}
          </h1>

          {certificate.certificateNumber && (
            <p className="font-mono text-sm text-slate-400 tracking-wide">Certificate No. {certificate.certificateNumber}</p>
          )}

          <p className="text-base sm:text-lg text-primary font-semibold leading-relaxed">{certificate.issuingAuthority}</p>

          <p className="text-base text-slate-500 leading-relaxed max-w-lg">{certificate.shortDescription}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
