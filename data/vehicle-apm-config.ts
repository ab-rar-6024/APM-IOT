export interface SpecItem {
  label: string;
  value: string;
}

export interface VehicleType {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  image: string;
  baseUptime: number;
  baseFuelWaste: number;
  baseSafetyScore: number;
  baseCompliance: string;
  features: string[];
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  image: string;
  iconName: string;
  desc: string;
  compatibility: string[];
  compatLabel: string;
  benefit: string;
  location: string;
  howItWorks: string;
  benefits: string[];
  industries: string[];
  compliance: string;
  installTime: string;
  uptimeImpact: number;
  fuelImpact: number;
  safetyImpact: number;
  savingsImpact: number;
  specs: SpecItem[];
  features: string[];
  anchors: Record<string, { x: number; y: number }>;
}

export const VEHICLES: VehicleType[] = [
  {
    id: "truck",
    name: "Heavy Cargo Transporter",
    tagline: "Long-haul freight platform",
    desc: "Engineered for maximum haulage efficiency, fleet utilization, and heavy road safety standards.",
    image: "/images/solutions/vehicle-truck-realistic.png",
    baseUptime: 82,
    baseFuelWaste: 18,
    baseSafetyScore: 68,
    baseCompliance: "Non-Compliant",
    features: ["Heavy Cargo Frame", "Multi-axle suspension", "Diesel Engine Type"],
  },
  {
    id: "bus",
    name: "Smart Transit School Bus",
    tagline: "High-occupancy passenger carrier",
    desc: "Optimized for child safety, strict RTO compliance, school routing, and active collision avoidance.",
    image: "/images/solutions/smart_school_bus_real.jpg",
    baseUptime: 86,
    baseFuelWaste: 14,
    baseSafetyScore: 72,
    baseCompliance: "Partially Compliant",
    features: ["Steel Cage Protection", "High Passenger Capacity", "Manual/Automatic Transmission"],
  },
  {
    id: "taxi",
    name: "Electric Urban Cruiser",
    tagline: "Zero-emission commercial passenger cab",
    desc: "Built for smart urban dispatch, battery monitoring, fare automation, and high daily uptime.",
    image: "/images/solutions/smart_taxi_cab_real.jpg",
    baseUptime: 90,
    baseFuelWaste: 8,
    baseSafetyScore: 78,
    baseCompliance: "Compliant",
    features: ["Electric Powertrain", "Lithium LFP Battery Pack", "Compact Urban Footprint"],
  },
  {
    id: "mining-truck",
    name: "Mining Haul Dump Truck",
    tagline: "Off-road quarry & mine-haul platform",
    desc: "Built for extreme payload cycles across quarry and mine-haul roads, with rugged axle loads and high-risk terrain safety demands.",
    // TODO: placeholder photo (reused truck asset) — swap for real mining-truck photography once available.
    image: "/images/solutions/vehicle-semi-truck-realistic.png",
    baseUptime: 70,
    baseFuelWaste: 26,
    baseSafetyScore: 58,
    baseCompliance: "Non-Compliant",
    features: ["Reinforced Dump Chassis", "Off-road Suspension", "High-Torque Diesel Engine"],
  },
  {
    id: "construction-vehicle",
    name: "Construction Site Hauler",
    tagline: "Heavy-load aggregate & materials transporter",
    desc: "Engineered for on-site material transport, frequent overload risk, and rugged jobsite duty cycles.",
    // TODO: placeholder photo (reused truck asset) — swap for real construction-vehicle photography once available.
    image: "/images/solutions/vehicle-truck-realistic.png",
    baseUptime: 76,
    baseFuelWaste: 20,
    baseSafetyScore: 62,
    baseCompliance: "Non-Compliant",
    features: ["Reinforced Flatbed Frame", "Aggregate Load Bed", "Heavy-Duty Axles"],
  },
  {
    id: "passenger-vehicle",
    name: "Executive Passenger Sedan",
    tagline: "Corporate & private passenger transport",
    desc: "Optimized for corporate travel, driver accountability, and premium passenger safety standards.",
    // TODO: placeholder photo (reused taxi asset) — swap for real passenger-vehicle photography once available.
    image: "/images/solutions/smart_taxi_cab.png",
    baseUptime: 92,
    baseFuelWaste: 6,
    baseSafetyScore: 80,
    baseCompliance: "Compliant",
    features: ["Lightweight Monocoque Frame", "Petrol/Hybrid Powertrain", "Premium Cabin Comfort"],
  },
  {
    id: "industrial-vehicle",
    name: "Industrial Utility Carrier",
    tagline: "Factory yard & logistics utility platform",
    desc: "Designed for warehouse-to-dock utility runs, frequent stop-start cycles, and industrial safety compliance.",
    // TODO: placeholder photo (reused truck asset) — swap for real industrial-vehicle photography once available.
    image: "/images/solutions/vehicle-semi-truck-realistic.png",
    baseUptime: 84,
    baseFuelWaste: 16,
    baseSafetyScore: 70,
    baseCompliance: "Partially Compliant",
    features: ["Utility Flatbed Design", "Low-Speed Yard Drivetrain", "Reinforced Loading Deck"],
  },
];

