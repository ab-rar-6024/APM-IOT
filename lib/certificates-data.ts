export type CertificateStatus = "active" | "expired" | "pending";

export interface Certificate {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  /** Certifying-body logo/seal, shown large alongside the certificate name. */
  certificateImage: string;
  /** Original signed PDF, offered as a direct download. */
  certificatePDF: string;
  issuingAuthority: string;
  certificateNumber?: string;
  issueDate: string;
  expiryDate?: string;
  status: CertificateStatus;
  /** Hex accent used for this certificate's glow, rail dot, and highlights. */
  accentColor: string;
  displayOrder: number;
}

const certificates: Certificate[] = [
  {
    id: "iso9001",
    title: "ISO 9001:2015 — Quality Management System",
    shortDescription:
      "Certified quality management system covering design, manufacturing, and assembly of APM's vehicle safety and tracking products.",
    longDescription:
      "APM Group Private Limited's Quality Management System has been audited and found to conform to ISO 9001:2015 by Absolute Quality Certification Pvt. Ltd. (AQC), accredited under the United Accreditation Foundation (UAF) and the IAF Multilateral Recognition Arrangement. The scope covers manufacturing of High Security Registration Plates (HSRP), vehicle location tracking devices, speed limiting devices, reverse parking assistance systems, and CCTV.",
    certificateImage: "/images/certifications/iso9001.png",
    certificatePDF: "/certificates/iso9001.pdf",
    issuingAuthority: "Absolute Quality Certification Pvt. Ltd. (AQC)",
    certificateNumber: "24UQLG04",
    issueDate: "2024-03-28",
    expiryDate: "2027-03-27",
    status: "active",
    accentColor: "#3B82F6",
    displayOrder: 1,
  },
  {
    id: "iso27001",
    title: "ISO 27001 — Information Security Management System",
    shortDescription:
      "Independently certified information security management system safeguarding APM's product design and manufacturing data.",
    longDescription:
      "Assessed by UK International Certification Limited (UKICL) and found to comply with ISO 27001, covering the same manufacturing scope as APM's quality system. The certificate is scoped per a formal Statement of Applicability and is verifiable online.",
    certificateImage: "/images/certifications/iso27001.png",
    certificatePDF: "/certificates/iso27001.pdf",
    issuingAuthority: "UK International Certification Limited (UKICL)",
    certificateNumber: "26MEQVT31",
    issueDate: "2026-02-21",
    expiryDate: "2029-02-20",
    status: "active",
    accentColor: "#6366F1",
    displayOrder: 2,
  },
  {
    id: "bis-standard",
    title: "BIS Standard Certificate — CCTV Cameras",
    shortDescription:
      "Bureau of Indian Standards licence authorizing manufacture of Rover-branded CCTV cameras to IS 13252 (Part 1):2010.",
    longDescription:
      "Issued by the Bureau of Indian Standards (BIS) under the Compulsory Registration Scheme, granting APM Group Private Limited a licence to manufacture CCTV cameras under the ROVER brand (models Rover Primax, Rover Ultima) at its Chennai facility, compliant with IS 13252(Part 1):2010 / IEC 60950-1:2005.",
    certificateImage: "/images/certifications/bis-standard.png",
    certificatePDF: "/certificates/bis-standard.pdf",
    issuingAuthority: "Bureau of Indian Standards (BIS)",
    certificateNumber: "R-61005070",
    issueDate: "2024-09-03",
    expiryDate: "2026-09-02",
    status: "active",
    accentColor: "#F59E0B",
    displayOrder: 3,
  },
  {
    id: "iso14001",
    title: "ISO 14001:2015 — Environmental Management System",
    shortDescription: "Certified environmental management system governing APM's manufacturing operations.",
    longDescription:
      "Audited and certified by Absolute Quality Certification Pvt. Ltd. (AQC) as conforming to ISO 14001:2015, covering the environmental aspects of APM's HSRP, vehicle tracking, speed limiting, parking assistance, and CCTV manufacturing lines.",
    certificateImage: "/images/certifications/iso14001.png",
    certificatePDF: "/certificates/iso14001.pdf",
    issuingAuthority: "Absolute Quality Certification Pvt. Ltd. (AQC)",
    certificateNumber: "26MEEVT32",
    issueDate: "2026-02-21",
    expiryDate: "2029-02-20",
    status: "active",
    accentColor: "#10B981",
    displayOrder: 4,
  },
  {
    id: "iso20000",
    title: "ISO/IEC 20000-1 — IT Service Management System",
    shortDescription: "Certified IT service management system supporting APM's connected-device platform.",
    longDescription:
      "Certified by AQC as conforming to ISO/IEC 20000-1, the international standard for IT service management, covering the same manufacturing and product scope as APM's other management-system certifications.",
    certificateImage: "/images/certifications/iso20000.png",
    certificatePDF: "/certificates/iso20000.pdf",
    issuingAuthority: "Absolute Quality Certification Pvt. Ltd. (AQC)",
    certificateNumber: "26MEITVI34",
    issueDate: "2026-02-21",
    expiryDate: "2029-02-20",
    status: "active",
    accentColor: "#06B6D4",
    displayOrder: 5,
  },
  {
    id: "iso22301",
    title: "ISO 22301:2019 — Business Continuity Management System",
    shortDescription: "Certified business continuity management system ensuring operational resilience.",
    longDescription:
      "Assessed by UK International Certification Limited (UKICL) and certified to ISO 22301:2019 (Security & Resilience — Business Continuity Management Systems), independently verifiable at ukicl.org.uk.",
    certificateImage: "/images/certifications/iso22301.png",
    certificatePDF: "/certificates/iso22301.pdf",
    issuingAuthority: "UK International Certification Limited (UKICL)",
    certificateNumber: "SRBCMS26022451",
    issueDate: "2026-02-17",
    expiryDate: "2029-02-16",
    status: "active",
    accentColor: "#8B5CF6",
    displayOrder: 6,
  },
  {
    id: "iso45001",
    title: "ISO 45001 — Occupational Health & Safety Management System",
    shortDescription: "Certified occupational health and safety management system protecting APM's workforce.",
    longDescription:
      "Certified by AQC as conforming to ISO 45001, the international standard for occupational health and safety management, across APM's manufacturing and assembly operations.",
    certificateImage: "/images/certifications/iso45001.png",
    certificatePDF: "/certificates/iso45001.pdf",
    issuingAuthority: "Absolute Quality Certification Pvt. Ltd. (AQC)",
    certificateNumber: "26MEOVU29",
    issueDate: "2026-02-21",
    expiryDate: "2029-02-20",
    status: "active",
    accentColor: "#F97316",
    displayOrder: 7,
  },
  {
    id: "cmmi",
    title: "CMMI — Maturity Level 3",
    shortDescription: "Appraised at Capability Maturity Model Integration (CMMI) Maturity Level 3 for software development discipline.",
    longDescription:
      "Assessed by UKICL and appraised at CMMI Maturity Level 3, confirming APM's software development processes meet an internationally recognized maturity benchmark.",
    certificateImage: "/images/certifications/cmmi.png",
    certificatePDF: "/certificates/cmmi.pdf",
    issuingAuthority: "UK International Certification Limited (UKICL)",
    certificateNumber: "CMMI26022451",
    issueDate: "2026-02-17",
    expiryDate: "2029-02-16",
    status: "active",
    accentColor: "#0EA5E9",
    displayOrder: 8,
  },
  {
    id: "ais140-arai-cop",
    title: "AIS-140 — First Conformity of Production (VLTD)",
    shortDescription: "First-cycle Conformity of Production certification for APM's AIS-140 vehicle tracking device, Nirbayaan.",
    longDescription:
      "Issued by the Automotive Research Association of India (ARAI), confirming the first production cycle of the Nirbayaan Vehicle Tracking Device with Emergency Button conforms to Type Approval Certificate AR9015, per AIS-140 requirements notified by the Ministry of Road Transport & Highways.",
    certificateImage: "/images/certifications/ais140-arai-cop.png",
    certificatePDF: "/certificates/ais140-arai-cop.pdf",
    issuingAuthority: "Automotive Research Association of India (ARAI)",
    certificateNumber: "ARAI/AED/20252026/3000043710/COP/0048",
    issueDate: "2024-04-05",
    status: "active",
    accentColor: "#14B8A6",
    displayOrder: 9,
  },
  {
    id: "vltd-ais140-cop",
    title: "AIS-140 — Second Conformity of Production (VLTD)",
    shortDescription: "Second-cycle Conformity of Production certification for the Nirbayaan vehicle tracking device.",
    longDescription:
      "A follow-up Conformity of Production test cycle by ARAI, re-confirming the Nirbayaan VLTD's continued compliance with Type Approval Certificate AR9015 under AIS-140.",
    certificateImage: "/images/certifications/vltd-ais140-cop.png",
    certificatePDF: "/certificates/vltd-ais140-cop.pdf",
    issuingAuthority: "Automotive Research Association of India (ARAI)",
    certificateNumber: "ARAI/AED/20252026/3000051302/COP/3003",
    issueDate: "2024-04-05",
    status: "active",
    accentColor: "#2DD4BF",
    displayOrder: 10,
  },
  {
    id: "icat-4ch-6ch",
    title: '10" 4/6-Channel Display — EMC/EMI Test Report',
    shortDescription: "EMC/EMI compliance test report for APM's 4G-connected vehicle monitoring display.",
    longDescription:
      "The International Centre for Automotive Technology (ICAT) tested the 4/6-channel vehicle monitoring display and recording system against AIS004-Part 3:2009 EMC/EMI requirements and confirmed conformance.",
    certificateImage: "/images/certifications/icat-4ch-6ch.png",
    certificatePDF: "/certificates/icat-4ch-6ch.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT)",
    certificateNumber: "CT0MV0147",
    issueDate: "2026-02-25",
    status: "active",
    accentColor: "#38BDF8",
    displayOrder: 11,
  },
  {
    id: "icat-ai-dashcam",
    title: "AI Dashcam (Rover Dash) — EMC/EMI Test Report",
    shortDescription: "EMC/EMI compliance test report for APM's AI-powered ADAS/DMS dashcam.",
    longDescription:
      "ICAT tested the Rover Dash AI dashcam with ADAS & DMS display system against AIS004-Part 3:2009 EMC/EMI requirements and confirmed conformance.",
    certificateImage: "/images/certifications/icat-ai-dashcam.png",
    certificatePDF: "/certificates/icat-ai-dashcam.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT)",
    certificateNumber: "CT0MU0709",
    issueDate: "2025-09-17",
    status: "active",
    accentColor: "#A78BFA",
    displayOrder: 12,
  },
  {
    id: "icat-cctv",
    title: "4G WiFi Camera (Rover View) — EMC/EMI Test Report",
    shortDescription: "EMC/EMI compliance test report for APM's 4G/WiFi CCTV camera.",
    longDescription:
      "ICAT tested the Rover View 4G WiFi camera with display system against AIS004-Part 3:2009 EMC/EMI requirements and confirmed conformance.",
    certificateImage: "/images/certifications/icat-cctv.png",
    certificatePDF: "/certificates/icat-cctv.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT)",
    certificateNumber: "CT0MU0710",
    issueDate: "2025-09-17",
    status: "active",
    accentColor: "#34D399",
    displayOrder: 13,
  },
  {
    id: "hsrp-cop",
    title: "HSRP — Exemption Certificate for Conformity of Production",
    shortDescription: "Conformity of Production exemption for High Security Registration Plates ahead of commercial production.",
    longDescription:
      "Issued by ICAT under the National Automotive Board (NAB), exempting APM from Conformity of Production testing for its High Security Registration Plates, Third Registration Plate Stickers, and Snap Lock, since production had not yet commenced, per AIS-037 Clause 11.1.1.1.",
    certificateImage: "/images/certifications/hsrp-cop.png",
    certificatePDF: "/certificates/hsrp-cop.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT) / National Automotive Board",
    certificateNumber: "CC0LV6151",
    issueDate: "2026-03-06",
    expiryDate: "2027-03-31",
    status: "active",
    accentColor: "#FBBF24",
    displayOrder: 14,
  },
  {
    id: "puc-diesel",
    title: "Diesel Smoke Meter (APM CAIR SM-10) — Type Approval",
    shortDescription: "Type-approved diesel smoke meter for Pollution Under Control (PUC) testing centres.",
    longDescription:
      "Certified by the Automotive Research Association of India (ARAI) as compliant with Rule 116(3) of the Central Motor Vehicles Rules and AIS 137 Part 8, for measuring emissions from compression-ignition (diesel) engines.",
    certificateImage: "/images/certifications/puc-diesel.png",
    certificatePDF: "/certificates/puc-diesel.pdf",
    issuingAuthority: "Automotive Research Association of India (ARAI)",
    certificateNumber: "ARAI/TA(SM)/APM/APM CAIR SM-10/2425-AR9044",
    issueDate: "2024-08-02",
    expiryDate: "2029-08-02",
    status: "active",
    accentColor: "#FB7185",
    displayOrder: 15,
  },
  {
    id: "puc-gas",
    title: "4-Gas Analyzer (CAIRGA-01) — Conformity of Production",
    shortDescription: "Conformity of Production certification for APM's 4-gas emissions analyzer used at PUC centres.",
    longDescription:
      "ARAI certified that APM's CAIRGA-01 4-gas analyzer units, produced under Type Approval, comply with the Conformity of Production requirements of AIS 137 Part 8, approved by the Ministry of Road Transport & Highways.",
    certificateImage: "/images/certifications/puc-gas.png",
    certificatePDF: "/certificates/puc-gas.pdf",
    issuingAuthority: "Automotive Research Association of India (ARAI)",
    certificateNumber: "ARAI/COP-1/APM/CAIRGA-01/2526-AT9016",
    issueDate: "2026-02-27",
    expiryDate: "2028-04-25",
    status: "active",
    accentColor: "#F87171",
    displayOrder: 16,
  },
  {
    id: "tape-cop",
    title: "Retro-Reflecting Tape — Conformity of Production",
    shortDescription: "Conformity of Production certification for high-visibility retro-reflective vehicle tape.",
    longDescription:
      "ICAT certified APM's retro-reflecting tape (white, yellow & red) as meeting AIS-090 Rev.1 and AIS-037 Conformity of Production requirements.",
    certificateImage: "/images/certifications/tape-cop.png",
    certificatePDF: "/certificates/tape-cop.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT) / National Automotive Board",
    certificateNumber: "CC0LT7012",
    issueDate: "2024-11-08",
    expiryDate: "2026-09-30",
    status: "active",
    accentColor: "#FCD34D",
    displayOrder: 17,
  },
  {
    id: "wpc-rover-elite",
    title: "WPC Equipment Type Approval — Rover Elite",
    shortDescription: "Telecom equipment type approval for the Rover Elite GPS tracking device.",
    longDescription:
      "Issued by the WPC Wing, Department of Telecommunications, Government of India, granting Equipment Type Approval (ETA) for the Rover Elite GPS tracking device under self-declaration.",
    certificateImage: "/images/certifications/wpc-rover-elite.png",
    certificatePDF: "/certificates/wpc-rover-elite.pdf",
    issuingAuthority: "WPC Wing, Department of Telecommunications, Govt. of India",
    certificateNumber: "ETA-SD-20250100872",
    issueDate: "2025-01-31",
    status: "active",
    accentColor: "#60A5FA",
    displayOrder: 18,
  },
  {
    id: "sld-cop",
    title: "Speed Limiting Devices — Conformity of Production",
    shortDescription: "Conformity of Production certification covering both fuel- and electronic-controlled speed limiting devices.",
    longDescription:
      "ICAT certified APM's fuel-controlled and electronic-controlled Speed Limiting Devices (models AEST 2108 and AEST 2607) as meeting AIS-018 and AIS-037 Conformity of Production requirements.",
    certificateImage: "/images/certifications/sld-cop.png",
    certificatePDF: "/certificates/sld-cop.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT) / National Automotive Board",
    certificateNumber: "CC0GV8595",
    issueDate: "2026-04-06",
    expiryDate: "2028-03-31",
    status: "active",
    accentColor: "#C084FC",
    displayOrder: 19,
  },
  {
    id: "sld-name-change",
    title: "Speed Limiting Device — Manufacturer Name Change",
    shortDescription: "Certified extension recognizing APM Group's name change from the device's original manufacturer of record.",
    longDescription:
      "ICAT extended the existing Speed Limiting Device type approvals to reflect the manufacturing name change from Alhena Electro Soft Tech Pvt Ltd to APM Group Private Limited, confirming no impact to the production line.",
    certificateImage: "/images/certifications/sld-name-change.png",
    certificatePDF: "/certificates/sld-name-change.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT)",
    certificateNumber: "CT1GT9102",
    issueDate: "2024-08-13",
    status: "active",
    accentColor: "#93C5FD",
    displayOrder: 20,
  },
  {
    id: "sld-electronic-tac",
    title: "Electronic Speed Limiting Device — Type Approval",
    shortDescription: "Type Approval Certificate for the AEST 2607 electronic-controlled speed limiting device.",
    longDescription:
      "ICAT granted Type Approval for the cabin-mounted AEST 2607 electronic speed limiting device (60/80 km/h), under AIS-018, originally approved for Alhena Electro Soft Tech and since extended to APM Group.",
    certificateImage: "/images/certifications/sld-electronic-tac.png",
    certificatePDF: "/certificates/sld-electronic-tac.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT)",
    certificateNumber: "CJ5085",
    issueDate: "2018-04-17",
    status: "active",
    accentColor: "#7DD3FC",
    displayOrder: 21,
  },
  {
    id: "sld-fuel-tac",
    title: "Fuel-Controlled Speed Limiting Device — Type Approval",
    shortDescription: "Type Approval Certificate for the AEST 2108 fuel-controlled speed limiting device.",
    longDescription:
      "ICAT granted Type Approval for the engine-mounted AEST 2108 fuel-controlled speed limiting device (40/60/80 km/h), under AIS-018, originally approved for Alhena Electro Soft Tech and since extended to APM Group.",
    certificateImage: "/images/certifications/sld-fuel-tac.png",
    certificatePDF: "/certificates/sld-fuel-tac.pdf",
    issuingAuthority: "International Centre for Automotive Technology (ICAT)",
    certificateNumber: "CJ5088",
    issueDate: "2018-04-17",
    status: "active",
    accentColor: "#FDBA74",
    displayOrder: 22,
  },
  {
    id: "ewaste",
    title: "E-Waste EPR Registration Certificate",
    shortDescription: "Extended Producer Responsibility registration for electronic display panel waste management.",
    longDescription:
      "Registered with the Central Pollution Control Board (CPCB) under the E-Waste (Management) Rules, 2022, committing APM to yearly e-waste recycling targets for electronic display panels/boards it places on the market.",
    certificateImage: "/images/certifications/ewaste.png",
    certificatePDF: "/certificates/ewaste.pdf",
    issuingAuthority: "Central Pollution Control Board (CPCB)",
    certificateNumber: "B-29016(14015)(EPR-Registration)/25/WM-III",
    issueDate: "2026-06-08",
    expiryDate: "2031-06-08",
    status: "active",
    accentColor: "#4ADE80",
    displayOrder: 23,
  },
  {
    id: "epr",
    title: "Plastic Waste EPR Registration — Importer",
    shortDescription: "Extended Producer Responsibility registration as a plastic-packaging importer.",
    longDescription:
      "Registered with the Central Pollution Control Board (CPCB) under the Plastic Waste Management Rules, 2016, recognizing APM as an importer with EPR obligations for plastic packaging introduced to market.",
    certificateImage: "/images/certifications/epr.png",
    certificatePDF: "/certificates/epr.pdf",
    issuingAuthority: "Central Pollution Control Board (CPCB)",
    certificateNumber: "IM-05-000-06-AAZCA9988M-25",
    issueDate: "2025-06-05",
    status: "active",
    accentColor: "#86EFAC",
    displayOrder: 24,
  },
  {
    id: "iec",
    title: "Importer-Exporter Code Certificate",
    shortDescription: "Government-issued code authorizing APM to import and export goods.",
    longDescription:
      "Issued by the Directorate General of Foreign Trade (DGFT), Ministry of Commerce and Industry, granting APM Group Private Limited an Importer-Exporter Code (IEC) for international trade.",
    certificateImage: "/images/certifications/iec.png",
    certificatePDF: "/certificates/iec.pdf",
    issuingAuthority: "Directorate General of Foreign Trade (DGFT)",
    certificateNumber: "AAZCA9988M",
    issueDate: "2024-02-20",
    status: "active",
    accentColor: "#FDE047",
    displayOrder: 25,
  },
  {
    id: "startup-india",
    title: "Startup India — Certificate of Recognition",
    shortDescription: "Official recognition as a startup under the Government of India's Startup India initiative.",
    longDescription:
      "Recognized by the Department for Promotion of Industry and Internal Trade (DPIIT) as a startup in the Technology Hardware / Electronics sector, valid for ten years from incorporation subject to turnover conditions.",
    certificateImage: "/images/certifications/startup-india.png",
    certificatePDF: "/certificates/startup-india.pdf",
    issuingAuthority: "Dept. for Promotion of Industry and Internal Trade (DPIIT)",
    certificateNumber: "DIPP221880",
    issueDate: "2025-09-17",
    expiryDate: "2034-01-14",
    status: "active",
    accentColor: "#F472B6",
    displayOrder: 26,
  },
];

/**
 * Async on purpose: this is the single seam to swap for a real API/CMS call
 * later (e.g. `fetch("/api/certificates")`). No component changes needed
 * when that happens — only this function's body. Results are sorted by
 * displayOrder so reordering the CMS reorders the showcase automatically.
 */
export async function getCertificates(): Promise<Certificate[]> {
  return [...certificates].sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getCertificateById(id: string): Promise<Certificate | undefined> {
  const all = await getCertificates();
  return all.find((c) => c.id === id);
}
