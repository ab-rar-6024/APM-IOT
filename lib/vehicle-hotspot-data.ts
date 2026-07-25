export type LineType = "curve" | "straight" | "elbow";
export type LineAnimation = "draw" | "pulse" | "none";
export type LineStyle = "solid" | "dashed";

export interface HotspotProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
  /** % position of the anchor point on the truck image */
  truckAnchor: { x: number; y: number };
  /** % position of the floating product hotspot card */
  position: { x: number; y: number };
  lineStyle: LineStyle;
  lineColor: string;
  lineWidth: number;
  lineType: LineType;
  animation: LineAnimation;
  visible: boolean;
  order: number;
  description?: string;
}

export interface VehicleHotspotConfig {
  truckImage: string;
  products: HotspotProduct[];
}

const vehicleHotspotConfig: VehicleHotspotConfig = {
  truckImage: "/images/solutions/vehicle-truck-realistic.png",
  products: [
    {
      id: "gps-tracker",
      name: "Rover Elite",
      slug: "rover-elite",
      image: "/images/verticals/frame-7114.png",
      truckAnchor: { x: 35, y: 22 },
      position: { x: 16, y: 6 },
      lineStyle: "solid",
      lineColor: "#2F8FEF",
      lineWidth: 1.75,
      lineType: "curve",
      animation: "draw",
      visible: true,
      order: 1,
      description: "Advanced GPS tracking with real-time location and telemetry.",
    },
    {
      id: "ai-camera",
      name: "Rover View",
      slug: "rover-view",
      image: "/images/verticals/frame-7123.png",
      truckAnchor: { x: 26, y: 42 },
      position: { x: 4, y: 40 },
      lineStyle: "solid",
      lineColor: "#2F8FEF",
      lineWidth: 1.75,
      lineType: "curve",
      animation: "draw",
      visible: true,
      order: 2,
      description: "AI-powered dash camera for driver safety and incident recording.",
    },
    {
      id: "headlight-sensor",
      name: "Auto Dipper Sensor",
      slug: "auto-dipper-sensor",
      image: "/images/verticals/frame-7116.png",
      truckAnchor: { x: 14, y: 66 },
      position: { x: 8, y: 90 },
      lineStyle: "solid",
      lineColor: "#2F8FEF",
      lineWidth: 1.75,
      lineType: "curve",
      animation: "draw",
      visible: true,
      order: 3,
      description: "Automatic headlight dimming for enhanced night driving safety.",
    },
    {
      id: "speed-governor",
      name: "Speed Limiting Devices",
      slug: "speed-limiting-device",
      image: "/images/verticalb2c/frame-7113.png",
      truckAnchor: { x: 46, y: 74 },
      position: { x: 38, y: 96 },
      lineStyle: "solid",
      lineColor: "#2F8FEF",
      lineWidth: 1.75,
      lineType: "elbow",
      animation: "draw",
      visible: true,
      order: 4,
      description: "Enforces safe driving speeds to comply with regulations.",
    },
    {
      id: "conspicuity-tape",
      name: "Vehicle Conspicuity Tape",
      slug: "vehicle-conspicuity-tape",
      image: "/images/verticalb2c/frame-7116.png",
      truckAnchor: { x: 68, y: 44 },
      position: { x: 74, y: 12 },
      lineStyle: "dashed",
      lineColor: "#2F8FEF",
      lineWidth: 1.5,
      lineType: "curve",
      animation: "draw",
      visible: true,
      order: 5,
      description: "High-visibility reflective tape for night-time safety.",
    },
    {
      id: "rear-camera",
      name: "4G/WiFi Vandal Proof Camera",
      slug: "vandal-proof-camera",
      image: "/images/verticalb2c/frame-7115.png",
      truckAnchor: { x: 90, y: 50 },
      position: { x: 96, y: 44 },
      lineStyle: "solid",
      lineColor: "#2F8FEF",
      lineWidth: 1.75,
      lineType: "curve",
      animation: "draw",
      visible: true,
      order: 6,
      description: "Rugged exterior camera for blind-spot monitoring.",
    },
    {
      id: "reverse-parking",
      name: "Reverse Parking System",
      slug: "reverse-parking-system",
      image: "/images/verticalb2c/frame-7117.png",
      truckAnchor: { x: 86, y: 76 },
      position: { x: 90, y: 94 },
      lineStyle: "solid",
      lineColor: "#2F8FEF",
      lineWidth: 1.75,
      lineType: "curve",
      animation: "draw",
      visible: true,
      order: 7,
      description: "Sensors and alerts to prevent reversing accidents.",
    },
  ],
};

/**
 * Async on purpose: this is the single seam to swap for a real API/CMS call
 * later (e.g. `fetch("/api/vehicle-hotspots")`). No component changes needed
 * when that happens — only this function's body.
 */
export async function getVehicleHotspotConfig(): Promise<VehicleHotspotConfig> {
  return vehicleHotspotConfig;
}
