import Image from "next/image";
import Link from "next/link";

interface Certificate {
  id: string;
  name: string;
  category: string;
  logoColor: string;
  logoSvg?: React.ReactNode;
  logoImages?: string[];
}

const certificates: Certificate[] = [
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    category: "Quality Management System",
    logoColor: "bg-blue-600",
    logoImages: ["/images/certifications/iso9001.png"]
  },
  {
    id: "iatf",
    name: "IATF 16949",
    category: "Automotive Quality Management",
    logoColor: "bg-red-600",
    logoSvg: (
      <svg className="w-16 h-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  },
  {
    id: "cmmi",
    name: "CMMI Level 3",
    category: "Software Process Capability",
    logoColor: "bg-purple-600",
    logoSvg: (
      <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  {
    id: "arai",
    name: "AIS-140 ARAI",
    category: "Automotive Safety Standards",
    logoColor: "bg-teal-600",
    logoSvg: (
      <svg className="w-16 h-16 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.284 16.284A7 7 0 0012 19a7 7 0 003.716-2.716M9 12a3 3 0 116 0 3 3 0 01-6 0zm-5.008 3.008a12 12 0 0016.016 0M12 2.25v2.5M12 4.75a7.5 7.5 0 010 14.5M12 19.25v2.5" />
      </svg>
    )
  },
  {
    id: "bis",
    name: "BIS Standards",
    category: "National Standards of India",
    logoColor: "bg-amber-500",
    logoImages: ["/images/certifications/bis-standard.png"]
  },
  {
    id: "cefcc",
    name: "CE & FCC Mark",
    category: "Global Electronics Compliance",
    logoColor: "bg-slate-700",
    logoImages: ["/images/certifications/ce.svg", "/images/certifications/fcc.svg"]
  },
  {
    id: "rohs",
    name: "RoHS Compliant",
    category: "Hazardous Materials Restriction",
    logoColor: "bg-emerald-600",
    logoImages: ["/images/certifications/rohs.svg"]
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    category: "Information Security Management",
    logoColor: "bg-indigo-600",
    logoImages: ["/images/certifications/iso27001.png"]
  }
];

function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <div className="relative w-full h-[280px] bg-white text-navy rounded-3xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between items-center">
      <div className="flex-1 flex items-center justify-center">
        {cert.logoImages ? (
          <div className="flex items-center justify-center gap-3">
            {cert.logoImages.map((src) => (
              <div key={src} className="relative w-16 h-16">
                <Image src={src} alt={cert.name} fill sizes="64px" className="object-contain" />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full border-4 border-slate-50 shadow-inner flex items-center justify-center bg-slate-50/50">
            {cert.logoSvg}
          </div>
        )}
      </div>

      <div className="text-center space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
          {cert.category}
        </span>
        <h4 className="text-lg font-black tracking-tight">{cert.name}</h4>
      </div>
    </div>
  );
}

export default function CertificationsSection() {
  return (
    <section id="certifications" className="landing-snap-section relative bg-navy py-24 px-6 lg:px-8 overflow-hidden text-white">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2857] to-navy" />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 18px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-white mb-4">
            Certifications &amp; Quality Standards
          </h3>
          <p className="text-white/60 text-sm max-w-xl mx-auto mt-4 font-semibold leading-relaxed">
            APM&apos;s hardware and processes are audited and certified by recognized quality, safety, and regulatory bodies.
          </p>
        </div>

        {/* Certificate Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Common CTA to the full certifications page */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-navy text-sm font-bold hover:bg-amber-400 transition-all group/btn shadow-lg"
          >
            View All Certificates
            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
