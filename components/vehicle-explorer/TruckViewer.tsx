"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TruckViewer({ src }: { src: string }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={src}
        alt="Vehicle diagram"
        fill
        sizes="(max-width: 768px) 90vw, 60vw"
        className="object-contain"
        priority
      />
    </motion.div>
  );
}
