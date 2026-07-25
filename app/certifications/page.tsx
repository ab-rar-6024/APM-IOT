import type { Metadata } from "next";
import { getCertificates } from "@/lib/certificates-data";
import CertificatesShowcase from "@/components/certificates/CertificatesShowcase";

export const metadata: Metadata = {
  title: "Certifications | APM Group",
  description:
    "APM's full range of quality, product, and regulatory certifications — ISO, CMMI, AIS-140/ARAI, BIS, ICAT, WPC, EPR, and more.",
  alternates: { canonical: "https://apmgroups.in/certifications" },
};

export default async function CertificationsPage() {
  const certificates = await getCertificates();
  return <CertificatesShowcase certificates={certificates} />;
}
