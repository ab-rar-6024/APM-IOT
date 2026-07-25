"use client";

import type { Certificate } from "@/lib/certificates-data";
import CertificatesDesktop from "./CertificatesDesktop";
import CertificatesMobile from "./CertificatesMobile";

export default function CertificatesShowcase({ certificates }: { certificates: Certificate[] }) {
  return (
    <>
      <CertificatesDesktop certificates={certificates} />
      <CertificatesMobile certificates={certificates} />
    </>
  );
}
