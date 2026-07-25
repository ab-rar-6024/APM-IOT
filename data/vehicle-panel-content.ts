import { PRODUCTS, type ProductType } from "./vehicle-apm-config";

export interface VehiclePanelContent {
  vehicleId: "truck" | "bus" | "taxi";
  shortDescription: string;
  howItWorks: string[];
  businessBenefits: { title: string; description: string }[];
  /** Product ids (from PRODUCTS) surfaced as this vehicle's "Key Features" and used to compute ROI. */
  highlightProductIds: string[];
  /** Estimated hardware + install cost per vehicle, INR — used by the ROI calculator. */
  roiPackageCost: number;
}

export const VEHICLE_PANEL_CONTENT: Record<string, VehiclePanelContent> = {
  truck: {
    vehicleId: "truck",
    shortDescription:
      "Engineered for maximum haulage efficiency, fleet utilization, and heavy road safety standards.",
    howItWorks: [
      "AIS-140 GPS, an AI camera, and axle/fuel sensors are installed across the cab and chassis by APM's certified dealer network, typically within a single service window.",
      "Location, fuel level, axle load, and tyre pressure stream continuously into one fleet dashboard instead of separate systems.",
      "Dispatchers get automated alerts the moment fuel theft, overloading, or driver fatigue is detected — instead of discovering it after the fact."
    ],
    businessBenefits: [
      { title: "Stop Fuel Pilferage", description: "Capacitive fuel sensors catch drainage and theft events within seconds, auditing fuel bills to 99% accuracy." },
      { title: "Avoid Overloading Fines", description: "Axle-load sensors flag overweight cargo before it becomes a legal metrology violation." },
      { title: "Cut Accident Risk", description: "AI fatigue detection and tyre-pressure monitoring reduce collision rates and blowout risk on long hauls." },
      { title: "Prove AIS-140 Compliance", description: "Certified GPS tracking reports directly to RTO VAHAN servers, satisfying government mandates automatically." }
    ],
    highlightProductIds: [
      "ais-140-gps",
      "ai-camera",
      "fuel-sensor",
      "payload-monitoring",
      "tpms",
      "temp-sensor",
      "reflective-tape",
      "hsrp",
      "auto-dipper"
    ],
    // Full 9-device hardware + install package for this feature set (was priced for a 5-device
    // subset before the Key Features table expanded to cover all 8 bespoke simulators).
    roiPackageCost: 50000
  },
  bus: {
    vehicleId: "bus",
    shortDescription:
      "Optimized for child safety, strict RTO compliance, school routing, and active collision avoidance.",
    howItWorks: [
      "GPS tracking, an AI cabin camera, and an electronic speed governor are fitted to the bus and wired into a single telematics harness.",
      "Location, speed, and driver behaviour report live to transport authorities and school administrators on one dashboard.",
      "Panic buttons and reverse sonar give drivers and dispatchers an instant escalation path the moment something goes wrong."
    ],
    businessBenefits: [
      { title: "Meet School Bus Code", description: "AIS-140 tracking and an electronic speed governor satisfy the mandated School Bus Safety Code in one install." },
      { title: "Protect Every Child Onboard", description: "AI cameras flag driver fatigue and lane drift before an incident, not after." },
      { title: "Faster Emergency Response", description: "Silent panic buttons alert dispatch with live coordinates the instant a driver or attendant needs help." },
      { title: "Eliminate Reversing Accidents", description: "Ultrasonic reverse sonar cuts loading-bay and schoolyard collisions during pickup and drop-off." }
    ],
    highlightProductIds: [
      "ais-140-gps",
      "ai-camera",
      "speed-limiter",
      "panic-button",
      "reverse-parking",
      "fuel-sensor",
      "reflective-tape",
      "hsrp",
      "auto-dipper"
    ],
    // Full 9-device hardware + install package for this feature set.
    roiPackageCost: 38000
  },
  taxi: {
    vehicleId: "taxi",
    shortDescription:
      "Built for smart urban dispatch, battery monitoring, fare automation, and high daily uptime.",
    howItWorks: [
      "A GPS unit, AI dashcam, and EV-specific battery management card are installed alongside the vehicle's existing electronics.",
      "Battery cell voltage, charge state, and location stream continuously, so dispatch always knows where a cab is and how much range it has left.",
      "Thermal and voltage anomalies trigger an alert before they become a breakdown or a safety incident."
    ],
    businessBenefits: [
      { title: "Prevent Battery Failures", description: "Cell-level thermal monitoring stops runaway events before they start, extending battery life by up to 30%." },
      { title: "Maximise Daily Uptime", description: "Real-time range and charge visibility keeps dispatch routing cabs efficiently instead of guessing." },
      { title: "Stable Cabin Electronics", description: "A dedicated DC-DC converter protects dash screens and telemetry from auxiliary power drops." },
      { title: "EV Commercial Compliance", description: "GPS tracking and battery safety hardware together meet EV commercial fleet certification requirements." }
    ],
    highlightProductIds: ["ais-140-gps", "ai-camera", "bms-card", "tpms", "dc-converter", "hsrp", "auto-dipper"],
    // Full 7-device hardware + install package for this feature set.
    roiPackageCost: 32000
  }
};

export function getHighlightProducts(content: VehiclePanelContent): ProductType[] {
  return content.highlightProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is ProductType => Boolean(p));
}

export function getRoiPerVehicleSavings(content: VehiclePanelContent): number {
  return getHighlightProducts(content).reduce((sum, p) => sum + p.savingsImpact, 0);
}
