export interface ProductCategory {
  id: string;
  label: string;
  products: string[]; // List of unique product names to display in this category
}

// 10 categories covering all 26 existing products plus new products pending detail pages
// (products with no matching entry in solutions-data.ts render as placeholder tiles)
export const productCategories: ProductCategory[] = [
  {
    id: "connected-mobility",
    label: "Connected Mobility",
    products: [
      "Rover Elite",
      "Rover Elite+",
      "Rover Asset",
      "AIS 140 GPS",
      "AIS 140 4G OEM Device",
      "IoT M2M – E-SIM"
    ]
  },
  {
    id: "ai-vision-systems",
    label: "AI Vision Systems",
    products: [
      "Rover View",
      "Rover AI Dash Cam",
      "Mobile DVR",
      "4 Channel Recording Display Set",
      "7'' Smart Recording Monitor",
      "4G/WiFi Vandal Proof Camera"
    ]
  },
  {
    id: "fleet-intelligence",
    label: "Fleet Intelligence",
    products: ["Prime Load", "Advanced Fuel Management System"]
  },
  {
    id: "vehicle-safety",
    label: "Vehicle Safety",
    products: [
      "Nexus Smart Safety ECU",
      "Auto Dipper Sensor",
      "Reverse Parking System",
      "Speed Limiting Devices"
    ]
  },
  {
    id: "ev-power-electronics",
    label: "EV & Power Electronics",
    products: ["DC to DC Converter", "BMS Card"]
  },
  {
    id: "compliance-solutions",
    label: "Compliance Solutions",
    products: [
      "High Security Registration Plate",
      "Pollution Machine",
      "Auto Fare Meter",
      "Vehicle Conspicuity Tape"
    ]
  },
  {
    id: "road-safety-products",
    label: "Road Safety Products",
    products: [
      "Traffic Cone",
      "Safety Jacket",
      "Construction Worker Jacket",
      "Permanent Signs",
      "Temporary Work Signs",
      "Delineator"
    ]
  }
];

// Images for products that don't yet have a full entry in lib/solutions-data.ts.
// Sourced from the closest related real product shot on apmgroups.in where one exists;
// products with no reasonable real-photo match are omitted and fall back to an icon tile.
export const placeholderProductImages: Record<string, string> = {
  "Rover AI Dash Cam": "/images/verticalb2c/frame-7115.png",
  "Mobile DVR": "/images/verticalb2c/frame-7115.png",
  "4 Channel Recording Display Set": "/images/verticalb2c/frame-7115.png",
  "7'' Smart Recording Monitor": "/images/verticalb2c/frame-7115.png",
  "APM Connect (Enterprise Fleet Platform)": "/images/software/dashboard.png",
  "Rover Connect (Consumer Platform)": "/images/software/dashboard.png"
};

// Category representative product images for the products navbar dropdown
export const categoryImages: Record<string, string> = {
  "connected-mobility": "/images/verticals/frame-7114.png",
  "ai-vision-systems": "/images/verticalb2c/frame-7115.png",
  "fleet-intelligence": "/images/verticals/frame-7120.png",
  "vehicle-safety": "/images/verticals/frame-7116.png",
  "ev-power-electronics": "/images/verticals/frame-7121.png",
  "software-platforms": "/images/software/dashboard.png",
  "compliance-solutions": "/images/verticals/frame-7122.png",
  "road-safety-products": "/images/verticalb2g/frame-7113.png",
  "manufacturing-solutions": "/images/verticalb2g/frame-7118.png",
  "intelligent-testing-systems": "/images/verticalb2g/frame-7119.png"
};
