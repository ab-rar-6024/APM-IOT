export interface Hotspot {
  id: string;
  name: string;
  description: string;
  x: number; // percentage from left for hotspot on image
  y: number; // percentage from top for hotspot on image
  cardX: number; // percentage from left for product card circle
  cardY: number; // percentage from top for product card circle
  productSlug?: string;
  side: "left" | "right";
}

export interface CategoryHotspots {
  categorySlug: string;
  baseImage: string;
  hotspots: Hotspot[];
}

export const categoryHotspotsList: CategoryHotspots[] = [
  {
    categorySlug: "vehicle-solutions",
    baseImage: "/images/solutions/vehicle-semi-truck-realistic.png",
    hotspots: [
      {
        id: "rear-camera",
        name: "Rear Camera",
        description: "Rugged trailer back coverage",
        x: 9,
        y: 27,
        cardX: 9,
        cardY: 27,
        productSlug: "vandal-proof-camera",
        side: "left"
      },
      {
        id: "cargo-camera",
        name: "Cargo Camera",
        description: "Prevention of freight theft",
        x: 21,
        y: 20,
        cardX: 21,
        cardY: 20,
        productSlug: "vandal-proof-camera",
        side: "left"
      },
      {
        id: "side-bsd-i",
        name: "Side BSD Camera I",
        description: "Blind spot warning sensor",
        x: 44,
        y: 22,
        cardX: 44,
        cardY: 22,
        productSlug: "reverse-parking-system",
        side: "left"
      },
      {
        id: "adas-camera",
        name: "ADAS Camera",
        description: "LDW, FCW, Pedestrian warning",
        x: 66,
        y: 18,
        cardX: 66,
        cardY: 18,
        productSlug: "rover-view",
        side: "right"
      },
      {
        id: "dms-camera",
        name: "DMS Camera",
        description: "Smoking, distraction fatigue alerts",
        x: 80,
        y: 32,
        cardX: 80,
        cardY: 32,
        productSlug: "rover-view",
        side: "right"
      },
      {
        id: "vga-display",
        name: "VGA Display",
        description: "7 inch dashboard monitor",
        x: 83,
        y: 49,
        cardX: 83,
        cardY: 49,
        productSlug: "rover-view",
        side: "right"
      },
      {
        id: "front-bsd-camera",
        name: "Front BSD Camera",
        description: "Front radar side alert",
        x: 82,
        y: 64,
        cardX: 82,
        cardY: 64,
        productSlug: "reverse-parking-system",
        side: "right"
      },
      {
        id: "mobile-dvr",
        name: "Mobile DVR-ED08R",
        description: "8 ch recording and playback",
        x: 79,
        y: 82,
        cardX: 79,
        cardY: 82,
        productSlug: "rover-view",
        side: "right"
      },
      {
        id: "side-bsd-ii",
        name: "Side BSD Camera II",
        description: "Lower cab side blind check",
        x: 62,
        y: 88,
        cardX: 62,
        cardY: 88,
        productSlug: "reverse-parking-system",
        side: "right"
      },
      {
        id: "fuel-sensor",
        name: "Fuel Sensor",
        description: "Prevention of oil theft",
        x: 49,
        y: 90,
        cardX: 49,
        cardY: 90,
        productSlug: "rover-elite-plus",
        side: "left"
      },
      {
        id: "siren",
        name: "Siren",
        description: "Audible and visual alarm",
        x: 30,
        y: 82,
        cardX: 30,
        cardY: 82,
        productSlug: "rover-elite-plus",
        side: "left"
      },
      {
        id: "door-detection",
        name: "Door Detection",
        description: "Prevention of freight theft",
        x: 23,
        y: 90,
        cardX: 23,
        cardY: 90,
        productSlug: "rover-elite-plus",
        side: "left"
      },
      {
        id: "weight-sensor",
        name: "Weight Sensor",
        description: "Prevent overweight citation",
        x: 9,
        y: 80,
        cardX: 9,
        cardY: 80,
        productSlug: "prime-load",
        side: "left"
      }
    ]
  },
  {
    categorySlug: "workplace-safety",
    baseImage: "/images/solutions/workplace-safety-realistic.png",
    hotspots: [
      {
        id: "safety-vest",
        name: "Safety Vest / Jacket",
        description: "Class 2 high-vis crew jacket",
        x: 52,
        y: 55,
        cardX: 58,
        cardY: 6,
        productSlug: "safety-jacket",
        side: "left"
      },
      {
        id: "traffic-cone",
        name: "Traffic Cone",
        description: "Weighted wind-resistant base",
        x: 22,
        y: 70,
        cardX: 10,
        cardY: 65,
        productSlug: "traffic-cone",
        side: "right"
      },
      {
        id: "flexible-delineator",
        name: "Flexible Delineator",
        description: "Spring-back impact recovery post",
        x: 78,
        y: 65,
        cardX: 75,
        cardY: 60,
        productSlug: "delineator",
        side: "left"
      },
      {
        id: "work-signage",
        name: "Reflective Signage",
        description: "Quick-deploy folding warning sign",
        x: 42,
        y: 35,
        cardX: 15,
        cardY: 32,
        productSlug: "temporary-work-signs",
        side: "right"
      }
    ]
  },
  {
    categorySlug: "automated-testing-solutions",
    baseImage: "/images/solutions/automated-testing-solutions.png",
    hotspots: [
      {
        id: "brake-tester",
        name: "Speed & Brake Tester",
        description: "Automated roller bed fitness check",
        x: 25,
        y: 62,
        cardX: 12,
        cardY: 55,
        productSlug: "automated-testing-lane",
        side: "left"
      },
      {
        id: "headlight-tester",
        name: "Headlight Alignment Tester",
        description: "Optical beam deviation checks",
        x: 52,
        y: 48,
        cardX: 55,
        cardY: 18,
        productSlug: "automated-testing-lane",
        side: "right"
      },
      {
        id: "emission-analyzer",
        name: "Gas & Smoke Analyzer",
        description: "Database-linked emissions probe",
        x: 78,
        y: 58,
        cardX: 76,
        cardY: 52,
        productSlug: "pollution-machine",
        side: "left"
      },
      {
        id: "automated-track",
        name: "Automated Driving Test Track",
        description: "Sensor-scored license track",
        x: 62,
        y: 28,
        cardX: 45,
        cardY: 10,
        productSlug: "automated-test-driving-track",
        side: "right"
      }
    ]
  },
  {
    categorySlug: "printing-identification-solutions",
    baseImage: "/images/solutions/printing-identification.png",
    hotspots: [
      {
        id: "tamper-hsrp",
        name: "High Security Registration Plate",
        description: "Tamper-proof HSRP snap locks",
        x: 32,
        y: 45,
        cardX: 15,
        cardY: 35,
        productSlug: "high-security-registration-plate",
        side: "left"
      },
      {
        id: "id-printer",
        name: "Secure Document Printer",
        description: "Tamper-evident license and ID printer",
        x: 58,
        y: 35,
        cardX: 62,
        cardY: 15,
        productSlug: "printing-solution",
        side: "right"
      },
      {
        id: "label-printer",
        name: "Industrial Label Printer",
        description: "High-speed rugged barcode printer",
        x: 76,
        y: 52,
        cardX: 75,
        cardY: 48,
        productSlug: "industrial-label-printer",
        side: "left"
      },
      {
        id: "rfid-system",
        name: "Asset ID Tag System",
        description: "RFID registry auditing tags",
        x: 22,
        y: 68,
        cardX: 12,
        cardY: 65,
        productSlug: "asset-id-tag-system",
        side: "right"
      }
    ]
  }
];

export function getCategoryHotspots(slug: string): CategoryHotspots | undefined {
  return categoryHotspotsList.find((c) => c.categorySlug === slug);
}