export const PRODUCTS: ProductType[] = [
  {
    id: "ais-140-gps",
    name: "AIS-140 GPS",
    slug: "rover-elite",
    image: "/images/verticals/frame-7114.png",
    iconName: "navigation",
    desc: "Government-mandated, high-precision VLTD tracking device reporting directly to national servers.",
    compatibility: ["truck", "bus", "taxi", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Government VLTD Track",
    location: "Dashboard Cab Assembly",
    howItWorks: "Streams encrypted location, speed, and emergency triggers via secure 4G eSIM to RTO VAHAN backend servers.",
    benefits: ["100% regulatory compliance", "Real-time dispatch control", "Reduces theft risk by 90%"],
    industries: ["Logistics", "Passenger Transit", "Construction", "Mining"],
    compliance: "AIS-140 Certified / CDAC Approved",
    installTime: "45 Minutes",
    uptimeImpact: 6,
    fuelImpact: -4,
    safetyImpact: 4,
    savingsImpact: 18000,
    specs: [
      { label: "Connectivity", value: "4G LTE / 2G fallback" },
      { label: "Positioning", value: "GPS + GLONASS" },
      { label: "Certification", value: "AIS-140 Compliant" },
      { label: "Battery Backup", value: "Embedded, 5-hour operational" }
    ],
    features: ["SOS panic alert buttons", "Tamper detection alerts", "Integrated eSIM"],
    anchors: {
      truck: { x: 35, y: 22 },
      bus: { x: 45, y: 15 },
      taxi: { x: 48, y: 28 },
      "mining-truck": { x: 35, y: 22 },
      "construction-vehicle": { x: 35, y: 22 },
      "passenger-vehicle": { x: 48, y: 28 },
      "industrial-vehicle": { x: 35, y: 22 }
    }
  },
  {
    id: "ai-camera",
    name: "AI Camera System",
    slug: "rover-view",
    image: "/images/verticals/frame-7123.png",
    iconName: "tv",
    desc: "AI dashcam with built-in neural unit analyzing driver attentiveness, fatigue, and lane alignment.",
    compatibility: ["truck", "bus", "taxi", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Fatigue & lane warning",
    location: "Windshield Glass Center",
    howItWorks: "Tracks driver pupil dilation, yawns, and gaze direction via high-speed infrared lens, triggering acoustic alarm on fatigue.",
    benefits: ["Reduces collision rates by 40%", "Protects cargo assets", "Lower insurance claim costs"],
    industries: ["Logistics", "Hazmat Transport", "Public Transit"],
    compliance: "ISO 27001 / Safety Audited",
    installTime: "60 Minutes",
    uptimeImpact: 4,
    fuelImpact: -2,
    safetyImpact: 20,
    savingsImpact: 14000,
    specs: [
      { label: "Resolution", value: "1080p Full HD Video" },
      { label: "Lens Angle", value: "140° Wide Angle view" },
      { label: "Processor", value: "NPU Edge processor" },
      { label: "Upload Mode", value: "4G / Wi-Fi secure backup" }
    ],
    features: ["Fatigue sensor alerts", "Lane departure checking", "Continuous cabin loops"],
    anchors: {
      truck: { x: 26, y: 42 },
      bus: { x: 20, y: 35 },
      taxi: { x: 30, y: 38 },
      "mining-truck": { x: 26, y: 42 },
      "construction-vehicle": { x: 26, y: 42 },
      "passenger-vehicle": { x: 30, y: 38 },
      "industrial-vehicle": { x: 26, y: 42 }
    }
  },
  {
    id: "fuel-sensor",
    name: "Fuel Level Sensor",
    slug: "rover-elite-plus",
    image: "/images/solutions/fuel-monitoring.png",
    iconName: "gauge",
    desc: "High-accuracy capacitive fuel rod monitoring pilferage, drainage, and idling consumption.",
    compatibility: ["truck", "bus", "mining-truck", "construction-vehicle", "industrial-vehicle"],
    compatLabel: "Diesel Vehicles",
    benefit: "Stop fuel theft",
    location: "Main Diesel Tank Chamber",
    howItWorks: "Measures fuel volume changes via capacitive dielectric variance, flagging theft drain events within seconds.",
    benefits: ["Eliminates fuel pilferage", "Audits fuel bill accuracy by 99%", "Monitors idle fuel wastes"],
    industries: ["Logistics", "Mining Operations", "Construction"],
    compliance: "ATEX Flame-Proof / IP67 Rating",
    installTime: "90 Minutes",
    uptimeImpact: 3,
    fuelImpact: -6,
    safetyImpact: 0,
    savingsImpact: 22000,
    specs: [
      { label: "Accuracy", value: "99.2% fuel detection" },
      { label: "Sensor type", value: "Capacitive rod probe" },
      { label: "Link Interface", value: "Analog / RS485 data line" },
      { label: "Operating Temp", value: "-40°C to 80°C" }
    ],
    features: ["Real-time fuel levels", "Sudden drainage alarms", "Fuel audit summaries"],
    anchors: {
      truck: { x: 48, y: 82 },
      bus: { x: 52, y: 84 },
      "mining-truck": { x: 48, y: 82 },
      "construction-vehicle": { x: 48, y: 82 },
      "industrial-vehicle": { x: 48, y: 82 }
    }
  },
  {
    id: "payload-monitoring",
    name: "Payload Monitor",
    slug: "prime-load",
    image: "/images/solutions/payload-monitoring.png",
    iconName: "scale",
    desc: "Axle leaf sensor system measuring physical weight load to prevent suspension wear & cargo fines.",
    compatibility: ["truck", "mining-truck", "construction-vehicle"],
    compatLabel: "Heavy & Mining Trucks",
    benefit: "Weight overloading check",
    location: "Chassis Suspension Axles",
    howItWorks: "Gauges mechanical axle bending strain, generating warning alerts when load limits are exceeded.",
    benefits: ["Avoids heavy axle overloading fines", "Reduces suspension wears by 25%", "Improves braking stability"],
    industries: ["Mining Operations", "Bulk Cargo", "Construction"],
    compliance: "Legal Metrology Standards",
    installTime: "120 Minutes",
    uptimeImpact: 8,
    fuelImpact: -2,
    safetyImpact: 8,
    savingsImpact: 25000,
    specs: [
      { label: "Sensor Style", value: "Strain gauge axle leaves" },
      { label: "Limit Precision", value: "±2.5% maximum error" },
      { label: "Telemetry link", value: "RS232 telemetry out" },
      { label: "Material", value: "Hardened spring steel" }
    ],
    features: ["Axle balance diagnostics", "Overload warnings", "Suspension load reports"],
    anchors: {
      truck: { x: 75, y: 76 },
      "mining-truck": { x: 75, y: 76 },
      "construction-vehicle": { x: 75, y: 76 }
    }
  },
  {
    id: "speed-limiter",
    name: "Speed Limiter",
    slug: "speed-limiting-device",
    image: "/images/verticalb2c/frame-7113.png",
    iconName: "shield",
    desc: "Electronic throttle speed governor restricting peak velocities to comply with government limits.",
    compatibility: ["truck", "bus", "mining-truck", "construction-vehicle", "industrial-vehicle"],
    compatLabel: "Heavy Vehicles",
    benefit: "Speed governance RTO",
    location: "Engine Cabin Intake Throttle",
    howItWorks: "Controls fuel flow or throttle body inputs to limit maximum road velocity to set RTO guidelines.",
    benefits: ["Enforces safe driving speeds", "Improves fuel economy by 8%", "Prunes tire wear and drag"],
    industries: ["Logistics", "Hazmat Transport", "School Transit"],
    compliance: "AIS-018 Speed Governor Compliant",
    installTime: "45 Minutes",
    uptimeImpact: 4,
    fuelImpact: -5,
    safetyImpact: 10,
    savingsImpact: 11000,
    specs: [
      { label: "Control method", value: "Fuel control valve override" },
      { label: "Precision", value: "±2 km/h precision" },
      { label: "Diagnostics", value: "Anti-tamper shell housing" },
      { label: "Standard", value: "Government approved" }
    ],
    features: ["Fail-safe throttle default", "No-jerk deceleration control", "Tamper logs"],
    anchors: {
      truck: { x: 46, y: 74 },
      bus: { x: 35, y: 78 },
      "mining-truck": { x: 46, y: 74 },
      "construction-vehicle": { x: 46, y: 74 },
      "industrial-vehicle": { x: 46, y: 74 }
    }
  },
  {
    id: "tpms",
    name: "TPMS Kit",
    slug: "rover-asset",
    image: "/images/solutions/road-safety.png",
    iconName: "activity",
    desc: "Tire Pressure Monitoring System utilizing wheel valves to stream real-time thermal diagnostics.",
    compatibility: ["truck", "bus", "taxi", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Blowout hazard check",
    location: "Wheel Rim Valve Caps",
    howItWorks: "Transmits internal tire pressure and temperature logs via RF signals to the in-cab display console.",
    benefits: ["Prevents high-speed tyre blowouts", "Extends tire tread life by 15%", "Optimizes fuel efficiency"],
    industries: ["Logistics", "Mining Operations", "Hazardous Cargo"],
    compliance: "RF Wireless Safety Aligned",
    installTime: "30 Minutes",
    uptimeImpact: 5,
    fuelImpact: -2,
    safetyImpact: 8,
    savingsImpact: 1200,
    specs: [
      { label: "Sensor type", value: "External/Internal valve caps" },
      { label: "Pressure limit", value: "Supports up to 150 PSI" },
      { label: "Transmission", value: "FSK RF data link" },
      { label: "Battery life", value: "5 years sensor battery" }
    ],
    features: ["Slow leak warning alarms", "Temperature check spikes", "Visual tire status HUD"],
    anchors: {
      truck: { x: 62, y: 84 },
      bus: { x: 64, y: 84 },
      taxi: { x: 60, y: 84 },
      "mining-truck": { x: 62, y: 84 },
      "construction-vehicle": { x: 62, y: 84 },
      "passenger-vehicle": { x: 60, y: 84 },
      "industrial-vehicle": { x: 62, y: 84 }
    }
  },
  {
    id: "temp-sensor",
    name: "Temp Sensor",
    slug: "rover-asset",
    image: "/images/verticals/frame-7118.png",
    iconName: "thermometer",
    desc: "Cold-chain temperature tracking sensor logs thermal consistency for high-value logistics.",
    compatibility: ["truck", "industrial-vehicle"],
    compatLabel: "Cargo & Industrial Vehicles",
    benefit: "Cold-chain diagnostics",
    location: "Rear Cargo Container Interior",
    howItWorks: "Streams continuous air temperature logs, raising alerts if cooling threshold rules are violated.",
    benefits: ["Guarantees cold-chain freshness", "Eliminates spoilage load losses", "Verifiable temperature reports"],
    industries: ["Pharma Logistics", "FMCG Transport", "Agriculture"],
    compliance: "HACCP Food Safety Aligned",
    installTime: "20 Minutes",
    uptimeImpact: 7,
    fuelImpact: 0,
    safetyImpact: 0,
    savingsImpact: 14000,
    specs: [
      { label: "Precision", value: "±0.5°C precise logs" },
      { label: "Probe scale", value: "-50°C to +120°C scale" },
      { label: "Probe style", value: "Waterproof stainless steel" },
      { label: "Log interval", value: "60s continuous writes" }
    ],
    features: ["Real-time cargo temps", "Thermal threshold warnings", "Exportable audit logs"],
    anchors: {
      truck: { x: 82, y: 48 },
      "industrial-vehicle": { x: 82, y: 48 }
    }
  },
  {
    id: "auto-dipper",
    name: "Auto Dipper",
    slug: "auto-dipper-sensor",
    image: "/images/verticals/frame-7116.png",
    iconName: "zap",
    desc: "Photosensitive high-beam control dimming headlamps dynamically when oncoming cars are detected.",
    compatibility: ["truck", "bus", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Glare-free night drive",
    location: "Front Grille / Headlamps",
    howItWorks: "Senses approaching headlamps, automatically switching high-beams to low-beams to avoid blinding oncoming traffic.",
    benefits: ["Improves nocturnal safety", "Prevents blinding crashes", "Reduces driver eye fatigues"],
    industries: ["Hazmat Transport", "Passenger Transit", "Logistics"],
    compliance: "RTO Night-Drive Safe Approved",
    installTime: "30 Minutes",
    uptimeImpact: 1,
    fuelImpact: 0,
    safetyImpact: 6,
    savingsImpact: 2500,
    specs: [
      { label: "Photo Sensor", value: "LDR Lux-sensitive filter" },
      { label: "Dip timing", value: "<100ms response check" },
      { label: "System Volt", value: "12V and 24V inputs" },
      { label: "Modes", value: "Auto dimming / Manual override" }
    ],
    features: ["Blindness prevention safety", "Rainlight filter logic", "Short circuit shield"],
    anchors: {
      truck: { x: 14, y: 66 },
      bus: { x: 12, y: 68 },
      "mining-truck": { x: 14, y: 66 },
      "construction-vehicle": { x: 14, y: 66 },
      "passenger-vehicle": { x: 14, y: 66 },
      "industrial-vehicle": { x: 14, y: 66 }
    }
  },
  {
    id: "reverse-parking",
    name: "Reverse Sonar",
    slug: "reverse-parking-system",
    image: "/images/verticalb2c/frame-7117.png",
    iconName: "shield",
    desc: "Rear ultrasonic proximity sensors triggering warning audio to avoid loading bay collisions.",
    compatibility: ["truck", "bus", "taxi", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Avoid reversing damage",
    location: "Rear Bumper Outline",
    howItWorks: "Emits ultrasonic waves, reporting precise distance bounds to loading docks and backing obstacles.",
    benefits: ["Reduces loading bay dents by 80%", "Protects warehouse crew safety", "Acoustic rear safety HUD"],
    industries: ["Logistics", "Passenger Transit", "Municipal Fleets"],
    compliance: "ISO Collision Safety Aligned",
    installTime: "40 Minutes",
    uptimeImpact: 2,
    fuelImpact: 0,
    safetyImpact: 8,
    savingsImpact: 4500,
    specs: [
      { label: "Sensor type", value: "Waterproof ultrasonic sonar" },
      { label: "Range limits", value: "0.3m to 2.5m limits" },
      { label: "Sensors count", value: "4 rear bumper sensors" },
      { label: "Indicator", value: "Acoustic + Numeric LED HUD" }
    ],
    features: ["Bumper strike protection", "Intelligent distance meters", "Rain filtering logic"],
    anchors: {
      truck: { x: 86, y: 76 },
      bus: { x: 88, y: 80 },
      taxi: { x: 84, y: 76 },
      "mining-truck": { x: 86, y: 76 },
      "construction-vehicle": { x: 86, y: 76 },
      "passenger-vehicle": { x: 84, y: 76 },
      "industrial-vehicle": { x: 86, y: 76 }
    }
  },
  {
    id: "reflective-tape",
    name: "Reflective Tape",
    slug: "vehicle-conspicuity-tape",
    image: "/images/verticalb2c/frame-7116.png",
    iconName: "layers",
    desc: "Prismatic conspicuity outlining boundaries for safe night operations in compliance with norms.",
    compatibility: ["truck", "bus", "mining-truck", "construction-vehicle", "industrial-vehicle"],
    compatLabel: "Heavy Vehicles",
    benefit: "High nocturnal outline",
    location: "Rear and Lateral Sides",
    howItWorks: "Reflects incoming headlamps to define vehicle dimensions in darkness or foggy weather.",
    benefits: ["Improves night outlines by 3x", "Reduces side-swipe collision risks", "Satisfies road rules"],
    industries: ["Hazmat Transport", "Logistics", "Transit Buses"],
    compliance: "AIS-090 High-Visibility Outline Compliant",
    installTime: "20 Minutes",
    uptimeImpact: 0,
    fuelImpact: 0,
    safetyImpact: 4,
    savingsImpact: 1200,
    specs: [
      { label: "Material", value: "Prismatic retroreflective film" },
      { label: "Adhesive Type", value: "Pressure-sensitive heavy bond" },
      { label: "Outlines", value: "AIS-090 approved contours" },
      { label: "Lifespan", value: "Up to 5 years outdoor life" }
    ],
    features: ["High-angle reflectivity", "Dirt and water sealed layer", "Anti-peel adhesive"],
    anchors: {
      truck: { x: 68, y: 44 },
      bus: { x: 72, y: 48 },
      "mining-truck": { x: 68, y: 44 },
      "construction-vehicle": { x: 68, y: 44 },
      "industrial-vehicle": { x: 68, y: 44 }
    }
  },
  {
    id: "hsrp",
    name: "HSRP Plate",
    slug: "high-security-registration-plate",
    image: "/images/solutions/compliance-solutions.png",
    iconName: "check-circle",
    desc: "Laser-etched, tamper-proof security number plates satisfying government legal vehicle mandates.",
    compatibility: ["truck", "bus", "taxi", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Tamper-proof registration",
    location: "Front and Rear Bumpers",
    howItWorks: "Tamper-evident plate with laser engraving, hot-stamped holograms, and non-reusable snap locks.",
    benefits: ["Prevents license cloning", "Ensures compliance with national laws", "Simplifies highway toll checkports"],
    industries: ["All Transport Fleets", "Leasing Companies"],
    compliance: "MoRTH HSRP Mandate Compliant",
    installTime: "15 Minutes",
    uptimeImpact: 1,
    fuelImpact: 0,
    safetyImpact: 2,
    savingsImpact: 2000,
    specs: [
      { label: "Security features", value: "Holographic hot-stamped tag" },
      { label: "Identification", value: "Unique laser serial code" },
      { label: "Material", value: "1.0mm heavy rust-free alum" },
      { label: "Standard", value: "RTO VAHAN database linked" }
    ],
    features: ["Snap-lock security pins", "Anti-cloning stamp", "Corrosion protective layers"],
    anchors: {
      truck: { x: 10, y: 74 },
      bus: { x: 8, y: 76 },
      taxi: { x: 12, y: 74 },
      "mining-truck": { x: 10, y: 74 },
      "construction-vehicle": { x: 10, y: 74 },
      "passenger-vehicle": { x: 12, y: 74 },
      "industrial-vehicle": { x: 10, y: 74 }
    }
  },
  {
    id: "panic-button",
    name: "Panic Button",
    slug: "rover-elite",
    image: "/images/verticals/frame-7115.png",
    iconName: "alert-triangle",
    desc: "Silent emergency call buttons triggering live coordinates directly to dispatch SOS consoles.",
    compatibility: ["truck", "bus", "taxi", "mining-truck", "construction-vehicle", "passenger-vehicle", "industrial-vehicle"],
    compatLabel: "All Vehicles",
    benefit: "Instant SOS trigger",
    location: "Passenger Cabin Panels",
    howItWorks: "Generates instant high-priority silent alarms on dispatch dashboard with real-time location data.",
    benefits: ["Improves driver/passenger safety", "Fast emergency alert responses", "Satisfies transport acts"],
    industries: ["School Bus Transit", "Public Taxis", "Hazmat Cargo"],
    compliance: "AIS-140 Emergency Button Mandate",
    installTime: "30 Minutes",
    uptimeImpact: 2,
    fuelImpact: 0,
    safetyImpact: 8,
    savingsImpact: 2500,
    specs: [
      { label: "Activation type", value: "Heavy press physical switch" },
      { label: "Diagnostics", value: "Solder-proof fail-safe link" },
      { label: "Mounting", value: "Cabin flush or wall panels" },
      { label: "Standards", value: "AIS-140 emergency spec" }
    ],
    features: ["Dual-relay alerts", "Tamper diagnostic check", "Silent dispatch mode"],
    anchors: {
      truck: { x: 32, y: 48 },
      bus: { x: 28, y: 42 },
      taxi: { x: 34, y: 44 },
      "mining-truck": { x: 32, y: 48 },
      "construction-vehicle": { x: 32, y: 48 },
      "passenger-vehicle": { x: 34, y: 44 },
      "industrial-vehicle": { x: 32, y: 48 }
    }
  },
  {
    id: "bms-card",
    name: "BMS Card",
    slug: "bms-card",
    image: "/images/solutions/ev-solutions.png",
    iconName: "zap",
    desc: "Lithium battery balancing card managing cell-voltages and tracking thermal runaways.",
    compatibility: ["taxi"],
    compatLabel: "Electric Taxi Only",
    benefit: "EV battery thermal safety",
    location: "Under-chassis Battery Tray",
    howItWorks: "Monitors LFP cell temperatures and voltage balance, preventing thermal runaways.",
    benefits: ["Guarantees battery safety pack", "Extends battery life by 30%", "Real-time state-of-health charts"],
    industries: ["Electric Fleets", "Urban Taxi Cabs"],
    compliance: "IEC-62443 / AIS-156 Thermal Safe",
    installTime: "90 Minutes",
    uptimeImpact: 10,
    fuelImpact: 0,
    safetyImpact: 10,
    savingsImpact: 14000,
    specs: [
      { label: "Cell support", value: "Up to 16S battery cells" },
      { label: "Interface Link", value: "CAN Bus vehicle protocol" },
      { label: "Security design", value: "IEC 62443 secure designs" },
      { label: "Balance Rate", value: "99.5% accuracy balancing" }
    ],
    features: ["State of charge logging", "Active thermal cuts", "Cell health logs"],
    anchors: {
      taxi: { x: 52, y: 76 }
    }
  },
  {
    id: "dc-converter",
    name: "DC to DC Converter",
    slug: "dc-to-dc-converter",
    image: "/images/solutions/ev-solutions.png",
    iconName: "cpu",
    desc: "Automotive-grade step-down converter delivering stable auxiliary feed for cabin hardware.",
    compatibility: ["taxi"],
    compatLabel: "Electric Taxi Only",
    benefit: "Stable auxiliary power",
    location: "Under-hood Motor Compartment",
    howItWorks: "Converts high-voltage battery current to low-voltage 12V current to power cabin screens and dash telemetry.",
    benefits: ["Prevents auxiliary battery drains", "Stable cabin hardware currents", "Efficient heat sinks"],
    industries: ["Electric Fleets", "Urban Taxi Cabs"],
    compliance: "IP67 Dust & Water Protection",
    installTime: "45 Minutes",
    uptimeImpact: 5,
    fuelImpact: 0,
    safetyImpact: 4,
    savingsImpact: 5000,
    specs: [
      { label: "Efficiency", value: "92% power conversion" },
      { label: "Water rating", value: "IP67 sealed enclosure" },
      { label: "Input Range", value: "48V - 96V DC inputs" },
      { label: "Protection", value: "Short circuit & overcurrent" }
    ],
    features: ["Spike suppressors", "Reverse polarity block", "Thermal heat sink casing"],
    anchors: {
      taxi: { x: 20, y: 72 }
    }
  }
];
