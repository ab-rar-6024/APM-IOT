"use client";

import Image from "next/image";

interface ClientLogo {
  name: string;
  logo: string;
}

const clientsData: ClientLogo[] = [
  { name: "Bentley", logo: "/images/clients/bentley.png" },
  { name: "Tata", logo: "/images/clients/tata.png" },
  { name: "Mahindra Rise", logo: "/images/clients/mahindra.png" },
  { name: "Ashok Leyland", logo: "/images/clients/ashok-leyland.png" },
  { name: "Indian Coast Guard", logo: "/images/clients/coast-guard.png" },
  { name: "Larsen & Toubro", logo: "/images/clients/larsen-toubro.png" },
  { name: "Ford", logo: "/images/clients/ford.png" },
  { name: "Eicher", logo: "/images/clients/eicher.png" },
  { name: "CEAT", logo: "/images/clients/ceat.png" },
  { name: "Ramco Supergrade", logo: "/images/clients/ramco.png" },
  { name: "Rando", logo: "/images/clients/rando.png" },
  { name: "SKV International School", logo: "/images/clients/skv.png" },
  { name: "TVS", logo: "/images/clients/tvs.png" },
  { name: "Tata Projects", logo: "/images/clients/tata-projects.png" },
  { name: "Professional Couriers", logo: "/images/clients/professional-couriers.png" },
  { name: "Vedanta", logo: "/images/clients/vedanta.png" },
  { name: "SRD Logistics", logo: "/images/clients/srd-logistics.png" },
  { name: "ST Courier", logo: "/images/clients/st-courier.png" },
  { name: "Rolls-Royce", logo: "/images/clients/rolls-royce.png" },
  { name: "SRM Institute of Science & Technology", logo: "/images/clients/srm.png" },
  { name: "RB", logo: "/images/clients/rb.png" },
  { name: "Taabi", logo: "/images/clients/taabi.png" },
];

export default function TrustedClientsSection() {
  const doubledClients = [...clientsData, ...clientsData];

  return (
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes client-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-client-marquee {
          animation: client-marquee 35s linear infinite;
        }
        .animate-client-marquee:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-12">
        <h3 className="accent-bar accent-bar-center text-3xl md:text-4xl font-black text-navy uppercase tracking-tight">
          Trusted by Clients Across Industries
        </h3>
        <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm md:text-base font-semibold leading-relaxed">
          From logistics to manufacturing, our clients choose APM Group for solutions that deliver measurable results and lasting value
        </p>
      </div>

      {/* Infinite Marquee Slider */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left and right fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-client-marquee items-center">
          {doubledClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="group shrink-0 mx-3 md:mx-4 px-6 py-5 bg-white border border-slate-100/90 hover:border-primary/30 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-28 md:h-32 w-52 md:w-64"
            >
              <div className="relative w-full h-20 md:h-24 flex items-center justify-center">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={80}
                  className="object-contain max-h-20 md:max-h-24 max-w-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
