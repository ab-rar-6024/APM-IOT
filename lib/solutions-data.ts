export interface ChallengeItem {
  title: string;
  description: string;
}

export interface ApplicationCard {
  title: string;
  description: string;
}

export interface BenefitCard {
  title: string;
  description: string;
}

export interface ProductUsage {
  /** Product slug this entry refers to; resolved against `products` at render time. */
  slug: string;
  /** One sentence on the product's role within this solution — not a spec sheet. */
  why: string;
}

export interface Solution {
  slug: string;
  name: string;
  /** Hero one-liner stated as a business outcome, not a feature list. */
  tagline: string;
  /** SEO meta description. */
  description: string;
  heroImage: string;
  /** 3–5 paragraphs, consultant tone, no product mentions. */
  overview: string[];
  challenges: ChallengeItem[];
  /** Operational workflow, no product mentions. */
  howItWorks: string[];
  applications: ApplicationCard[];
  benefits: BenefitCard[];
  /** Subset of the master industries list this solution serves. */
  industries: string[];
  productsUsed: ProductUsage[];
  applicationImages?: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ProductStat {
  value: string;
  label: string;
  iconName?: string;
}

export interface Product {
  slug: string;
  name: string;
  categories: string[];
  image: string;
  shortDesc: string;
  overview: string;
  features: string[];
  specifications: ProductSpec[];
  benefits: string[];
  applications: string[];
  faq: FAQItem[];
  stats: ProductStat[];
}

export const solutions: Solution[] = [
  {
    slug: "fleet-management",
    name: "Fleet Management",
    tagline:
      "Improve operational efficiency, reduce fuel costs, increase driver safety, and gain complete visibility across your entire fleet.",
    description:
      "Centralized fleet management that gives operators live visibility, utilization data, and operational control across every vehicle.",
    heroImage: "/images/solutions/fleet-management.png",
    overview: [
      "Fleet-dependent businesses run on vehicles they can't physically watch all day. Every trip, every idle minute, and every detour carries a cost — but without a live, connected view of the fleet, that cost stays invisible until it shows up in a fuel bill or a missed delivery.",
      "The problem isn't a lack of data — it's a lack of visibility into the data that already exists. Vehicles generate location, speed, fuel, and usage information constantly, but if it isn't captured, centralized, and turned into action, it's wasted. Fleet managers end up reacting to problems days after they happened, instead of preventing them.",
      "As fleets grow past a handful of vehicles, spreadsheets and phone calls stop scaling. Businesses need a system that gives them the same operational clarity over 500 vehicles as they'd have over five — which is why fleet management has shifted from a back-office task to a core digital transformation priority for transportation-dependent businesses."
    ],
    challenges: [
      { title: "Lack of Real-Time Visibility", description: "Fleet managers often don't know where a vehicle is or what it's doing until a driver calls in or a delivery is late." },
      { title: "Rising Fuel Costs", description: "Idling, inefficient routing, and unauthorized use quietly inflate fuel spend without ever showing up as a single line item." },
      { title: "Unplanned Maintenance & Breakdowns", description: "Vehicles that aren't monitored proactively fail unpredictably, causing costly downtime and missed commitments." },
      { title: "Driver Accountability", description: "Without objective data, it's difficult to identify unsafe driving, unauthorized stops, or route deviations." },
      { title: "Underutilized Assets", description: "Vehicles sitting idle in one location while others are overbooked elsewhere quietly erodes fleet ROI." },
      { title: "Manual Reporting Overhead", description: "Compiling trip logs and utilization reports by hand consumes hours that should go toward operational decisions." },
      { title: "Compliance Pressure", description: "Regulatory reporting requirements add administrative burden on top of day-to-day operations." }
    ],
    howItWorks: [
      "Every vehicle in the fleet is connected through an onboard telematics device that continuously reports its location, movement, and operational status.",
      "This data streams to a centralized dashboard in real time, giving fleet managers a live map of the entire operation instead of a snapshot from hours ago.",
      "Automated alerts flag the events that matter — unscheduled stops, route deviations, excessive idling — so managers act on exceptions instead of monitoring everything manually.",
      "Historical trip and utilization data is compiled automatically into reports that reveal patterns invisible on a day-to-day basis, from underused vehicles to recurring inefficiencies.",
      "Maintenance scheduling shifts from reactive to predictive, using vehicle usage data to flag service needs before they become breakdowns.",
      "The result is a single operational picture that scales from five vehicles to five thousand without adding headcount."
    ],
    applications: [
      { title: "Last-Mile Delivery Fleets", description: "Dispatchers track every vehicle in real time to optimize routes and keep delivery windows on schedule." },
      { title: "Cab & Taxi Operations", description: "Operators monitor vehicle utilization and driver behavior across large, distributed fleets." },
      { title: "Enterprise Logistics Fleets", description: "Centralized visibility across hundreds of vehicles operating from multiple depots." },
      { title: "Heavy Commercial Trucking", description: "Real-time payload monitoring keeps trucks within legal load limits and avoids overload penalties." },
      { title: "Construction Fleet Operations", description: "Monitor trucks and support vehicles moving between multiple active job sites." },
      { title: "Rental Fleet Management", description: "Track utilization and location of vehicles across a rotating customer base." },
      { title: "Field Service Vehicles", description: "Dispatch the nearest available vehicle based on live location data." },
      { title: "Multi-Depot Operations", description: "Maintain a single operational view across geographically distributed fleet locations." }
    ],
    benefits: [
      { title: "Reduce Fuel Costs", description: "Cut wasted fuel spend from idling, inefficient routing, and unauthorized vehicle use." },
      { title: "Increase Driver Safety", description: "Identify risky driving patterns before they lead to incidents." },
      { title: "Improve Vehicle Utilization", description: "Get more productive hours out of every vehicle in the fleet." },
      { title: "Prevent Unauthorized Use", description: "Know immediately when a vehicle leaves its approved route or operating hours." },
      { title: "Increase Operational Visibility", description: "See the exact location and status of every vehicle, at any time." },
      { title: "Lower Maintenance Costs", description: "Move from reactive repairs to planned, usage-based servicing." },
      { title: "Improve Customer Satisfaction", description: "Deliver more reliably with accurate ETAs and fewer missed windows." },
      { title: "Simplify Regulatory Compliance", description: "Generate audit-ready trip and usage reports automatically." }
    ],
    industries: ["Transportation", "Logistics", "Construction", "Government", "Public Transport", "School Transportation", "Manufacturing"],
    productsUsed: [
      { slug: "rover-elite", why: "Provides real-time GPS tracking and route visibility to keep every vehicle accounted for." },
      { slug: "rover-elite-plus", why: "Adds extended sensor inputs and driver-ID tracking for fleets that need deeper operational detail." },
      { slug: "prime-load", why: "Monitors payload weight and distribution to prevent overload penalties and protect vehicle health." }
    ],
    applicationImages: ["/images/solutions/vehicle-tracking.png", "/images/solutions/payload-monitoring.png"]
  },
  {
    slug: "vehicle-safety",
    name: "Vehicle Safety",
    tagline: "Reduce accidents, protect drivers, and lower liability with hardware engineered to prevent risk before it happens.",
    description: "Vehicle safety hardware engineered to reduce accidents, enforce speed compliance, and protect drivers on every trip.",
    heroImage: "/images/solutions/road-safety.png",
    overview: [
      "Every commercial vehicle on the road carries risk — to its driver, to other road users, and to the business that owns it. A single accident can cost far more than any safety investment, in insurance, liability, downtime, and reputation.",
      "Most accidents aren't caused by a single dramatic failure — they're caused by small, preventable risks that compound: excessive speed, poor rear visibility, glare from oncoming headlights, or a vehicle that simply isn't visible enough at night. Addressing these risks individually, after the fact, is far more expensive than preventing them.",
      "As fleets scale and regulatory scrutiny increases, safety can no longer depend on driver judgment alone. Businesses need hardware that enforces safe behavior automatically, consistently, and at scale — regardless of who's behind the wheel."
    ],
    challenges: [
      { title: "Speeding & Reckless Driving", description: "Without enforcement, drivers default to habits that increase accident risk and fuel consumption." },
      { title: "Poor Rear & Blind-Spot Visibility", description: "Reversing accidents remain one of the most common and preventable incident types in commercial fleets." },
      { title: "Night-Time Glare & Low Visibility", description: "Headlight glare and poor vehicle visibility contribute disproportionately to night-time accidents." },
      { title: "Rising Insurance Premiums", description: "Insurers increasingly price risk based on measurable safety practices, not assumptions." },
      { title: "Inconsistent Driver Behavior", description: "Safety standards vary driver to driver without objective enforcement." },
      { title: "Regulatory Safety Mandates", description: "Transport authorities increasingly require certified safety hardware as a condition of operation." }
    ],
    howItWorks: [
      "Safety hardware is fitted directly to the vehicle, enforcing safe behavior automatically rather than relying on driver discipline alone.",
      "Speed governance hardware physically limits a vehicle to its permitted speed, removing the possibility of high-speed incidents.",
      "Sensor-based systems continuously monitor the vehicle's surroundings — proximity while reversing, oncoming headlight glare — and respond automatically or alert the driver.",
      "High-visibility materials keep the vehicle detectable to other road users in low-light conditions, reducing the chance of collision.",
      "All safety hardware is certified and installed through a nationwide network, ensuring consistent protection across every vehicle in the fleet."
    ],
    applications: [
      { title: "School & Public Bus Fleets", description: "Enforce speed limits and improve visibility for vehicles carrying passengers who depend on driver caution." },
      { title: "Long-Haul Trucking", description: "Reduce night-time glare and fatigue-related risk on extended highway routes." },
      { title: "Urban Delivery Fleets", description: "Cut reversing accidents in tight, high-traffic delivery environments." },
      { title: "State Transport Corporations", description: "Meet mandatory speed governance requirements across large public vehicle fleets." },
      { title: "Construction & Municipal Vehicles", description: "Improve visibility for vehicles operating in high-risk work zones." },
      { title: "Highway Coach Operators", description: "Protect passengers on long-distance routes with certified speed compliance." },
      { title: "Cab & Taxi Fleets", description: "Improve driver safety without relying on manual enforcement." },
      { title: "Heavy Commercial Trucks", description: "Reduce collision risk for large vehicles with limited maneuverability." }
    ],
    benefits: [
      { title: "Reduce Accident Rates", description: "Prevent the most common causes of commercial vehicle collisions." },
      { title: "Lower Insurance Costs", description: "Demonstrate certified safety practices that insurers recognize." },
      { title: "Improve Driver Confidence", description: "Give drivers tools that reduce risk in blind spots and low visibility." },
      { title: "Ensure Regulatory Compliance", description: "Meet ARAI, ICAT, and speed governance mandates automatically." },
      { title: "Protect Business Reputation", description: "Avoid the operational and public fallout of preventable accidents." },
      { title: "Reduce Liability Exposure", description: "Show measurable, enforced safety practices across the fleet." },
      { title: "Extend Vehicle Lifespan", description: "Prevent the wear and damage that comes with high-risk driving." },
      { title: "Standardize Safety Across Drivers", description: "Remove inconsistency in how safety is practiced fleet-wide." }
    ],
    industries: ["Transportation", "Public Transport", "School Transportation", "Logistics", "Construction", "Government", "Emergency Services"],
    productsUsed: [
      { slug: "auto-dipper-sensor", why: "Automatically manages headlight beams to reduce night-time glare and accident risk." },
      { slug: "reverse-parking-system", why: "Alerts drivers to obstacles while reversing, preventing one of the most common fleet incident types." },
      { slug: "speed-limiting-device", why: "Physically enforces safe speed limits, removing high-speed risk regardless of driver behavior." },
      { slug: "vehicle-conspicuity-tape", why: "Improves vehicle visibility to other road users in low-light and night-time conditions." }
    ],
    applicationImages: ["/images/solutions/road-safety.png", "/images/solutions/ai-driver-monitoring.png"]
  },
  {
    slug: "video-surveillance",
    name: "Video Surveillance",
    tagline: "See what's happening across every vehicle and asset, in real time, without being there.",
    description: "Live video monitoring that gives fleet managers continuous visibility into vehicle activity, incidents, and driver behavior.",
    heroImage: "/images/solutions/video-telematics.png",
    overview: [
      "What happens inside and around a vehicle when no one is watching is exactly when the business is most exposed — to theft, disputes, false claims, and safety incidents that go unrecorded and unresolved.",
      "Traditional fleets operate on trust and after-the-fact accounts: a driver's version of events, a customer's complaint, an insurance claim with no evidence either way. Without visual verification, businesses are left guessing, and disputes take far longer and cost far more to resolve.",
      "Continuous, reliable video monitoring changes that dynamic entirely — turning uncertainty into evidence, and reactive disputes into proactive safety management. It's no longer a luxury for high-value fleets; it's a baseline expectation for any operation managing risk, liability, or driver performance at scale."
    ],
    challenges: [
      { title: "Lack of Incident Evidence", description: "Without video, disputes over accidents or theft come down to word against word." },
      { title: "Vandalism & Theft", description: "Vehicles and cargo left unmonitored are vulnerable to tampering and loss." },
      { title: "Unverified Driver Claims", description: "Businesses have no way to confirm what actually happened during an incident." },
      { title: "Delayed Incident Response", description: "Without live visibility, fleet managers learn about problems only after they've escalated." },
      { title: "Insurance Dispute Costs", description: "Claims without supporting evidence take longer to resolve and often cost more." },
      { title: "Harsh Operating Environments", description: "Standard cameras fail under vibration, weather, and vandalism common in commercial vehicle use." }
    ],
    howItWorks: [
      "Ruggedized cameras are mounted on the vehicle, continuously capturing footage regardless of weather, vibration, or attempted tampering.",
      "Footage streams live over 4G or WiFi, so fleet managers can view what's happening in real time, not just after the fact.",
      "Motion-triggered recording captures key events automatically, without requiring constant manual monitoring.",
      "Recorded footage is stored both on-device and in the cloud, ensuring evidence survives even if a device is damaged or removed.",
      "When an incident occurs, footage can be retrieved immediately — turning a dispute into a five-minute resolution instead of a weeks-long investigation."
    ],
    applications: [
      { title: "Cash-in-Transit Vehicles", description: "Deter theft and provide verifiable evidence for high-value cargo movements." },
      { title: "School & Public Bus Fleets", description: "Give schools and transport authorities visibility into driver conduct and passenger safety." },
      { title: "Urban Delivery Fleets", description: "Resolve delivery and damage disputes quickly with recorded evidence." },
      { title: "Long-Haul Trucking", description: "Monitor driver behavior and vehicle security across extended, unsupervised routes." },
      { title: "Construction Site Vehicles", description: "Deter vandalism and theft of parked equipment overnight." },
      { title: "Emergency Response Vehicles", description: "Maintain a verified record of response activity for accountability and review." },
      { title: "Cab & Taxi Fleets", description: "Protect drivers and passengers with recorded evidence in the event of a dispute." },
      { title: "Municipal Transport Fleets", description: "Support public accountability with transparent, recorded vehicle activity." }
    ],
    benefits: [
      { title: "Reduce Theft & Vandalism", description: "Visible cameras and continuous recording deter tampering." },
      { title: "Resolve Disputes Faster", description: "Settle incident claims with verified footage instead of conflicting accounts." },
      { title: "Improve Driver Accountability", description: "Encourage consistent, safe behavior with continuous monitoring." },
      { title: "Enable Real-Time Response", description: "Act on incidents as they happen, not after the fact." },
      { title: "Lower Insurance Claim Costs", description: "Support claims with clear evidence, reducing dispute time and payouts." },
      { title: "Protect High-Value Cargo", description: "Monitor sensitive shipments continuously across their journey." },
      { title: "Strengthen Safety Culture", description: "Reinforce safe driving practices with ongoing visibility." },
      { title: "Support Passenger Confidence", description: "Give passengers and parents assurance through visible monitoring." }
    ],
    industries: ["Transportation", "Logistics", "Public Transport", "School Transportation", "Emergency Services", "Government", "Waste Management"],
    productsUsed: [
      { slug: "rover-view", why: "Turns live camera and sensor data into real-time safety alerts and driver behavior insight." },
      { slug: "vandal-proof-camera", why: "Provides ruggedized, always-on video coverage that withstands vibration, weather, and tampering." }
    ],
    applicationImages: ["/images/solutions/video-telematics.png", "/images/solutions/ai-driver-monitoring.png"]
  },
  {
    slug: "asset-tracking",
    name: "Asset Tracking",
    tagline: "Know where every piece of equipment is, even when it has no engine of its own.",
    description: "Battery-powered tracking that protects trailers, containers, and equipment beyond the reach of vehicle-based fleet systems.",
    heroImage: "/images/solutions/asset-tracking.png",
    overview: [
      "Not everything a business needs to track has an engine. Trailers, containers, generators, and heavy equipment move between sites, sit idle for weeks, and are frequently the assets businesses know the least about — until one goes missing.",
      "Unpowered assets are historically the hardest to monitor because they have no ignition, no fuel system, and no built-in power source to run tracking hardware. Businesses are left relying on manual checks, paper logs, and the assumption that equipment is where it was last seen.",
      "As equipment values rise and asset fleets grow more distributed across sites and subcontractors, that assumption becomes an expensive risk. Businesses need visibility into unpowered assets that matches the visibility they already have over their powered vehicle fleet."
    ],
    challenges: [
      { title: "Asset Loss & Theft", description: "Unpowered equipment left at remote sites is a common target for theft." },
      { title: "No Power Source for Tracking", description: "Traditional tracking hardware requires vehicle power that trailers and equipment don't have." },
      { title: "Manual Asset Audits", description: "Physically locating and verifying equipment across multiple sites is slow and error-prone." },
      { title: "Equipment Idle Time", description: "Businesses often can't tell whether an asset is in use or sitting idle at a site." },
      { title: "Subcontractor Accountability", description: "Equipment loaned or rented out is difficult to track once it leaves direct control." },
      { title: "High Replacement Costs", description: "Losing high-value equipment is far more expensive than the cost of tracking it." }
    ],
    howItWorks: [
      "A battery-powered tracking device is fitted to the asset — no wiring or vehicle power connection required.",
      "The device reports its location automatically, with reporting frequency balanced against battery life for long-term deployment.",
      "Motion-triggered reporting conserves power when the asset is stationary and increases reporting when it's moved.",
      "Fleet managers view all tracked assets — vehicles and equipment alike — from the same centralized dashboard.",
      "Low-battery alerts ensure devices are serviced before they go offline, maintaining continuous visibility."
    ],
    applications: [
      { title: "Trailer & Container Fleets", description: "Track trailers across yards, ports, and customer sites without physical checks." },
      { title: "Construction Equipment", description: "Monitor excavators, generators, and heavy machinery across multiple active job sites." },
      { title: "Rental Equipment Tracking", description: "Know exactly where rented-out equipment is at all times." },
      { title: "Agricultural Equipment", description: "Track machinery moving between fields and storage locations." },
      { title: "Utility Field Equipment", description: "Monitor equipment deployed across dispersed utility infrastructure sites." },
      { title: "Mining Site Assets", description: "Track heavy equipment across large, remote mining operations." },
      { title: "Logistics Yard Management", description: "Maintain visibility over trailers waiting in high-volume freight yards." },
      { title: "Municipal Equipment Fleets", description: "Track public works equipment deployed across a city or region." }
    ],
    benefits: [
      { title: "Prevent Asset Theft", description: "Know immediately if equipment moves outside its expected location." },
      { title: "Eliminate Manual Audits", description: "Replace physical equipment checks with automatic location reporting." },
      { title: "Improve Equipment Utilization", description: "See which assets are idle and which are actively working." },
      { title: "Extend Deployment Life", description: "Long battery life keeps assets tracked for up to two years without maintenance." },
      { title: "Simplify Multi-Site Operations", description: "Maintain one view of equipment across every job site." },
      { title: "Reduce Replacement Costs", description: "Recover lost or misplaced equipment faster." },
      { title: "Strengthen Subcontractor Oversight", description: "Maintain visibility over equipment once it leaves direct control." },
      { title: "Support Insurance Claims", description: "Provide location history in the event of loss or theft." }
    ],
    industries: ["Construction", "Mining", "Agriculture", "Logistics", "Utilities", "Oil & Gas", "Manufacturing"],
    productsUsed: [
      { slug: "rover-asset", why: "Delivers long-life, wireless tracking for trailers and equipment that have no power source of their own." }
    ],
    applicationImages: ["/images/solutions/asset-tracking.png", "/images/solutions/connected-vehicle-platform.png"]
  },
  {
    slug: "public-transport-solutions",
    name: "Public Transport Solutions",
    tagline: "Give passengers, regulators, and operators a transparent, accountable public transport system.",
    description: "Certified GPS tracking and fare management built for public and commercial passenger transport operators.",
    heroImage: "/images/solutions/vehicle-tracking.png",
    overview: [
      "Public and commercial passenger transport carries a different weight of responsibility than freight — every vehicle carries people who expect to arrive safely, on time, and without being overcharged. That expectation is now backed by regulation, not just customer goodwill.",
      "Operators face growing pressure from multiple directions at once: government mandates requiring certified vehicle tracking, passengers expecting fair and transparent fares, and regulators demanding auditable records of vehicle activity. Meeting all three manually is no longer realistic at fleet scale.",
      "Passenger transport businesses need systems that satisfy compliance requirements automatically while improving the actual passenger experience — not two separate efforts, but one integrated operational layer that both regulators and riders can trust."
    ],
    challenges: [
      { title: "Government Compliance Mandates", description: "Public and commercial passenger vehicles are increasingly required to carry certified tracking hardware." },
      { title: "Fare Disputes & Fraud", description: "Manual or tampered fare calculation erodes passenger trust and revenue accuracy." },
      { title: "Passenger Safety Concerns", description: "Riders and their families expect real-time visibility into vehicle location and status." },
      { title: "Inconsistent Fare Enforcement", description: "Without automated calculation, fare application varies driver to driver." },
      { title: "Emergency Response Delays", description: "Without live location data, responding to an on-vehicle emergency takes longer." },
      { title: "Regulatory Audit Burden", description: "Operators must produce accurate, traceable records for licensing and compliance reviews." }
    ],
    howItWorks: [
      "A certified GPS tracking device is installed in every vehicle, reporting live location directly to both the operator's dashboard and government tracking systems.",
      "An SOS panic button gives passengers and drivers a direct emergency escalation path tied to the vehicle's real-time location.",
      "Fare calculation is automated from GPS-measured distance, removing manual fare entry and the disputes that come with it.",
      "Every trip and fare transaction is logged automatically, creating an auditable record for regulatory review.",
      "Tamper-proof sealing on both tracking and fare hardware ensures the data operators and regulators rely on can't be manipulated."
    ],
    applications: [
      { title: "City Bus Networks", description: "Provide real-time vehicle tracking to transport authorities and passengers alike." },
      { title: "School Transport Fleets", description: "Give parents and school administrators live visibility into bus location and status." },
      { title: "App-Based Cab Fleets", description: "Automate accurate, tamper-proof fare calculation across a large driver base." },
      { title: "Airport Transport Services", description: "Meet certification requirements for regulated passenger transport operations." },
      { title: "State Transport Corporations", description: "Standardize compliance and fare accuracy across large public fleets." },
      { title: "Intercity Coach Operators", description: "Provide passengers with transparent, trackable long-distance travel." },
      { title: "Tourist & Charter Transport", description: "Offer verifiable vehicle tracking as a passenger safety assurance." },
      { title: "Paratransit & Shuttle Services", description: "Maintain compliant, auditable operations for contracted passenger routes." }
    ],
    benefits: [
      { title: "Meet Government Mandates", description: "Satisfy AIS-140 and VLTD tracking requirements automatically." },
      { title: "Eliminate Fare Disputes", description: "Calculate fares accurately and transparently from GPS data." },
      { title: "Improve Passenger Safety", description: "Give riders and families real-time visibility and emergency response capability." },
      { title: "Simplify Regulatory Audits", description: "Maintain auditable trip and fare records without manual reporting." },
      { title: "Increase Fare Revenue Accuracy", description: "Remove manual fare entry errors and manipulation." },
      { title: "Build Passenger Trust", description: "Demonstrate transparent, accountable operations to riders." },
      { title: "Standardize Operations at Scale", description: "Apply consistent tracking and fare rules across every vehicle." },
      { title: "Support Emergency Response", description: "Enable faster response through real-time location and SOS alerts." }
    ],
    industries: ["Public Transport", "School Transportation", "Transportation", "Government", "Logistics"],
    productsUsed: [
      { slug: "ais-140-gps", why: "Provides certified, government-compliant GPS tracking with built-in emergency SOS capability." },
      { slug: "auto-fare-meter", why: "Calculates passenger fares automatically and transparently from GPS-measured distance." }
    ],
    applicationImages: ["/images/solutions/vehicle-tracking.png", "/images/solutions/compliance-solutions.png"]
  },
  {
    slug: "electric-mobility",
    name: "Electric Mobility",
    tagline: "Power the next generation of connected electric vehicles with reliable, automotive-grade electronics.",
    description: "Core power, battery, and connectivity electronics engineered to automotive-grade reliability for electric and connected vehicle platforms.",
    heroImage: "/images/solutions/ev-solutions.png",
    overview: [
      "Electric and connected vehicles run on more than a battery and a motor — they depend on a layer of power management and connectivity electronics that most fleet operators never see, but every operation depends on completely.",
      "As electric fleets scale, the risks shift from fuel costs to battery health, power stability, and continuous connectivity. A poorly managed battery pack degrades faster and less predictably than a combustion engine wears out, and a power spike that would be a minor issue in a traditional vehicle can damage sensitive EV electronics entirely.",
      "Businesses adopting electric and connected vehicle platforms need the underlying electronics to be as reliable as the vehicles themselves — engineered to automotive-grade standards, not consumer-grade shortcuts, and built to operate continuously across extreme temperature and power conditions."
    ],
    challenges: [
      { title: "Battery Degradation", description: "Without active management, EV battery packs lose capacity and lifespan faster than expected." },
      { title: "Power Instability", description: "Voltage spikes and inconsistent power delivery can damage sensitive onboard electronics." },
      { title: "Connectivity Gaps", description: "Physical SIM cards are vulnerable to loss, tampering, and coverage gaps across regions." },
      { title: "Overcharge & Overheat Risk", description: "Unmanaged battery packs are exposed to safety risks during charging and operation." },
      { title: "Fleet-Wide Provisioning Complexity", description: "Activating and managing connectivity across large EV fleets is operationally heavy." },
      { title: "Automotive-Grade Reliability Demands", description: "Consumer-grade electronics fail under the temperature and vibration extremes vehicles operate in." }
    ],
    howItWorks: [
      "A battery management system continuously monitors cell voltage and temperature, actively balancing charge to protect the pack and extend its usable life.",
      "Power conversion electronics regulate voltage delivery to onboard systems, protecting them from spikes and instability.",
      "Embedded connectivity keeps the vehicle continuously online without a physical SIM card that can be lost, swapped, or tampered with.",
      "All components are engineered and tested to automotive-grade temperature and reliability standards, not adapted from consumer electronics.",
      "Fleet-wide provisioning tools allow operators to activate and manage connectivity across large EV deployments from a single system."
    ],
    applications: [
      { title: "Electric Fleet Operators", description: "Protect battery health and extend vehicle lifespan across an electric fleet." },
      { title: "EV Charging Infrastructure", description: "Support stable power delivery to connected charging and monitoring systems." },
      { title: "Two & Three-Wheeler EV Manufacturers", description: "Integrate certified battery management into vehicle production." },
      { title: "Connected Vehicle Platforms", description: "Maintain continuous connectivity across distributed vehicle networks." },
      { title: "Industrial IoT Deployments", description: "Power sensor networks that require automotive-grade reliability." },
      { title: "Stationary Battery Storage", description: "Apply the same battery management principles to non-vehicle energy storage." },
      { title: "OEM Integration Partners", description: "Build electric and connected platforms on proven, certified power electronics." },
      { title: "Fleet Telematics Providers", description: "Ensure stable power delivery to in-vehicle tracking and camera systems." }
    ],
    benefits: [
      { title: "Extend Battery Lifespan", description: "Prevent the overcharge and thermal conditions that degrade battery packs early." },
      { title: "Protect Sensitive Electronics", description: "Shield onboard systems from voltage spikes and power instability." },
      { title: "Eliminate SIM Management Overhead", description: "Remove the operational burden of physical SIM provisioning and replacement." },
      { title: "Ensure Automotive-Grade Reliability", description: "Operate confidently across extreme temperature and vibration conditions." },
      { title: "Reduce Safety Risk", description: "Prevent overcharge and overheating incidents in battery packs." },
      { title: "Simplify Fleet-Wide Connectivity", description: "Provision and manage connectivity across an entire EV fleet centrally." },
      { title: "Support Scalable EV Adoption", description: "Build electric fleet operations on proven, certified electronics." },
      { title: "Enable OEM Integration", description: "Provide manufacturers with automotive-grade components ready for integration." }
    ],
    industries: ["Transportation", "Manufacturing", "Utilities", "Logistics", "Government"],
    productsUsed: [
      { slug: "iot-m2m-esim", why: "Keeps connected vehicles continuously online with embedded, tamper-proof connectivity." },
      { slug: "dc-to-dc-converter", why: "Regulates power delivery to protect onboard electronics from voltage spikes and instability." },
      { slug: "bms-card", why: "Actively manages battery cell health to prevent overcharging and extend pack lifespan." }
    ],
    applicationImages: ["/images/solutions/ev-solutions.png", "/images/solutions/industrial-iot.png"]
  },
  {
    slug: "vehicle-compliance",
    name: "Vehicle Compliance",
    tagline: "Meet every government mandate with certified hardware built for regulatory compliance from day one.",
    description: "Certified compliance hardware — from tamper-proof registration plates to emissions testing — engineered to meet government regulatory standards.",
    heroImage: "/images/solutions/compliance-solutions.png",
    overview: [
      "Vehicle compliance isn't optional, and it isn't static. Governments continuously introduce new mandates — tamper-proof registration, emissions testing, certified tracking — and vehicles that don't meet them face fines, impoundment, or being barred from operation entirely.",
      "For businesses operating large or growing fleets, staying compliant across every vehicle, every mandate, and every state is a constant administrative burden. A single overlooked plate replacement or expired emissions certificate can halt a vehicle's operation and disrupt a business's revenue.",
      "The businesses that manage compliance best don't treat it as a periodic scramble — they build it into standard vehicle procurement and operation, using certified hardware that satisfies regulatory requirements automatically, consistently, and verifiably."
    ],
    challenges: [
      { title: "Registration Plate Fraud", description: "Standard plates are vulnerable to tampering, cloning, and forgery." },
      { title: "Emissions Testing Compliance", description: "Vehicles must pass certified pollution testing to remain legally operational." },
      { title: "Multi-State Regulatory Variation", description: "Compliance requirements differ across regions, complicating fleet-wide standardization." },
      { title: "Manual Compliance Tracking", description: "Businesses often rely on manual records to track certification status across vehicles." },
      { title: "Government Database Integration", description: "Compliance hardware must report directly into official regulatory systems." },
      { title: "Operational Disruption from Non-Compliance", description: "A single non-compliant vehicle can be pulled from operation without warning." }
    ],
    howItWorks: [
      "Tamper-proof registration plates are fitted with laser-etched identification and non-reusable locking hardware, preventing forgery or removal.",
      "Certified emissions testing equipment runs automated test cycles and issues compliance certificates directly, with results reported to government databases.",
      "All compliance hardware integrates directly with official regulatory systems, so verification happens automatically rather than through manual paperwork.",
      "Nationwide dealer and testing center networks ensure consistent installation and certification across every vehicle in a fleet.",
      "Compliance status becomes a verifiable, real-time fact rather than a document that has to be tracked and renewed manually."
    ],
    applications: [
      { title: "New Vehicle Registration", description: "Equip new vehicles with certified, tamper-proof identification from day one." },
      { title: "Fleet-Wide Plate Replacement", description: "Standardize compliant registration across large, growing fleets." },
      { title: "PUC Testing Centers", description: "Operate certified emissions testing with direct government database integration." },
      { title: "State Transport Department Programs", description: "Support government-run compliance and registration initiatives." },
      { title: "Multi-State Fleet Operations", description: "Maintain consistent compliance across vehicles operating in different regulatory regions." },
      { title: "Vehicle Dealership Networks", description: "Provide compliant registration as part of the vehicle sales process." },
      { title: "Commercial Fleet Onboarding", description: "Ensure every new fleet vehicle meets compliance requirements before operation." },
      { title: "Government Vehicle Fleets", description: "Maintain certified compliance across publicly operated vehicles." }
    ],
    benefits: [
      { title: "Avoid Regulatory Penalties", description: "Prevent fines and operational disruption from non-compliance." },
      { title: "Prevent Plate Fraud", description: "Eliminate tampering and forgery risk with certified, non-reusable hardware." },
      { title: "Simplify Multi-State Compliance", description: "Standardize certified hardware across regions with different mandates." },
      { title: "Reduce Administrative Burden", description: "Replace manual compliance tracking with automatic verification." },
      { title: "Ensure Continuous Operation", description: "Avoid vehicles being pulled from service over compliance gaps." },
      { title: "Support Government Audits", description: "Provide instantly verifiable, database-integrated compliance records." },
      { title: "Protect Business Reputation", description: "Demonstrate consistent regulatory responsibility across the fleet." },
      { title: "Scale Compliance with Fleet Growth", description: "Maintain certification standards as the fleet expands." }
    ],
    industries: ["Transportation", "Government", "Logistics", "Public Transport", "Manufacturing"],
    productsUsed: [
      { slug: "high-security-registration-plate", why: "Provides tamper-proof, laser-etched vehicle identification that meets mandatory government registration standards." },
      { slug: "pollution-machine", why: "Runs certified emissions testing and issues compliance certificates directly to government databases." }
    ],
    applicationImages: ["/images/solutions/compliance-solutions.png", "/images/solutions/connected-vehicle-platform.png"]
  },
  {
    slug: "automated-testing-solutions",
    name: "Intelligence Test Solutions",
    tagline: "Remove bias from vehicle inspection and driver licensing with fully automated testing infrastructure.",
    description: "Automated vehicle fitness and driving test infrastructure built to government ATS and licensing standards.",
    heroImage: "/images/solutions/automated-testing-solutions.png",
    overview: [
      "Vehicle fitness testing and driver licensing carry enormous public safety weight, but when they're performed manually, they inherit every limitation of manual processes — inconsistency, subjectivity, and the possibility of human error or influence.",
      "Government agencies and testing operators are under growing pressure to make vehicle and driver certification faster, fairer, and fully auditable. A manually scored driving test or a visually inspected vehicle can't offer the same defensibility as a sensor-verified, digitally logged result.",
      "Automated testing infrastructure removes the variability of manual inspection entirely, replacing subjective judgment with consistent, sensor-driven scoring — giving both regulators and the public confidence that every vehicle and every driver is held to the same standard."
    ],
    challenges: [
      { title: "Inconsistent Manual Inspection", description: "Vehicle fitness results vary depending on the inspector performing the test." },
      { title: "Licensing Test Subjectivity", description: "Manual driving test evaluation is vulnerable to inconsistency and bias." },
      { title: "Low Testing Throughput", description: "Manual processes limit how many vehicles or candidates can be tested per day." },
      { title: "Lack of Digital Records", description: "Paper-based results are difficult to audit or dispute." },
      { title: "Regulatory Standard Compliance", description: "Testing infrastructure must meet government ATS and licensing certification requirements." },
      { title: "Corruption & Influence Risk", description: "Manual processes are more vulnerable to external influence than automated systems." }
    ],
    howItWorks: [
      "Vehicles move through a sequence of automated test stations that assess brakes, lights, emissions, and other fitness criteria without manual intervention.",
      "Driving test candidates are evaluated using inductive loop sensors and camera-based monitoring across standardized track scenarios.",
      "Every result is scored digitally and automatically, removing subjective judgment from the outcome.",
      "Results are logged directly into government-linked databases, creating an auditable, tamper-resistant record.",
      "Testing infrastructure is deployed as a turnkey installation, combining civil works and equipment to meet government ATS and licensing standards."
    ],
    applications: [
      { title: "State Transport Department Testing Stations", description: "Operate government-certified vehicle fitness testing at scale." },
      { title: "Private Vehicle Fitness Centers", description: "Offer consistent, defensible testing results to fleet operators." },
      { title: "RTO Driving Test Centers", description: "Standardize driver licensing evaluation across a region." },
      { title: "Fleet Compliance Testing Facilities", description: "Verify large commercial fleets meet fitness standards efficiently." },
      { title: "Driving School Certification Tracks", description: "Provide objective, sensor-based evaluation for driver training programs." },
      { title: "Government Licensing Authorities", description: "Modernize licensing infrastructure with digital, auditable results." },
      { title: "Vehicle Import & Certification Centers", description: "Verify vehicle fitness before entry into commercial operation." },
      { title: "Municipal Transport Authorities", description: "Maintain consistent fitness standards across public vehicle fleets." }
    ],
    benefits: [
      { title: "Eliminate Testing Bias", description: "Remove subjectivity from both vehicle inspection and driver evaluation." },
      { title: "Increase Testing Throughput", description: "Process more vehicles and candidates without sacrificing accuracy." },
      { title: "Create Auditable Records", description: "Maintain digital, tamper-resistant results for every test performed." },
      { title: "Meet Government Standards", description: "Satisfy ATS and licensing certification requirements out of the box." },
      { title: "Reduce Corruption Risk", description: "Replace manually influenced outcomes with automated, sensor-driven scoring." },
      { title: "Improve Public Trust", description: "Demonstrate fair, consistent testing to the public and regulators." },
      { title: "Standardize Results Nationwide", description: "Apply the same testing criteria across every facility." },
      { title: "Support Turnkey Deployment", description: "Implement complete testing infrastructure without piecing together vendors." }
    ],
    industries: ["Government", "Transportation", "Public Transport", "Logistics"],
    productsUsed: [
      { slug: "automated-testing-lane", why: "Runs sequential, sensor-based vehicle fitness checks without manual inspection bias." },
      { slug: "automated-test-driving-track", why: "Scores driver licensing candidates automatically using sensor and camera-based evaluation." }
    ],
    applicationImages: ["/images/solutions/automated-testing-solutions.png", "/images/solutions/connected-vehicle-platform.png"]
  },
  {
    slug: "road-safety-solutions",
    name: "Road Safety Solutions",
    tagline: "Keep roads, work zones, and drivers safer with durable, high-visibility traffic control infrastructure.",
    description: "Traffic control and roadside safety equipment engineered for durability and visibility in demanding outdoor conditions.",
    heroImage: "/images/solutions/road-safety.png",
    overview: [
      "Roads are shared, unpredictable environments, and the infrastructure that manages traffic flow and hazard visibility carries direct responsibility for how safely that environment functions — for drivers, workers, and pedestrians alike.",
      "Poor visibility, inadequate signage, and inconsistent traffic control are contributing factors in a significant share of road incidents, particularly around construction zones, lane diversions, and low-light conditions. Yet roadside safety equipment is often treated as a low-priority purchase rather than active risk management.",
      "Government agencies, contractors, and infrastructure operators need traffic control equipment that performs reliably under real outdoor conditions — not just when new, but for years of sun, rain, and vehicle impact — because degraded safety equipment is a liability, not a cost saving."
    ],
    challenges: [
      { title: "Low Visibility in Work Zones", description: "Poorly marked construction and diversion zones increase collision risk." },
      { title: "Weather & UV Degradation", description: "Standard signage and markers degrade quickly under sustained outdoor exposure." },
      { title: "Inconsistent Traffic Control", description: "Temporary work zones often lack standardized, durable signage." },
      { title: "Vehicle Impact Damage", description: "Roadside markers are frequently damaged or destroyed by vehicle contact." },
      { title: "Nighttime Hazard Visibility", description: "Poorly reflective infrastructure contributes to night-time collision risk." },
      { title: "Rapid Deployment Needs", description: "Temporary work zones require signage that can be set up and removed quickly." }
    ],
    howItWorks: [
      "High-visibility markers and signage are placed to define hazard zones, lane diversions, and work areas clearly for approaching traffic.",
      "Reflective materials rated for outdoor durability ensure visibility is maintained through years of sun, rain, and UV exposure.",
      "Impact-resistant designs allow roadside markers to absorb vehicle contact and spring back into position, rather than breaking and losing effectiveness.",
      "Portable, foldable signage allows work zones to be set up and cleared quickly for short-duration projects.",
      "Equipment is deployed and maintained through a nationwide dealer network, ensuring consistent quality across every installation."
    ],
    applications: [
      { title: "Road Construction Sites", description: "Mark hazard zones and guide traffic safely around active work areas." },
      { title: "Highway Lane Diversions", description: "Maintain clear, durable traffic control during long-term road projects." },
      { title: "Municipal Traffic Management", description: "Standardize signage and markers across city road networks." },
      { title: "Toll Plaza & Parking Facilities", description: "Guide vehicle flow safely through high-traffic access points." },
      { title: "Utility & Infrastructure Work Zones", description: "Protect crews and road users during utility maintenance projects." },
      { title: "Event & Temporary Traffic Control", description: "Manage vehicle flow for short-duration public events." },
      { title: "Government Infrastructure Projects", description: "Meet regulatory signage standards for public roadworks." },
      { title: "Highway Median & Lane Marking", description: "Maintain long-term lane visibility on high-speed roads." }
    ],
    benefits: [
      { title: "Reduce Work Zone Collisions", description: "Improve visibility and hazard awareness around active work areas." },
      { title: "Withstand Outdoor Conditions", description: "Maintain reflectivity and structural integrity for years of exposure." },
      { title: "Survive Vehicle Impact", description: "Recover from contact instead of requiring frequent replacement." },
      { title: "Enable Rapid Deployment", description: "Set up and clear temporary work zones quickly." },
      { title: "Improve Night-Time Safety", description: "Maintain high visibility for drivers in low-light conditions." },
      { title: "Standardize Road Safety", description: "Apply consistent signage and marking standards across projects." },
      { title: "Lower Long-Term Costs", description: "Reduce replacement frequency with durable, weatherproof materials." },
      { title: "Meet Regulatory Standards", description: "Satisfy road safety signage requirements for government projects." }
    ],
    industries: ["Government", "Construction", "Transportation", "Utilities", "Public Transport"],
    productsUsed: [
      { slug: "traffic-cone", why: "Marks hazard zones and guides traffic safely around road work and diversions." },
      { slug: "delineator", why: "Maintains clear lane and median visibility, surviving vehicle impact without losing effectiveness." },
      { slug: "permanent-signs", why: "Provides long-term, reflective signage for highways and government infrastructure projects." },
      { slug: "temporary-work-signs", why: "Enables rapid deployment of traffic control signage for short-duration work zones." }
    ],
    applicationImages: ["/images/solutions/road-safety.png", "/images/solutions/connected-vehicle-platform.png"]
  },
  {
    slug: "workplace-safety",
    name: "Workplace Safety",
    tagline: "Keep road and worksite personnel visible, protected, and compliant in every condition.",
    description: "Personal protective equipment engineered to keep road and worksite personnel visible and safe during extended shifts.",
    heroImage: "/images/solutions/workplace-safety.png",
    overview: [
      "Workers operating on roads and construction sites face a constant, often underestimated risk: being unseen by moving vehicles and equipment in exactly the environments where visibility determines survival.",
      "Standard workwear isn't built for the specific demands of roadside and construction environments — extended shifts, variable weather, and constant exposure to vehicle and machinery traffic. When protective equipment fails to perform, the consequence isn't inconvenience, it's injury.",
      "Organizations responsible for worker safety — from municipal road crews to construction contractors — need equipment that meets visibility standards consistently, holds up to daily wear, and doesn't require workers to choose between protection and comfort during long shifts."
    ],
    challenges: [
      { title: "Low Worker Visibility", description: "Workers near moving traffic and machinery are at constant risk of being unseen." },
      { title: "Inconsistent PPE Standards", description: "Without standardized equipment, worker visibility varies across teams and shifts." },
      { title: "Harsh Site Conditions", description: "Standard clothing doesn't withstand the wear of daily construction site use." },
      { title: "Extended Shift Comfort", description: "Poorly designed protective gear becomes a burden during long working hours." },
      { title: "Regulatory Visibility Compliance", description: "Worksite safety regulations increasingly mandate certified high-visibility equipment." },
      { title: "Seasonal Weather Exposure", description: "Workers need protection that adapts to both heat and cold conditions." }
    ],
    howItWorks: [
      "High-visibility garments use reflective striping and fluorescent fabric to keep workers visible to vehicles and machinery from a distance.",
      "Breathable materials are used for standard shifts, while heavy-duty, reinforced fabrics are used for demanding construction environments.",
      "Reflective elements are tested to withstand repeated washing and outdoor exposure without losing effectiveness.",
      "Sizing and fit options ensure protective equipment is worn consistently, rather than removed for comfort.",
      "Equipment is manufactured to meet road safety visibility standards required for worksite compliance."
    ],
    applications: [
      { title: "Road Construction Crews", description: "Keep workers visible near active traffic and heavy machinery." },
      { title: "Highway Maintenance Teams", description: "Protect crews working in high-speed roadside environments." },
      { title: "Traffic Police & Wardens", description: "Maintain visibility while directing traffic in variable conditions." },
      { title: "Toll Plaza & Parking Staff", description: "Ensure consistent visibility for personnel working near vehicle flow." },
      { title: "Utility & Infrastructure Crews", description: "Protect workers during field maintenance and repair work." },
      { title: "Municipal Public Works Teams", description: "Standardize visibility equipment across city maintenance crews." },
      { title: "Event & Traffic Management Staff", description: "Equip personnel managing vehicle flow at public events." },
      { title: "Warehouse & Yard Personnel", description: "Improve worker visibility in vehicle-heavy logistics environments." }
    ],
    benefits: [
      { title: "Reduce Worker Injuries", description: "Improve visibility in high-risk vehicle and machinery environments." },
      { title: "Standardize Safety Compliance", description: "Apply consistent PPE standards across teams and shifts." },
      { title: "Improve Shift Comfort", description: "Keep workers protected without sacrificing comfort during long hours." },
      { title: "Withstand Site Conditions", description: "Hold up to daily wear in demanding construction environments." },
      { title: "Meet Regulatory Standards", description: "Satisfy road safety visibility compliance requirements." },
      { title: "Adapt to Weather Conditions", description: "Protect workers across variable seasonal conditions." },
      { title: "Extend Equipment Lifespan", description: "Maintain reflective performance through repeated use and washing." },
      { title: "Support Worksite Accountability", description: "Make safety compliance visibly enforceable on site." }
    ],
    industries: ["Construction", "Government", "Transportation", "Utilities", "Public Transport"],
    productsUsed: [
      { slug: "safety-jacket", why: "Keeps road and worksite workers visible during standard shifts with breathable, reflective fabric." },
      { slug: "construction-worker-jacket", why: "Provides heavy-duty visibility protection built for demanding construction site conditions." }
    ],
    applicationImages: ["/images/solutions/workplace-safety.png", "/images/solutions/compliance-solutions.png"]
  },
  {
    slug: "printing-identification",
    name: "Printing & Identification",
    tagline: "Issue secure, verifiable documents and identification at the scale your operations demand.",
    description: "Secure printing systems engineered for high-throughput, tamper-evident document and identification issuance.",
    heroImage: "/images/solutions/printing-identification.png",
    overview: [
      "Every registration certificate, license, and compliance document a business or government agency issues carries a level of trust — proof that the holder is who they claim to be, or that a vehicle meets the standard it's certified for. That trust depends entirely on the document being difficult to forge.",
      "Standard printing systems weren't built for this level of scrutiny. As institutions scale document issuance — registration certificates, licenses, compliance records — they need printing infrastructure that's both high-throughput and secure, without one compromising the other.",
      "Government programs and large institutions need a printing system that treats every document as a security artifact, not just a piece of paper, while still operating at the volume and speed that high-scale issuance demands."
    ],
    challenges: [
      { title: "Document Forgery Risk", description: "Standard printing methods are vulnerable to counterfeiting and tampering." },
      { title: "High-Volume Issuance Demands", description: "Large institutions need to print thousands of secure documents without delays." },
      { title: "Government Database Integration", description: "Issued documents must be verifiable against official records." },
      { title: "Multi-Format Requirements", description: "Institutions need to issue cards, certificates, and documents from one system." },
      { title: "Audit & Accountability Needs", description: "Every printed document must be traceable for compliance and audit purposes." },
      { title: "Centralized vs. Distributed Deployment", description: "Large programs need printing infrastructure that scales across locations." }
    ],
    howItWorks: [
      "Secure printing systems apply tamper-evident features directly during the print process, making forgery immediately detectable.",
      "High-throughput print engines handle large-volume issuance without compromising security features.",
      "Every printed document is logged automatically, creating an audit trail tied to government or institutional databases.",
      "The system supports multiple formats — cards, certificates, and compliance documents — from a single platform.",
      "Deployment can be centralized at one facility or distributed across multiple locations, depending on institutional need."
    ],
    applications: [
      { title: "Vehicle Registration Certificate Printing", description: "Issue secure, verifiable registration documents at scale." },
      { title: "Driving License Issuance", description: "Print tamper-evident licenses tied to government identity records." },
      { title: "Compliance Certificate Programs", description: "Issue verifiable compliance documents for regulatory programs." },
      { title: "Government ID Programs", description: "Support large-scale identification issuance for public institutions." },
      { title: "Educational Institution Credentialing", description: "Print secure certificates and identification for large student populations." },
      { title: "Corporate Identification Systems", description: "Issue secure employee or access credentials at enterprise scale." },
      { title: "State Transport Department Programs", description: "Support high-volume document issuance for transport authorities." },
      { title: "Multi-Location Institutional Printing", description: "Deploy consistent, secure printing across distributed offices." }
    ],
    benefits: [
      { title: "Prevent Document Forgery", description: "Apply tamper-evident security features to every printed document." },
      { title: "Support High-Volume Issuance", description: "Print at institutional scale without sacrificing security." },
      { title: "Ensure Government Verifiability", description: "Integrate directly with official databases for document validation." },
      { title: "Maintain Full Audit Trails", description: "Track every document issued for compliance and accountability." },
      { title: "Simplify Multi-Format Printing", description: "Issue cards, certificates, and documents from a single system." },
      { title: "Scale Across Locations", description: "Deploy centralized or distributed printing based on institutional need." },
      { title: "Reduce Fraud-Related Costs", description: "Lower the operational cost of managing forged or disputed documents." },
      { title: "Support Government Programs", description: "Meet the security and scale requirements of public institutions." }
    ],
    industries: ["Government", "Transportation", "Manufacturing", "Public Transport"],
    productsUsed: [
      { slug: "printing-solution", why: "Provides secure, tamper-evident, high-throughput printing for registration and compliance documents." }
    ],
    applicationImages: ["/images/solutions/printing-identification.png", "/images/solutions/compliance-solutions.png"]
  },
  {
    slug: "automated-testing-lane",
    name: "Automated Testing Lane",
    tagline: "Test every vehicle's brakes, lights, and emissions with the same sensor-driven accuracy, every time.",
    description: "A fully automated, multi-station lane that certifies vehicle fitness without manual inspection bias.",
    heroImage: "/images/verticalb2g/frame-7119.png",
    overview: [
      "Vehicle fitness testing decides whether a vehicle stays on the road — but when that decision comes down to one inspector's visual check, the result depends as much on who's testing as what's being tested.",
      "An automated testing lane removes that variability by routing every vehicle through the same sequence of sensor-based stations — brakes, headlights, suspension, emissions, speedometer — regardless of who owns the vehicle or which shift is running.",
      "For state transport departments and private fitness centers alike, this turns fitness certification from a subjective checkpoint into a repeatable, government-auditable process that scales to the volume a modern vehicle population actually requires."
    ],
    challenges: [
      { title: "Inconsistent Manual Inspection", description: "Vehicle fitness results vary depending on which inspector performs the test." },
      { title: "Low Testing Throughput", description: "Manual processes limit how many vehicles can be tested per day." },
      { title: "Lack of Digital Records", description: "Paper-based fitness results are difficult to audit or dispute." },
      { title: "Regulatory Standard Compliance", description: "Testing infrastructure must meet government Automated Testing Station (ATS) requirements." },
      { title: "Corruption & Influence Risk", description: "Manual processes are more vulnerable to external influence than automated, sensor-scored testing." }
    ],
    howItWorks: [
      "A vehicle enters the lane and moves sequentially through automated test stations covering brakes, lights, suspension, emissions, and speedometer accuracy.",
      "Each station captures its measurement through sensors rather than visual inspection, with no manual override in the scoring path.",
      "Results are compiled digitally into a single fitness scorecard the moment the vehicle exits the lane.",
      "Scorecards log directly into government ATS databases, creating an auditable record tied to the vehicle's registration.",
      "The lane is delivered as a turnkey installation — civil works and equipment together — so testing centers don't have to integrate separate vendors themselves."
    ],
    applications: [
      { title: "State Transport Department Testing Stations", description: "Operate government-certified vehicle fitness testing at scale." },
      { title: "Private Vehicle Fitness Centers", description: "Offer consistent, defensible testing results to fleet operators." },
      { title: "Fleet Compliance Testing Facilities", description: "Verify large commercial fleets meet fitness standards efficiently." },
      { title: "Vehicle Import & Certification Centers", description: "Verify vehicle fitness before entry into commercial operation." },
      { title: "Municipal Transport Authorities", description: "Maintain consistent fitness standards across public vehicle fleets." }
    ],
    benefits: [
      { title: "Eliminate Testing Bias", description: "Remove subjectivity from vehicle fitness inspection entirely." },
      { title: "Increase Testing Throughput", description: "Process more vehicles per day without sacrificing accuracy." },
      { title: "Create Auditable Records", description: "Maintain digital, tamper-resistant results for every test performed." },
      { title: "Meet Government ATS Standards", description: "Satisfy Automated Testing Station certification requirements out of the box." },
      { title: "Reduce Corruption Risk", description: "Replace manually influenced outcomes with automated, sensor-driven scoring." },
      { title: "Support Turnkey Deployment", description: "Implement complete lane infrastructure without piecing together vendors." }
    ],
    industries: ["Government", "Transportation", "Public Transport", "Logistics"],
    productsUsed: [
      { slug: "automated-testing-lane", why: "Runs sequential, sensor-based vehicle fitness checks without manual inspection bias." }
    ],
    applicationImages: ["/images/solutions/automated-testing-solutions.png", "/images/solutions-topics/automated-testing-solutions.jpg"]
  },
  {
    slug: "automated-driving-test-track",
    name: "Automated Driving Test Track",
    tagline: "Score every licensing candidate the same way, with sensors and cameras instead of an examiner's opinion.",
    description: "A sensor-instrumented driving test track that scores licensing candidates automatically against a fixed standard.",
    heroImage: "/images/verticalb2g/frame-7120.png",
    overview: [
      "A driving license is a public safety certification, but manual road tests score candidates against an examiner's judgment in the moment — variable by examiner, by mood, and occasionally by influence.",
      "An automated driving test track replaces that judgment with inductive-loop sensors and camera-based monitoring across standardized maneuvers — reverse parking, parallel parking, gradient starts, S-curves — so every candidate is measured against the same fixed criteria.",
      "RTOs and licensing authorities use these tracks to turn licensing from a subjective pass/fail conversation into a digitally scored, database-linked result that both the candidate and the regulator can trust."
    ],
    challenges: [
      { title: "Licensing Test Subjectivity", description: "Manual driving test evaluation is vulnerable to inconsistency and influence." },
      { title: "Low Testing Throughput", description: "Manual road tests limit how many candidates can be evaluated per day." },
      { title: "Lack of Digital Records", description: "Paper-based pass/fail results are difficult to audit or dispute." },
      { title: "Regulatory Standard Compliance", description: "Track infrastructure must meet Automated Driving Test Track certification standards." },
      { title: "Corruption & Influence Risk", description: "Manual scoring is more vulnerable to external influence than sensor-based evaluation." }
    ],
    howItWorks: [
      "Candidates drive through a fixed sequence of track modules — reverse, parallel park, gradient, S-curve — instrumented with inductive loop sensors and cameras.",
      "Sensors detect position, line crossings, and maneuver completion automatically, without an examiner in the vehicle.",
      "Camera-based monitoring records violations and maneuver execution for review and dispute resolution.",
      "Results are compiled into an automated digital scorecard the moment the candidate finishes the circuit.",
      "Scorecards integrate directly with RTO licensing databases, standardizing evaluation criteria across every test center using the track."
    ],
    applications: [
      { title: "RTO Driving Test Centers", description: "Standardize driver licensing evaluation across a region." },
      { title: "State Transport Authorities", description: "Modernize licensing infrastructure with digital, auditable results." },
      { title: "Driving School Certification Tracks", description: "Provide objective, sensor-based evaluation for driver training programs." },
      { title: "Government Licensing Authorities", description: "Standardize licensing criteria across multiple test centers." },
      { title: "Municipal Transport Authorities", description: "Maintain consistent licensing standards region-wide." }
    ],
    benefits: [
      { title: "Remove Bias From License Testing", description: "Score every candidate against the same fixed, sensor-based criteria." },
      { title: "Standardize Evaluation Nationwide", description: "Apply identical testing criteria across every facility using the track." },
      { title: "Integrate With RTO Licensing Systems", description: "Feed results directly into government licensing databases." },
      { title: "Increase Testing Throughput", description: "Evaluate more candidates per day without sacrificing rigor." },
      { title: "Create Auditable Scorecards", description: "Maintain a digital, disputable record for every candidate tested." },
      { title: "Improve Public Trust", description: "Demonstrate fair, consistent licensing to candidates and regulators." }
    ],
    industries: ["Government", "Transportation", "Public Transport"],
    productsUsed: [
      { slug: "automated-test-driving-track", why: "Scores driver licensing candidates automatically using sensor and camera-based evaluation." }
    ],
    applicationImages: ["/images/solutions/automated-testing-solutions.png", "/images/solutions-topics/automated-testing-solutions.jpg"]
  },
  {
    slug: "high-security-registration-plate",
    name: "High Security Registration Plate",
    tagline: "Every vehicle carries identification that can't be forged, cloned, or reused — verified against government records from the moment it's fitted.",
    description: "Tamper-proof, laser-etched vehicle registration plates manufactured and issued to government HSRP specification.",
    heroImage: "/images/verticals/frame-7122.png",
    overview: [
      "A registration plate is only useful as identification if it can't be faked. Standard plates can be duplicated, repainted, or swapped between vehicles with basic tools — which is exactly why regulators moved to a manufactured, tamper-proof standard instead of a printed one.",
      "APM manufactures High Security Registration Plates to that standard: laser-branded identification numbers, chromium-based tamper-evident holograms, and non-reusable snap locks, produced at volume and fitted through a nationwide dealership network rather than issued as a generic aftermarket part.",
      "For state transport departments and OEM partners, the plate isn't just a compliance line item — it's a manufacturing and issuance program: every plate produced is tied to a specific vehicle record, fitted by a certified dealer, and verifiable against the government database the moment it's checked."
    ],
    challenges: [
      { title: "Plate Fraud & Cloning", description: "Standard plates are easy to duplicate, repaint, or swap between vehicles." },
      { title: "Multi-State Specification Variation", description: "Plate specifications differ across regions, complicating consistent manufacturing and fitment." },
      { title: "High-Volume Manufacturing Demand", description: "State-scale issuance requires manufacturing millions of uniquely coded plates without error." },
      { title: "Government Database Integration", description: "Every plate issued must be traceable against the vehicle record it was manufactured for." },
      { title: "Dealer Network Fitment Consistency", description: "Plates must be fitted correctly and consistently across thousands of dealership locations." }
    ],
    howItWorks: [
      "Each plate is manufactured with a laser-branded permanent identification number unique to the vehicle it's produced for.",
      "A chromium-based hologram sticker is applied during manufacturing, making any attempt at removal or duplication immediately visible.",
      "Non-reusable snap locks secure the plate to the vehicle — once removed, the plate cannot be reinstalled or transferred.",
      "Every plate produced is registered against the vehicle's record before it leaves the manufacturing line, tying identification to issuance from the start.",
      "Fitment happens through APM's certified nationwide dealer and OEM network, keeping installation quality and database registration consistent at state scale."
    ],
    applications: [
      { title: "New Vehicle Registration", description: "Equip new vehicles with certified, tamper-proof identification from day one." },
      { title: "Fleet-Wide Plate Replacement", description: "Standardize compliant registration across large, growing fleets." },
      { title: "Vehicle Dealership Networks", description: "Provide compliant registration as part of the vehicle sales process." },
      { title: "OEM Fitment Programs", description: "Integrate certified plate manufacturing directly into vehicle production lines." },
      { title: "State Transport Department Programs", description: "Support government-run compliance and registration initiatives." },
      { title: "Multi-State Fleet Operations", description: "Maintain consistent plate specification across vehicles operating in different regions." }
    ],
    benefits: [
      { title: "Prevent Plate Fraud & Cloning", description: "Eliminate tampering, duplication, and reuse with certified, non-reusable hardware." },
      { title: "Ensure Government Verifiability", description: "Tie every plate to a vehicle record checkable against official databases." },
      { title: "Standardize Issuance Nationwide", description: "Apply the same manufacturing and fitment standard across every state program." },
      { title: "Support OEM Integration", description: "Provide manufacturers with plate programs ready for production-line integration." },
      { title: "Reduce Administrative Burden", description: "Replace manual plate tracking with database-tied issuance." },
      { title: "Improve Law Enforcement Accuracy", description: "Give authorities identification they can trust at a glance." }
    ],
    industries: ["Government", "Transportation", "Manufacturing", "Public Transport"],
    productsUsed: [
      { slug: "high-security-registration-plate", why: "The certified, laser-etched plate hardware this solution manufactures and issues at scale." }
    ],
    applicationImages: ["/images/solutions/printing-identification.png", "/images/solutions/compliance-solutions.png"]
  },
  {
    slug: "industrial-label-printing",
    name: "Industrial Label Printing",
    tagline: "Give every part, shipment, and asset a label that survives the environment it works in — and the traceability audits that check it.",
    description: "Durable, high-throughput label printing for asset marking, serialization, and traceability across manufacturing and logistics operations.",
    heroImage: "/images/solutions/printing-identification.png",
    overview: [
      "A label that fades, peels, or scans incorrectly isn't a cosmetic problem — it's a traceability gap. When a part or shipment can't be reliably identified on the floor, the cost shows up later as a failed recall trace, an inventory mismatch, or a compliance audit with no clean answer.",
      "Standard office label printing was never built for manufacturing or logistics environments — heat, chemical exposure, abrasion, and constant handling degrade it quickly. Industrial label printing uses label stock and print processes rated for the specific environment it's deployed in, so the label survives as long as the part or shipment does.",
      "Manufacturers and logistics operators deploy this as a production-line system, not a standalone printer: labels are serialized automatically, tied directly into plant ERP or MES systems, and validated for scan reliability before a part or shipment ever leaves the facility."
    ],
    challenges: [
      { title: "Label Durability in Harsh Environments", description: "Standard labels degrade quickly under heat, chemical exposure, or abrasion." },
      { title: "Traceability & Serialization Compliance", description: "Regulated industries require verifiable, serialized identification for every part or batch." },
      { title: "High-Throughput Printing Demand", description: "Production lines need labels printed and applied at line speed, not in batches." },
      { title: "ERP/MES Integration Complexity", description: "Label data must stay synchronized with plant production and inventory systems." },
      { title: "Multi-Site Label Consistency", description: "Manufacturers operating multiple facilities need identical labeling standards across all of them." },
      { title: "Scan Reliability", description: "A label that doesn't scan cleanly at the next stage defeats the purpose of labeling at all." }
    ],
    howItWorks: [
      "Label stock is selected for the specific environment it will face — chemical-resistant, thermal-resistant, or abrasion-resistant — rather than a generic default.",
      "High-speed print engines apply serialized barcodes, QR codes, or RFID-ready labels at production-line speed.",
      "Label data integrates directly with the plant's ERP or MES system, so serialization happens automatically as parts move through production.",
      "Printed labels are validated for scan reliability before the part or shipment moves to the next stage.",
      "The same labeling standard and equipment specification are deployed identically across every facility in a multi-site operation."
    ],
    applications: [
      { title: "Manufacturing Part Marking", description: "Serialize and identify individual parts as they move through production." },
      { title: "Warehouse & Logistics Labeling", description: "Apply durable, scannable labels to shipments and pallets at volume." },
      { title: "Cold Chain & Pharmaceutical Labeling", description: "Maintain label integrity and traceability under refrigerated and regulated conditions." },
      { title: "Electronics & Component Traceability", description: "Track individual components through assembly and warranty service." },
      { title: "Automotive Parts Serialization", description: "Meet OEM traceability requirements for individual part identification." },
      { title: "Multi-Site Industrial Deployments", description: "Standardize labeling equipment and specification across multiple plants." }
    ],
    benefits: [
      { title: "Eliminate Mislabeling & Traceability Gaps", description: "Ensure every part and shipment carries a durable, scannable identity." },
      { title: "Withstand Harsh Industrial Environments", description: "Maintain label integrity through heat, chemicals, and abrasion." },
      { title: "Meet Serialization & Compliance Mandates", description: "Satisfy regulated-industry traceability requirements automatically." },
      { title: "Integrate Directly With Plant Systems", description: "Synchronize labeling with ERP and MES data in real time." },
      { title: "Reduce Recall & Inventory-Error Costs", description: "Trace parts and shipments accurately when it matters most." },
      { title: "Scale Across Multiple Facilities", description: "Apply one labeling standard consistently across every plant." }
    ],
    industries: ["Manufacturing", "Logistics", "Utilities", "Oil & Gas"],
    productsUsed: [
      { slug: "industrial-label-printer", why: "Prints durable, serialized labels at production speed with direct ERP/MES integration." }
    ],
    applicationImages: ["/images/solutions/printing-identification.png", "/images/solutions/industrial-iot.png"]
  },
  {
    slug: "asset-identification",
    name: "Asset Identification",
    tagline: "Know exactly what every asset is, who owns it, and where it sits in your registry — without a physical walkthrough.",
    description: "RFID and barcode-based asset identification and tagging for enterprise and government asset registries, distinct from GPS-based vehicle and equipment tracking.",
    heroImage: "/images/solutions/asset-tracking.png",
    overview: [
      "Not every asset problem is a location problem. A government department or large enterprise doesn't just need to know where its furniture, IT equipment, or tools physically are — it needs to know what's officially on the books, who's responsible for it, and whether the physical inventory actually matches the register.",
      "That reconciliation is traditionally done with a clipboard: someone walks every floor, checks every item against a spreadsheet, and reconciles the gaps by hand — slow, error-prone, and out of date the moment it's finished. Asset Identification replaces that walkthrough with RFID or barcode tags linked to a live digital record for every asset.",
      "This is a different problem from GPS-based asset tracking, which answers 'where is this moving equipment right now.' Asset Identification answers 'what exactly is this, who owns it, and does it match what the register says' — the audit and accountability layer enterprises and government departments need underneath their asset registers."
    ],
    challenges: [
      { title: "Manual Asset Audits", description: "Physically walking every site to reconcile assets against the register is slow and error-prone." },
      { title: "Custody & Ownership Disputes", description: "Assets moved between departments or sites are difficult to trace back to a responsible owner." },
      { title: "Inventory Register Mismatches", description: "Physical assets on the floor rarely match what the official register says over time." },
      { title: "High Asset Write-Off Rates", description: "Assets that can't be located get written off even when they're still in use somewhere." },
      { title: "ERP / Asset-Register Integration", description: "Identification data needs to sync with existing asset-management software, not replace it." },
      { title: "Tag Durability", description: "Tags need to survive the full working life of the asset they're attached to." }
    ],
    howItWorks: [
      "Each asset is tagged with an RFID or barcode identifier during onboarding, linked to a digital record — owner, department, purchase date, condition.",
      "Handheld or fixed RFID readers scan tagged assets during routine audits, replacing manual walkthroughs with automated reads.",
      "The system reconciles what's physically present against the official register automatically.",
      "Discrepancies — missing assets, unregistered items, assets in the wrong location — are flagged for follow-up instead of discovered months later.",
      "The system integrates with existing ERP or asset-management software, so it strengthens the current register rather than requiring a new one."
    ],
    applications: [
      { title: "Government Department Asset Registries", description: "Maintain an auditable, verifiable register of departmental assets." },
      { title: "Enterprise IT & Furniture Audits", description: "Reconcile IT equipment and furniture inventories across offices automatically." },
      { title: "Hospital & Institutional Equipment Tracking", description: "Maintain accountability for shared medical and institutional equipment." },
      { title: "Educational Institution Inventory", description: "Track lab, IT, and facility assets across a campus." },
      { title: "Manufacturing Plant Tool Cribs", description: "Verify tool and equipment custody across shifts and departments." },
      { title: "Multi-Site Enterprise Reconciliation", description: "Maintain one consistent asset register across distributed sites." }
    ],
    benefits: [
      { title: "Eliminate Manual Audit Hours", description: "Replace physical walkthroughs with automated RFID/barcode reconciliation." },
      { title: "Reduce Asset Loss & Write-Offs", description: "Locate and account for assets that would otherwise be written off." },
      { title: "Resolve Custody Disputes", description: "Settle ownership questions with a verifiable digital record." },
      { title: "Integrate With Existing Systems", description: "Strengthen current ERP and asset-management software instead of replacing it." },
      { title: "Standardize Identification Across Departments", description: "Apply one tagging and audit standard organization-wide." },
      { title: "Support Statutory Audit Requirements", description: "Produce audit-ready asset records on demand." }
    ],
    industries: ["Government", "Manufacturing", "Utilities", "Logistics"],
    productsUsed: [
      { slug: "asset-id-tag-system", why: "Tags and digitally registers assets so audits reconcile the register automatically." }
    ],
    applicationImages: ["/images/solutions/asset-tracking.png", "/images/solutions/industrial-iot.png"]
  },
  {
    slug: "government-identification",
    name: "Government Identification",
    tagline: "Issue licenses, permits, and identity documents that citizens and auditors can both trust.",
    description: "Secure, tamper-evident card and document issuance for government identification and licensing programs.",
    heroImage: "/images/solutions/printing-identification.png",
    overview: [
      "A driving license or state ID card is only as trustworthy as it is hard to fake — and government programs issuing them at citizen scale face a harder version of that problem than almost any other printing use case: millions of documents, each one tied to a real identity, each one a potential fraud target.",
      "Government Identification covers that issuance chain directly — secure card and document printing with tamper-evident features applied during production, integrated with the government identity or licensing database the document is drawn from, and produced at the volume state and district programs actually require.",
      "This sits alongside APM's High Security Registration Plate and Industrial Label Printing solutions as the citizen-identity leg of the same printing and identification portfolio — same manufacturing discipline, applied to licenses, permits, and ID cards instead of vehicles or assets."
    ],
    challenges: [
      { title: "Document Forgery Risk", description: "Standard printing methods are vulnerable to counterfeiting and tampering." },
      { title: "High-Volume Citizen Issuance", description: "State and district programs need to issue documents at citizen-population scale without delays." },
      { title: "Government Database Integration", description: "Every issued document must be verifiable against the identity or licensing record it was drawn from." },
      { title: "Multi-Format Requirements", description: "Programs need to issue licenses, ID cards, and permits from one coordinated system." },
      { title: "Audit & Accountability Needs", description: "Every printed document must be traceable for compliance and audit purposes." },
      { title: "Centralized vs. Distributed Deployment", description: "Large programs need printing infrastructure that scales across state and district offices." }
    ],
    howItWorks: [
      "Secure printing systems apply tamper-evident features — holograms, laser engraving, embedded codes — directly during the print process.",
      "High-throughput print engines handle citizen-scale issuance volume without compromising those security features.",
      "Every document printed is logged automatically against the citizen or licensing database it draws from.",
      "The platform supports multiple formats — driving licenses, ID cards, permits, certificates — from a single system.",
      "Deployment can be centralized at state facilities or distributed across district offices, depending on program scale."
    ],
    applications: [
      { title: "Driving License Issuance", description: "Print tamper-evident licenses tied to government identity records." },
      { title: "State ID Card Programs", description: "Issue citizen identification at state or district scale." },
      { title: "Government Employee Credentialing", description: "Issue secure identification for public-sector employees." },
      { title: "Educational Credentialing at State Scale", description: "Print secure certificates for large student populations." },
      { title: "Permit & Certificate Issuance", description: "Issue verifiable compliance and permit documents for regulatory programs." },
      { title: "Multi-District Government Printing Programs", description: "Deploy consistent, secure printing across distributed district offices." }
    ],
    benefits: [
      { title: "Prevent Document Forgery", description: "Apply tamper-evident security features to every printed document." },
      { title: "Support Citizen-Scale Issuance", description: "Print at state and district population scale without sacrificing security." },
      { title: "Ensure Government Verifiability", description: "Integrate directly with official databases for document validation." },
      { title: "Maintain Full Audit Trails", description: "Track every document issued for compliance and accountability." },
      { title: "Simplify Multi-Format Issuance", description: "Issue licenses, cards, and permits from a single system." },
      { title: "Reduce Fraud-Related Costs", description: "Lower the operational cost of managing forged or disputed documents." }
    ],
    industries: ["Government", "Public Transport", "Transportation"],
    productsUsed: [
      { slug: "printing-solution", why: "Provides the secure, tamper-evident, high-throughput printing this solution issues licenses and ID cards on." }
    ],
    applicationImages: ["/images/solutions/printing-identification.png", "/images/solutions/compliance-solutions.png"]
  },
  {
    slug: "industrial-monitoring",
    name: "Industrial Monitoring",
    tagline: "Rugged telemetry, machinery diagnostics, and cellular connectivity for remote utility and industrial assets.",
    description: "Ruggedized telemetry sensors and cellular connectivity solutions built to monitor generator health, tank levels, and industrial machinery under extreme conditions.",
    heroImage: "/images/solutions/industrial-iot.png",
    overview: [
      "Industrial sites and utilities operate expensive machinery that must remain functional to prevent service disruptions. When equipment fails in remote locations or during critical shifts, the cost of unplanned downtime accumulates rapidly. Traditional maintenance relies on manual inspections or fixed schedules, both of which fail to catch wear-and-tear before it leads to breakdown.",
      "APM's Industrial Monitoring solution replaces guesswork with continuous, edge-level diagnostics. We deploy rugged telemetry hardware that connects directly to generators, pumps, compressor stations, and tanks, streaming real-time operational metrics over a secure cellular network.",
      "Whether measuring engine runtime, fuel consumption, fluid temperatures, or vibration thresholds, our sensors capture data where it happens. This raw information is translated into actionable alerts, allowing maintenance teams to schedule repairs based on actual equipment usage and prevent failures before they occur."
    ],
    challenges: [
      { title: "High Cost of Equipment Failure", description: "Unplanned breakdowns in utility, mining, or factory machinery halt operations and cause immediate financial losses." },
      { title: "Remote Asset Isolation", description: "Equipment located in remote fields or unmanned stations is difficult to monitor regularly without automated telemetry." },
      { title: "Harsh Industrial Environments", description: "Standard electronic sensors degrade or fail under exposure to extreme dust, vibration, moisture, and heat." },
      { title: "Inefficient Maintenance Scheduling", description: "Fixed-interval maintenance schedules either service equipment too early, wasting resources, or too late, missing critical failures." }
    ],
    howItWorks: [
      "Ruggedized sensors are installed on industrial equipment to measure key metrics like vibration, temperature, run hours, and fuel levels.",
      "Edge telemetry controllers transmit these diagnostics securely via embedded M2M cellular eSIMs to a central cloud dashboard.",
      "An automated rules engine monitors the stream, flagging any reading that exceeds safe operational thresholds.",
      "Maintenance alerts are generated automatically and sent to field service teams, complete with diagnostics and location data.",
      "Historical usage and performance patterns are aggregated, helping managers optimize asset allocation and plan long-term equipment servicing."
    ],
    applications: [
      { title: "Remote Generator Telemetry", description: "Monitor fuel consumption, engine health, and battery levels for backup power systems." },
      { title: "Water and Fluid Pump Monitoring", description: "Track pump pressure, motor temperature, and flow rates to detect blockages or wear." },
      { title: "Industrial Compressor Diagnostics", description: "Measure vibration levels and thermal metrics to schedule predictive maintenance." },
      { title: "Storage Tank Level Sensing", description: "Get real-time volume alerts to optimize fuel or chemical replenishment routes." }
    ],
    benefits: [
      { title: "Prevent Breakdowns", description: "Identify operating anomalies early and schedule service before a failure occurs." },
      { title: "Reduce Fuel Theft", description: "Detect sudden fuel level drops in remote generators and equipment tanks." },
      { title: "Extend Machinery Lifespan", description: "Keep equipment running within safe vibration and thermal limits." },
      { title: "Eliminate Manual Readings", description: "Automate data collection to save labor hours and prevent transcription errors." }
    ],
    industries: ["Utilities", "Manufacturing", "Mining", "Construction", "Oil & Gas"],
    productsUsed: [
      { slug: "iot-m2m-esim", why: "Ensures reliable, secure cellular connectivity for telemetry devices in remote areas." },
      { slug: "dc-to-dc-converter", why: "Stabilizes power delivery from industrial generators to protect sensitive edge sensors." }
    ]
  },
  {
    slug: "connected-vehicle-platform",
    name: "Connected Vehicle Platform",
    tagline: "A unified enterprise platform connecting vehicles, devices, and fleet managers in real time.",
    description: "Cloud-native platform providing live GPS mapping, video playback, geofencing, and automated exception reporting for commercial fleets.",
    heroImage: "/images/solutions/software-solutions-realistic.png",
    overview: [
      "Managing a modern commercial fleet involves coordinating a large volume of moving parts: vehicle locations, safety incidents, fuel logs, and compliance records. When these data points live in separate software dashboards, fleet managers spend more time shifting between screens than making operational improvements.",
      "APM's Connected Vehicle Platform unifies all incoming telemetry into a single, intuitive interface. By consolidating live GPS tracking, camera streams, and safety alerts into one dashboard, the platform gives managers a real-time view of their entire operation.",
      "Built for enterprise scale, the platform features robust geofencing, route matching, and exception alerting. Instead of watching maps all day, managers receive instant notifications for events that require action — such as route deviations, speed violations, or harsh braking — enabling them to manage by exception and protect their margins."
    ],
    challenges: [
      { title: "Fragmented Operations Management", description: "Operating separate software systems for tracking, camera feeds, and vehicle maintenance increases overhead." },
      { title: "Inefficient Exception Response", description: "Without instant alerts, managers respond to route deviations or safety violations hours after they occur." },
      { title: "Difficult Visual Verification", description: "Retrieving video footage to verify accident claims is slow and complex when video systems aren't integrated with GPS logs." },
      { title: "High Administrative Workload", description: "Manually compiling driver hours, fuel sheets, and trip logs consumes significant back-office labor." }
    ],
    howItWorks: [
      "Onboard GPS, camera, and sensor systems stream live coordinates and alerts securely to APM's ingestion servers.",
      "The cloud platform matches coordinates with active routes, customer geofences, and speed limit databases.",
      "The dashboard updates in real time, displaying vehicle status, live maps, and active driver alerts in one interface.",
      "Automated reports compile trip history, driver safety scores, and vehicle utilization details daily.",
      "Fleet managers log in from any web browser or mobile app to manage dispatches, review alerts, and retrieve video clips."
    ],
    applications: [
      { title: "Real-Time Fleet Dispatching", description: "Assign jobs and route vehicles dynamically based on live location and traffic data." },
      { title: "Visual Incident Verification", description: "Retrieve dash cam clips instantly to verify accident details or dispute insurance claims." },
      { title: "Geofence Arrival Tracking", description: "Automate customer notifications when delivery vehicles enter or leave warehouse boundaries." },
      { title: "Automated Trip Reporting", description: "Compile detailed, audit-ready route and stop logs for driver compliance audits." }
    ],
    benefits: [
      { title: "Consolidated Dashboard", description: "See tracking, cameras, and vehicle health in a single web browser window." },
      { title: "Manage by Exception", description: "Focus on operational issues with real-time alerts for speeding, idling, or route deviation." },
      { title: "Faster Incident Resolution", description: "Access recorded camera footage immediately to clear false claims and protect drivers." },
      { title: "Reduce Back-Office Paperwork", description: "Automate mileage, trip logs, and utilization reporting to save administrative hours." }
    ],
    industries: ["Logistics", "Transportation", "School Transportation", "Public Transport", "Government"],
    productsUsed: [
      { slug: "apm-connect-enterprise", why: "Unifies live location, video feed, and diagnostics in one control panel." },
      { slug: "rover-connect-consumer", why: "Provides personal vehicle tracking, geofencing, and towing alerts directly on smartphones." }
    ]
  },
  {
    slug: "fleet-analytics",
    name: "Fleet Analytics & APIs",
    tagline: "High-throughput APIs and enterprise analytics to integrate vehicle telemetry with your core business systems.",
    description: "Developer-first APIs and data services connecting live vehicle tracking, safety, and diagnostic streams directly to custom enterprise software.",
    heroImage: "/images/solutions/software-solutions-realistic.png",
    overview: [
      "Vehicle telemetry and sensor data is most valuable when it flows directly into the software systems that run your business — such as ERPs, CRM platforms, dispatch databases, and custom logistics portals. Storing this information in a standalone dashboard prevents you from automating core processes like billing, routing, and customer communication.",
      "APM's Fleet Analytics & APIs solution is designed specifically to bridge this gap. We provide developers with secure, high-throughput REST APIs, webhooks, and raw data streams that connect vehicle locations, driver safety logs, and diagnostic alerts directly to your internal software.",
      "Whether you are building a custom customer delivery portal, automating maintenance dispatches in SAP, or analyzing long-term driver safety patterns in your business intelligence tool, our APIs deliver structured, reliable data in real time. We handle the complexity of hardware ingestion, leaving you free to build custom software that drives efficiency."
    ],
    challenges: [
      { title: "Data Siloed in Standalone Dashboards", description: "Back-office workflows require manual data entry when vehicle tracking systems don't share data with internal ERPs." },
      { title: "Complex IoT Ingestion", description: "Building custom systems to ingest raw, asynchronous cellular data from thousands of edge devices is costly and complex." },
      { title: "Delayed Customer Communication", description: "Without real-time data integration, businesses cannot provide customers with live delivery tracking or accurate ETAs." },
      { title: "Lack of Custom Reporting", description: "Pre-built fleet reports often lack the specific formatting or data fields required for company-specific audits." }
    ],
    howItWorks: [
      "Onboard hardware transmits telemetry to APM's ingestion layer, where it is validated, cleaned, and structured.",
      "Developers connect their internal applications to APM's endpoints using standard secure authentication.",
      "Webhooks push real-time event logs — like geofence entries or engine diagnostics — directly to custom databases.",
      "REST APIs allow internal software to query historical location history, vehicle run hours, and driver safety scores on demand.",
      "Data formats are standardized as clean JSON, making integration with modern software frameworks straightforward."
    ],
    applications: [
      { title: "Custom Customer Portals", description: "Embed live vehicle tracking links and dynamic ETAs directly inside your customer-facing app." },
      { title: "ERP and Maintenance Automation", description: "Push engine runtime hours directly to SAP or Salesforce to schedule service dispatches." },
      { title: "Automated Billing & Invoicing", description: "Use geofence arrival and departure timestamps to trigger customer billing automatically." },
      { title: "Enterprise BI Dashboards", description: "Export historical fuel and safety metrics to PowerBI or Tableau for executive analysis." }
    ],
    benefits: [
      { title: "Unify Back-Office Systems", description: "Sync live vehicle data with ERP and routing databases to eliminate manual entry." },
      { title: "Developer-First Infrastructure", description: "Access comprehensive API documentation, SDKs, and sandbox environments for fast setup." },
      { title: "Real-Time Ingestion", description: "Receive event webhooks within seconds of hardware detection for instant system triggers." },
      { title: "Customizable Data Streams", description: "Retrieve only the coordinates, events, or diagnostics your business applications require." }
    ],
    industries: ["Logistics", "Transportation", "Manufacturing", "Utilities", "Government"],
    productsUsed: [
      { slug: "apm-connect-enterprise", why: "Exposes REST APIs, webhooks, and raw telemetry data feeds for custom CRM and ERP integrations." }
    ]
  }
];

export const products: Product[] = [
  {
    slug: "2g-4g-data-logger",
    name: "2G/4G Data Logger",
    categories: ["industrial-iot"],
    image: "/images/solutions/data-logger-clean.png",
    shortDesc: "The 2G/4G Data Logger enables secure real-time data collection and remote monitoring by transmitting sensor and equipment data over cellular networks.",
    overview:
      "A rugged, intelligent cellular data logging device that collects operational data from analog, digital, and bus interfaces, stores it locally, and securely transmits it to the cloud for real-time monitoring and historical analysis.",
    features: [
      "Real-time data acquisition and storage",
      "2G/4G cellular connectivity with auto-sync",
      "Local data logging with flash backup",
      "Digital, analog, and communication interfaces",
      "Secure cloud communications (MQTT, HTTPS)"
    ],
    specifications: [
      { label: "Network", value: "GSM/GPRS (2G), LTE Cat-1/Cat-4 (4G)" },
      { label: "Positioning", value: "GPS/GLONASS (Optional)" },
      { label: "Interfaces", value: "RS232, RS485, CAN, Digital I/O, Analog Input" },
      { label: "Storage", value: "Internal Flash Memory / SD Card" },
      { label: "Communication", value: "MQTT, HTTP, HTTPS, TCP/IP" },
      { label: "Power Supply", value: "9–36V DC" },
      { label: "Operating Temp", value: "-20°C to +70°C" },
      { label: "Protection", value: "IP65/IP67 (Model Dependent)" }
    ],
    benefits: [
      "Continuous remote monitoring of isolated assets",
      "Reduced manual data collection and overhead",
      "Real-time alert notifications for critical events",
      "Reliable connectivity in remote locations via cellular networks"
    ],
    applications: [
      "Fleet telematics and vehicle tracking",
      "Cold chain temperature and log monitoring",
      "Fuel tank level and consumption audits",
      "Industrial equipment and generator telemetry"
    ],
    faq: [
      { q: "What happens if cellular connectivity is lost?", a: "The logger stores data locally in its internal flash memory or SD card and automatically synchronizes with the cloud when connection is restored." },
      { q: "Does the logger support industrial protocols?", a: "Yes, it has hardware support for RS232, RS485, and CAN bus interfaces for standard industrial machinery." }
    ],
    stats: [
      { value: "4G LTE", label: "High-speed telemetry link", iconName: "antenna" },
      { value: "9-36V", label: "Wide operational power", iconName: "shield" },
      { value: "SD Card", label: "Local storage with auto-sync", iconName: "medal" },
      { value: "IP67", label: "Weatherproof protection rating", iconName: "map" }
    ]
  },
  {
    slug: "rover-elite",
    name: "Rover Elite",
    categories: ["fleet-management"],
    image: "/images/verticals/frame-7114.png",
    shortDesc: "Compact GPS tracking device for real-time fleet visibility.",
    overview:
      "Rover Elite is a certified GPS tracker that shows you exactly where your vehicles are, in real time. It's installed and supported by APM's dealer network across India.",
    features: [
      "Real-time GPS + GLONASS positioning",
      "SOS panic button",
      "Ignition & ACC status detection",
      "Over-the-air firmware updates",
      "Tamper alert notifications"
    ],
    specifications: [
      { label: "Connectivity", value: "4G LTE / 2G fallback" },
      { label: "Positioning", value: "GPS + GLONASS" },
      { label: "Operating Voltage", value: "9–36V DC" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Certification", value: "AIS-140 compliant" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Reduce vehicle downtime with real-time alerts",
      "Improve driver accountability",
      "Simplify compliance reporting"
    ],
    applications: ["Commercial fleets", "Cab & taxi operators", "Last-mile delivery vehicles"],
    faq: [
      { q: "Does Rover Elite require a subscription?", a: "Yes, a data plan is required for continuous connectivity — ask your dealer for available plans." },
      { q: "Can it be self-installed?", a: "Installation is recommended through APM's certified dealer network for warranty coverage." }
    ],
    stats: [
      { value: "500k+", label: "Units deployed nationwide", iconName: "medal" },
      { value: "10", label: "Countries with active tracking", iconName: "antenna" },
      { value: "<10m", label: "Accuracy under open sky", iconName: "map" },
      { value: "1 Year", label: "Replacement warranty", iconName: "shield" }
    ]
  },
  {
    slug: "rover-elite-plus",
    name: "Rover Elite+",
    categories: ["fleet-management"],
    image: "/images/verticals/frame-7115.png",
    shortDesc: "Enhanced GPS tracker with extended sensor and reporting capabilities.",
    overview:
      "Rover Elite+ does everything Rover Elite does, plus extra sensors and driver-ID support for fleets that need more detail. It's backed by the same nationwide installation and service network.",
    features: [
      "All Rover Elite capabilities",
      "Additional digital I/O for auxiliary sensors",
      "Extended data logging (30-day buffer)",
      "Driver ID / RFID integration ready",
      "Enhanced geofencing rules"
    ],
    specifications: [
      { label: "Connectivity", value: "4G LTE / 2G fallback" },
      { label: "Positioning", value: "GPS + GLONASS" },
      { label: "Digital Inputs", value: "4 configurable" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Certification", value: "AIS-140 compliant" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Capture richer trip and driver data",
      "Extend tracking to auxiliary equipment",
      "Scale with fleet growth"
    ],
    applications: ["Enterprise fleets", "Fleet leasing companies", "Multi-vehicle logistics operators"],
    faq: [
      { q: "What's the difference vs. Rover Elite?", a: "Rover Elite+ adds extra digital inputs, longer data buffering, and RFID driver-ID support for more advanced fleets." },
      { q: "Is it compatible with the same mobile app?", a: "Yes, both devices connect to the same fleet monitoring platform." }
    ],
    stats: [
      { value: "250k+", label: "Active deployments", iconName: "medal" },
      { value: "4", label: "Configurable sensor inputs", iconName: "antenna" },
      { value: "30 Days", label: "On-device data buffering", iconName: "map" },
      { value: "RFID", label: "Driver ID support ready", iconName: "shield" }
    ]
  },
  {
    slug: "rover-asset",
    name: "Rover Asset",
    categories: ["asset-tracking"],
    image: "/images/verticals/frame-7114.png",
    shortDesc: "Battery-powered asset tracker for non-motorized and stationary equipment.",
    overview:
      "Rover Asset tracks trailers, containers, and equipment that have no power source of their own. It runs on battery for up to two years, so there's no wiring needed.",
    features: [
      "Long-life internal battery (up to 2 years standby)",
      "Motion-triggered reporting to save power",
      "Weatherproof enclosure",
      "Magnetic or bolt-on mounting",
      "Low-battery alerts"
    ],
    specifications: [
      { label: "Connectivity", value: "4G LTE / 2G fallback" },
      { label: "Battery", value: "Rechargeable Li-ion, up to 2 yrs standby" },
      { label: "Ingress Protection", value: "IP67" },
      { label: "Operating Temperature", value: "-20°C to 60°C" },
      { label: "Mounting", value: "Magnetic / bolted" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Track unpowered assets without wiring",
      "Reduce asset loss and theft",
      "Minimize maintenance with long battery life"
    ],
    applications: ["Trailers & containers", "Construction equipment", "Rental fleet assets"],
    faq: [
      { q: "Does it need a power connection?", a: "No, Rover Asset is fully battery-powered and requires no wiring." },
      { q: "How often does it report location?", a: "Reporting intervals are configurable to balance battery life and tracking frequency." }
    ],
    stats: [
      { value: "2 Years", label: "Standby battery life", iconName: "medal" },
      { value: "IP67", label: "Dust & water protection", iconName: "shield" },
      { value: "100%", label: "Wireless installation", iconName: "antenna" },
      { value: "0", label: "External wiring needed", iconName: "map" }
    ]
  },
  {
    slug: "prime-load",
    name: "Prime Load",
    categories: ["fleet-management"],
    image: "/images/verticals/frame-7120.png",
    shortDesc: "Real-time payload weight and load distribution monitoring system.",
    overview:
      "Prime Load shows drivers and fleet managers exactly how much weight a vehicle is carrying, in real time. It helps avoid overload fines and pairs with APM's tracking devices.",
    features: [
      "Real-time axle-load monitoring",
      "Overload alerts to driver and fleet manager",
      "Load distribution visualization",
      "Integration with fleet tracking platform",
      "Historical load trip reports"
    ],
    specifications: [
      { label: "Load Range", value: "Configurable per axle rating" },
      { label: "Connectivity", value: "Integrates with Rover Elite / Elite+" },
      { label: "Accuracy", value: "±2% of rated load" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Certification", value: "Legal Metrology compliant" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Avoid overload penalties and fines",
      "Extend vehicle and tire lifespan",
      "Improve load planning efficiency"
    ],
    applications: ["Heavy commercial trucks", "Logistics & freight operators", "Mining & construction haulage"],
    faq: [
      { q: "Can Prime Load work standalone?", a: "It's designed to integrate with APM's tracking devices for combined location + load reporting, but can also operate independently." },
      { q: "Is it certified for legal load compliance?", a: "Yes, it's built to Legal Metrology standards for accurate load measurement." }
    ],
    stats: [
      { value: "±2%", label: "Measurement accuracy", iconName: "medal" },
      { value: "28", label: "States with active deployments", iconName: "map" },
      { value: "10k+", label: "Trucks monitored daily", iconName: "antenna" },
      { value: "Legal Metr.", label: "Compliant calibration", iconName: "shield" }
    ]
  },
  {
    slug: "auto-fare-meter",
    name: "Auto Fare Meter",
    categories: ["public-transport-solutions"],
    image: "/images/verticalb2c/frame-7120.png",
    shortDesc: "Digital fare metering system for taxis and app-based cab fleets.",
    overview:
      "Auto Fare Meter calculates taxi and cab fares automatically from GPS distance, so passengers get an accurate, tamper-proof fare every time.",
    features: [
      "GPS-based distance calculation",
      "Tamper-proof sealed unit",
      "Printed receipt support",
      "Configurable tariff slabs",
      "Integration with Rover Elite tracking"
    ],
    specifications: [
      { label: "Display", value: "Digital LED fare display" },
      { label: "Connectivity", value: "GPS + 4G" },
      { label: "Printer", value: "Optional thermal printer" },
      { label: "Operating Temperature", value: "-10°C to 60°C" },
      { label: "Certification", value: "Legal Metrology approved" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Accurate, tamper-proof fare calculation",
      "Simplify regulatory approval for cab operators",
      "Improve passenger trust"
    ],
    applications: ["Taxi operators", "App-based cab fleets", "Airport & city transport services"],
    faq: [
      { q: "Is it approved for commercial use?", a: "Yes, Auto Fare Meter is built to meet Legal Metrology approval requirements for fare devices." },
      { q: "Can fares be updated remotely?", a: "Tariff slabs can be updated by authorized dealers as per regional fare regulations." }
    ],
    stats: [
      { value: "Legal Metr.", label: "Approved fare logic", iconName: "shield" },
      { value: "Tamper-Pr.", label: "Digital sealing system", iconName: "medal" },
      { value: "99.9%", label: "Distance calculation accuracy", iconName: "map" },
      { value: "Thermal", label: "Receipt printing support", iconName: "antenna" }
    ]
  },
  {
    slug: "vandal-proof-camera",
    name: "4G/WiFi Vandal Proof Camera",
    categories: ["video-surveillance"],
    image: "/images/verticalb2c/frame-7115.png",
    shortDesc: "Ruggedized 4G/WiFi camera built to withstand harsh vehicle environments.",
    overview:
      "This rugged camera keeps streaming and recording even when knocked around, with night vision built in. It's trusted on school and public transport buses.",
    features: [
      "Live 4G/WiFi video streaming",
      "Vandal-resistant metal housing",
      "Night vision (IR) recording",
      "Motion-triggered event capture",
      "Cloud & local SD storage"
    ],
    specifications: [
      { label: "Resolution", value: "1080p Full HD" },
      { label: "Connectivity", value: "4G LTE / WiFi" },
      { label: "Storage", value: "Up to 256GB SD + cloud" },
      { label: "Ingress Protection", value: "IP67" },
      { label: "Night Vision", value: "IR up to 15m" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: ["Deter vandalism and theft", "Provide evidence for incident review", "Enable remote live monitoring"],
    applications: ["School & public buses", "City transport fleets", "Cash-in-transit vehicles"],
    faq: [
      { q: "Can footage be viewed live?", a: "Yes, live streaming is available over 4G or WiFi through the companion app." },
      { q: "How long is footage retained?", a: "Retention depends on SD card capacity and cloud storage plan selected." }
    ],
    stats: [
      { value: "IP67", label: "Weatherproof metal housing", iconName: "shield" },
      { value: "15m", label: "Infrared night vision range", iconName: "map" },
      { value: "256GB", label: "Local SD storage support", iconName: "antenna" },
      { value: "Live", label: "Remote video monitoring", iconName: "medal" }
    ]
  },
  {
    slug: "reverse-parking-system",
    name: "Reverse Parking System",
    categories: ["vehicle-safety"],
    image: "/images/verticalb2c/frame-7117.png",
    shortDesc: "Ultrasonic reverse parking assistance with audible and visual alerts.",
    overview:
      "This system uses sensors to warn drivers when something is close behind the vehicle, cutting down on reversing accidents for buses and trucks.",
    features: [
      "Multi-sensor ultrasonic detection",
      "Audible proximity alerts",
      "In-cabin display indicator",
      "Optional reverse camera integration",
      "Weatherproof sensor housing"
    ],
    specifications: [
      { label: "Detection Range", value: "0.3m – 2.5m" },
      { label: "Sensors", value: "4-sensor array (configurable)" },
      { label: "Display", value: "LED distance indicator" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Ingress Protection", value: "IP66" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Reduce reversing collisions",
      "Improve driver confidence in blind spots",
      "Low-cost retrofit for existing fleets"
    ],
    applications: ["Buses & coaches", "Heavy trucks", "Construction vehicles"],
    faq: [
      { q: "Can it be retrofitted to older vehicles?", a: "Yes, it's designed as an aftermarket retrofit for most commercial vehicle types." },
      { q: "Does it work with a reverse camera?", a: "Yes, it can be paired with an optional reverse camera for combined visual and audible assistance." }
    ],
    stats: [
      { value: "4 Point", label: "Ultrasonic sensor system", iconName: "antenna" },
      { value: "2.5m", label: "Max detection distance", iconName: "map" },
      { value: "Audible", label: "Proximity cabin alerts", iconName: "medal" },
      { value: "IP66", label: "Weatherproof sensor heads", iconName: "shield" }
    ]
  },
  {
    slug: "speed-limiting-device",
    name: "Speed Limiting Devices",
    categories: ["vehicle-safety"],
    image: "/images/verticalb2c/frame-7113.png",
    shortDesc: "AIS-140 compliant mechanical speed governor for commercial vehicles.",
    overview:
      "Speed Limiting Devices stop commercial vehicles from going over the legal speed limit. They're tamper-proof and certified by ARAI and ICAT.",
    features: [
      "Tamper-proof mechanical sealing",
      "Configurable speed limit per vehicle class",
      "Real-time speed logging",
      "Nationwide dealer calibration",
      "Fuel-injection & mechanical engine compatibility"
    ],
    specifications: [
      { label: "Speed Range", value: "Configurable per RTO mandate" },
      { label: "Sealing", value: "Tamper-evident mechanical seal" },
      { label: "Compatibility", value: "Diesel & CNG engines" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Certification", value: "ARAI & ICAT certified" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Meet mandatory speed governance regulations",
      "Reduce high-speed accident risk",
      "Simplify RTO compliance checks"
    ],
    applications: ["Commercial trucks", "School & public buses", "State transport corporations"],
    faq: [
      { q: "Is installation mandatory for all commercial vehicles?", a: "Speed limiting devices are mandated for most commercial vehicle categories under government transport regulations — check with your RTO for specifics." },
      { q: "Can the speed limit be changed later?", a: "Yes, recalibration is available through APM's certified dealer network." }
    ],
    stats: [
      { value: "80km/h", label: "Standard commercial limit", iconName: "map" },
      { value: "ARAI/ICAT", label: "Government certified", iconName: "shield" },
      { value: "1.5M+", label: "Units installed nationwide", iconName: "medal" },
      { value: "Tamper-Pr.", label: "Mechanical wire seal", iconName: "antenna" }
    ]
  },
  {
    slug: "auto-dipper-sensor",
    name: "Auto Dipper Sensor",
    categories: ["vehicle-safety"],
    image: "/images/verticals/frame-7116.png",
    shortDesc: "Automatic headlight dipping sensor to reduce glare for oncoming traffic.",
    overview:
      "Auto Dipper Sensor automatically switches headlights between high and low beam, cutting down on the glare that causes night-time accidents.",
    features: [
      "Automatic high/low beam switching",
      "Ambient light-adaptive sensitivity",
      "Manual override switch",
      "Compact dashboard-mount sensor",
      "Compatible with most headlight systems"
    ],
    specifications: [
      { label: "Detection Range", value: "Up to 150m" },
      { label: "Response Time", value: "<0.5 seconds" },
      { label: "Operating Voltage", value: "12V / 24V DC" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Mounting", value: "Dashboard / windshield mount" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: ["Reduce night-time glare accidents", "Lower driver fatigue on long hauls", "Simple aftermarket installation"],
    applications: ["Long-haul trucks", "Highway buses", "Private and commercial cars"],
    faq: [
      { q: "Does it work in all lighting conditions?", a: "The sensor is calibrated for typical night-driving conditions and adjusts sensitivity automatically." },
      { q: "Can I override the automatic mode?", a: "Yes, a manual override switch is included for driver control." }
    ],
    stats: [
      { value: "100k+", label: "Accidents prevented at night", iconName: "medal" },
      { value: "150m", label: "Glaring vehicle detection", iconName: "map" },
      { value: "<0.5s", label: "Auto beam response time", iconName: "antenna" },
      { value: "12/24V", label: "Dual vehicle compatibility", iconName: "shield" }
    ]
  },
  {
    slug: "vehicle-conspicuity-tape",
    name: "Vehicle Conspicuity Tape",
    categories: ["vehicle-safety"],
    image: "/images/verticalb2c/frame-7116.png",
    shortDesc: "High-visibility reflective tape improving vehicle detection at night.",
    overview:
      "This reflective tape makes vehicles easier to see at night and lasts up to 7 years outdoors — a simple, low-cost way to improve safety.",
    features: [
      "High-intensity retro-reflective material",
      "Weather & UV resistant adhesive",
      "Available in standard hazard patterns",
      "Easy peel-and-stick application",
      "Long service life outdoors"
    ],
    specifications: [
      { label: "Reflectivity", value: "Class 1 retro-reflective" },
      { label: "Width", value: "50mm / 100mm options" },
      { label: "Adhesive", value: "Weatherproof acrylic" },
      { label: "Service Life", value: "Up to 7 years outdoor" },
      { label: "Certification", value: "Vehicle conspicuity standards compliant" },
      { label: "Warranty", value: "Material warranty on request" }
    ],
    benefits: [
      "Improve night-time vehicle visibility",
      "Reduce rear-end and side collisions",
      "Low-cost, long-lasting safety upgrade"
    ],
    applications: ["Trucks & trailers", "Buses", "Construction & municipal vehicles"],
    faq: [
      { q: "How long does the tape last outdoors?", a: "Properly applied conspicuity tape typically lasts up to 7 years under normal outdoor conditions." },
      { q: "Is professional installation required?", a: "Installation is straightforward, though dealer application is recommended for correct hazard-pattern placement." }
    ],
    stats: [
      { value: "Class 1", label: "Highest reflective rating", iconName: "shield" },
      { value: "7 Years", label: "Outdoor weather durability", iconName: "medal" },
      { value: "50mm", label: "Standard regulatory width", iconName: "map" },
      { value: "90%", label: "Visibility increase at night", iconName: "antenna" }
    ]
  },
  {
    slug: "traffic-cone",
    name: "Traffic Cone",
    categories: ["road-safety-solutions"],
    image: "/images/verticalb2g/frame-7113.png",
    shortDesc: "Durable high-visibility traffic cone for road safety and worksite marking.",
    overview:
      "A durable, high-visibility traffic cone built for repeated use on roads and worksites, with a weighted base that resists wind.",
    features: [
      "High-visibility fluorescent orange body",
      "Reflective collar bands",
      "Weighted, wind-resistant base",
      "Stackable for easy storage",
      "UV-stabilized PVC construction"
    ],
    specifications: [
      { label: "Height", value: "450mm / 750mm options" },
      { label: "Material", value: "UV-stabilized PVC" },
      { label: "Reflective", value: "Class 1 reflective collars" },
      { label: "Base Weight", value: "Configurable" },
      { label: "Stackable", value: "Yes" },
      { label: "Warranty", value: "Standard product warranty" }
    ],
    benefits: ["Improve worksite and road hazard visibility", "Durable for repeated outdoor use", "Cost-effective traffic management"],
    applications: ["Road construction sites", "Traffic diversion & lane closure", "Event and parking management"],
    faq: [
      { q: "Are these cones suitable for highway use?", a: "Yes, they meet reflectivity standards suitable for highway and road-safety applications." },
      { q: "Can they be customized with branding?", a: "Custom branding and sizing options are available on bulk orders." }
    ],
    stats: [
      { value: "750mm", label: "Standard highway height", iconName: "map" },
      { value: "Class 1", label: "Reflective collar grade", iconName: "shield" },
      { value: "UV-PVC", label: "Weatherproof material", iconName: "medal" },
      { value: "Stackable", label: "Efficient transportation", iconName: "antenna" }
    ]
  },
  {
    slug: "safety-jacket",
    name: "Safety Jacket",
    categories: ["workplace-safety"],
    image: "/images/verticalb2g/frame-7114.png",
    shortDesc: "High-visibility safety jacket for road and worksite personnel.",
    overview:
      "A high-visibility jacket that keeps road and worksite workers easy to spot, comfortable enough for long shifts.",
    features: [
      "High-visibility fluorescent fabric",
      "Reflective striping (front & back)",
      "Breathable, lightweight material",
      "Adjustable fit",
      "Machine washable"
    ],
    specifications: [
      { label: "Material", value: "Polyester mesh" },
      { label: "Reflective", value: "Class 2 reflective tape" },
      { label: "Sizes", value: "S – XXL" },
      { label: "Closure", value: "Velcro / zipper options" },
      { label: "Certification", value: "Road safety visibility standards" },
      { label: "Warranty", value: "Standard product warranty" }
    ],
    benefits: ["Improve worker visibility and safety", "Comfortable for extended wear", "Compliant with road safety visibility norms"],
    applications: ["Traffic police & wardens", "Road construction crews", "Toll plaza & parking staff"],
    faq: [
      { q: "What sizes are available?", a: "Safety jackets are available from S to XXL, with bulk sizing options for institutional orders." },
      { q: "Is the reflective tape washable?", a: "Yes, the reflective striping is designed to withstand regular washing without degrading." }
    ],
    stats: [
      { value: "Class 2", label: "Reflective tape standard", iconName: "shield" },
      { value: "100%", label: "Breathable polyester mesh", iconName: "medal" },
      { value: "S-XXL", label: "Sizing configurations", iconName: "map" },
      { value: "360°", label: "Hazard visibility design", iconName: "antenna" }
    ]
  },
  {
    slug: "construction-worker-jacket",
    name: "Construction Worker Jacket",
    categories: ["workplace-safety"],
    image: "/images/verticalb2g/frame-7115.png",
    shortDesc: "Heavy-duty high-visibility jacket built for construction site conditions.",
    overview:
      "A tougher version of our Safety Jacket, built with heavy-duty fabric for construction sites and highway maintenance crews.",
    features: [
      "Heavy-duty weather-resistant fabric",
      "Reinforced stitching for durability",
      "Reflective striping (360° visibility)",
      "Multiple utility pockets",
      "Available in insulated variants"
    ],
    specifications: [
      { label: "Material", value: "Ripstop polyester" },
      { label: "Reflective", value: "Class 3 reflective tape" },
      { label: "Sizes", value: "S – XXL" },
      { label: "Weather Resistance", value: "Water & wind resistant" },
      { label: "Certification", value: "Road safety visibility standards" },
      { label: "Warranty", value: "Standard product warranty" }
    ],
    benefits: ["Withstand demanding site conditions", "Maximize worker visibility on-site", "Durable for daily heavy use"],
    applications: ["Construction sites", "Highway maintenance crews", "Utility & infrastructure work"],
    faq: [
      { q: "Is it suitable for cold weather?", a: "Insulated variants are available for cold-weather site conditions." },
      { q: "How is it different from the standard Safety Jacket?", a: "This variant uses heavier-duty fabric and reinforced stitching built for construction site wear and tear." }
    ],
    stats: [
      { value: "Class 3", label: "Max visibility compliance", iconName: "shield" },
      { value: "Ripstop", label: "Heavy-duty durable fabric", iconName: "medal" },
      { value: "4", label: "Reinforced utility pockets", iconName: "map" },
      { value: "Waterpr.", label: "Coating for wet weather", iconName: "antenna" }
    ]
  },
  {
    slug: "permanent-signs",
    name: "Permanent Signs",
    categories: ["road-safety-solutions"],
    image: "/images/verticalb2g/frame-7116.png",
    shortDesc: "Reflective permanent road signage for long-term traffic management.",
    overview:
      "Reflective road signs built to last over 10 years outdoors, meeting national standards for highways and government projects.",
    features: [
      "High-intensity reflective sheeting",
      "Corrosion-resistant aluminum substrate",
      "Standard & custom sign formats",
      "UV and weather resistant",
      "Long outdoor service life"
    ],
    specifications: [
      { label: "Substrate", value: "Aluminum composite" },
      { label: "Reflective", value: "Engineer / High-Intensity grade" },
      { label: "Sizes", value: "Standard RTO formats" },
      { label: "Service Life", value: "10+ years outdoor" },
      { label: "Certification", value: "Road signage standards compliant" },
      { label: "Warranty", value: "Material warranty on request" }
    ],
    benefits: [
      "Long-lasting outdoor durability",
      "Improve driver visibility of warnings and directions",
      "Standards-compliant for government projects"
    ],
    applications: ["Highways & state roads", "Municipal traffic management", "Government infrastructure projects"],
    faq: [
      { q: "Can signs be customized for specific projects?", a: "Yes, custom sizes, messaging, and mounting formats are available for institutional and government orders." },
      { q: "What reflective grade is used?", a: "Engineer and High-Intensity grade reflective sheeting is available depending on application requirements." }
    ],
    stats: [
      { value: "10+ Yrs", label: "Reflectivity life outdoors", iconName: "medal" },
      { value: "Aluminum", label: "Composite substrate base", iconName: "shield" },
      { value: "RTO Std", label: "Regulatory compliant shapes", iconName: "map" },
      { value: "High-Int.", label: "Engineer grade sheeting", iconName: "antenna" }
    ]
  },
  {
    slug: "temporary-work-signs",
    name: "Temporary Work Signs",
    categories: ["road-safety-solutions"],
    image: "/images/verticalb2g/rectangle-111.png",
    shortDesc: "Portable reflective signage for temporary work zones and diversions.",
    overview:
      "Lightweight, foldable road signs that can be set up quickly at temporary work zones and taken down just as fast.",
    features: [
      "Lightweight portable frame",
      "High-visibility reflective face",
      "Quick-deploy folding stand",
      "Weather-resistant construction",
      "Stackable for transport & storage"
    ],
    specifications: [
      { label: "Material", value: "Corrugated plastic / aluminum" },
      { label: "Reflective", value: "Class 1 reflective sheeting" },
      { label: "Frame", value: "Folding A-frame stand" },
      { label: "Sizes", value: "Standard work-zone formats" },
      { label: "Portability", value: "Lightweight, stackable" },
      { label: "Warranty", value: "Standard product warranty" }
    ],
    benefits: ["Rapid deployment for temporary work zones", "Improve worksite safety compliance", "Easy transport and storage"],
    applications: ["Road maintenance crews", "Utility work zones", "Event and construction diversions"],
    faq: [
      { q: "How quickly can these signs be deployed?", a: "The folding A-frame design allows for rapid setup and takedown at temporary work sites." },
      { q: "Are they weatherproof?", a: "Yes, they're built to withstand outdoor exposure during typical work-zone durations." }
    ],
    stats: [
      { value: "A-Frame", label: "Portable folding stand design", iconName: "shield" },
      { value: "Class 1", label: "Reflective sheeting face", iconName: "medal" },
      { value: "10s", label: "Rapid setup and deploy", iconName: "antenna" },
      { value: "Stackable", label: "Compact transport storage", iconName: "map" }
    ]
  },
  {
    slug: "delineator",
    name: "Delineator",
    categories: ["road-safety-solutions"],
    image: "/images/verticalb2g/frame-7117.png",
    shortDesc: "Flexible reflective delineator post for lane and hazard marking.",
    overview:
      "A flexible roadside post that bends when a vehicle hits it and springs back upright, keeping lanes and medians clearly marked.",
    features: [
      "Flexible spring-back design",
      "High-intensity reflective sheeting",
      "Impact-resistant polymer construction",
      "Multiple base mounting options",
      "UV-stabilized for long outdoor life"
    ],
    specifications: [
      { label: "Height", value: "750mm / 1000mm options" },
      { label: "Material", value: "Flexible polyurethane" },
      { label: "Reflective", value: "Class 1 reflective sheeting" },
      { label: "Mounting", value: "Bolt-down / surface-mount base" },
      { label: "Impact Recovery", value: "Spring-back to vertical" },
      { label: "Warranty", value: "Standard product warranty" }
    ],
    benefits: ["Withstand vehicle impact without breaking", "Improve lane and median visibility", "Low-maintenance long-term marking"],
    applications: ["Highway medians", "Lane diversions", "Toll plaza & parking lot marking"],
    faq: [
      { q: "Does it survive being hit by a vehicle?", a: "Yes, the flexible design allows it to bend on impact and spring back upright." },
      { q: "What mounting options are available?", a: "Both bolt-down and surface-mount base options are available depending on the road surface." }
    ],
    stats: [
      { value: "750mm", label: "Impact recovery post height", iconName: "map" },
      { value: "100%", label: "Polyurethane flex recovery", iconName: "medal" },
      { value: "Class 1", label: "Reflective band visibility", iconName: "shield" },
      { value: "Bolt-Dn", label: "Secure asphalt base anchor", iconName: "antenna" }
    ]
  },
  {
    slug: "iot-m2m-esim",
    name: "IoT M2M – E-SIM",
    categories: ["electric-mobility"],
    image: "/images/verticals/frame-7117.png",
    shortDesc: "Embedded M2M SIM connectivity purpose-built for IoT tracking devices.",
    overview:
      "An embedded SIM built into tracking devices, so there's no physical SIM card to lose, swap, or tamper with — it just stays connected.",
    features: [
      "Embedded eSIM form factor",
      "Multi-network roaming for coverage reliability",
      "Pre-provisioned for plug-and-play activation",
      "Data usage monitoring dashboard",
      "Bulk fleet provisioning support"
    ],
    specifications: [
      { label: "Form", value: "Embedded eSIM" },
      { label: "Network", value: "Multi-carrier roaming" },
      { label: "Provisioning", value: "Pre-activated / remote provisioning" },
      { label: "Operating Temperature", value: "-40°C to 85°C" },
      { label: "Certification", value: "M2M Certified" },
      { label: "Warranty", value: "Service-plan dependent" }
    ],
    benefits: [
      "Eliminate physical SIM swapping and loss",
      "Ensure consistent connectivity across regions",
      "Simplify fleet-wide device provisioning"
    ],
    applications: ["GPS tracking devices", "Industrial IoT sensors", "Connected vehicle platforms"],
    faq: [
      { q: "Can it roam across multiple carriers?", a: "Yes, the eSIM supports multi-network roaming to maintain connectivity in low-coverage areas." },
      { q: "How is it provisioned for a large fleet?", a: "APM supports bulk provisioning and activation for enterprise and fleet deployments." }
    ],
    stats: [
      { value: "Multi-Net", label: "Roaming carrier support", iconName: "antenna" },
      { value: "99.8%", label: "Connected link reliability", iconName: "medal" },
      { value: "Tamper-Pr.", label: "eSIM solder form factor", iconName: "shield" },
      { value: "100%", label: "OTA remote provisioning", iconName: "map" }
    ]
  },
  {
    slug: "dc-to-dc-converter",
    name: "DC to DC Converter",
    categories: ["electric-mobility"],
    image: "/images/verticals/frame-7119.png",
    shortDesc: "Automotive-grade power converter for stable device power delivery.",
    overview:
      "This converter keeps onboard electronics powered safely, protecting them from voltage spikes with up to 92% efficiency.",
    features: [
      "Wide input voltage range",
      "Overvoltage & short-circuit protection",
      "Compact automotive-grade housing",
      "High conversion efficiency",
      "Multiple output voltage options"
    ],
    specifications: [
      { label: "Input Voltage", value: "9–36V DC" },
      { label: "Output Voltage", value: "5V / 12V configurable" },
      { label: "Efficiency", value: "Up to 92%" },
      { label: "Operating Temperature", value: "-40°C to 85°C" },
      { label: "Protection", value: "Overvoltage, short-circuit, reverse polarity" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: ["Protect connected electronics from power spikes", "Ensure stable device operation", "Compact, easy integration"],
    applications: ["Fleet telematics devices", "In-vehicle cameras & displays", "EV auxiliary systems"],
    faq: [
      { q: "What output voltages are available?", a: "Standard 5V and 12V outputs are available, with custom configurations on request." },
      { q: "Is it suitable for EV applications?", a: "Yes, it's designed to handle the wider voltage ranges common in electric vehicle systems." }
    ],
    stats: [
      { value: "92%", label: "Power transfer efficiency", iconName: "medal" },
      { value: "IP67", label: "Dust & water protection", iconName: "shield" },
      { value: "9-36V", label: "Wide DC input range", iconName: "map" },
      { value: "100%", label: "Spike & short protection", iconName: "antenna" }
    ]
  },
  {
    slug: "bms-card",
    name: "BMS Card",
    categories: ["electric-mobility"],
    image: "/images/verticals/frame-7121.png",
    shortDesc: "Battery management system card for EV and electronics battery packs.",
    overview:
      "The BMS Card watches over EV battery packs, stopping overcharging and overheating so the battery lasts longer.",
    features: [
      "Cell voltage & temperature monitoring",
      "Active charge balancing",
      "Overcharge & over-discharge protection",
      "CAN bus communication",
      "Configurable for multiple pack sizes"
    ],
    specifications: [
      { label: "Cell Count", value: "Configurable (up to 16S)" },
      { label: "Communication", value: "CAN bus" },
      { label: "Protection", value: "Overcharge, over-discharge, thermal" },
      { label: "Operating Temperature", value: "-20°C to 60°C" },
      { label: "Certification", value: "IEC 62443 aligned design" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: ["Extend battery pack lifespan", "Prevent unsafe charge/discharge conditions", "Enable real-time battery diagnostics"],
    applications: ["Electric two/three-wheelers", "EV battery packs", "Stationary battery storage systems"],
    faq: [
      { q: "How many cells can it manage?", a: "The BMS Card supports configurable cell counts up to 16S, depending on pack design." },
      { q: "Does it communicate with vehicle systems?", a: "Yes, it communicates via CAN bus for integration with vehicle control systems." }
    ],
    stats: [
      { value: "16S", label: "Battery pack cell support", iconName: "antenna" },
      { value: "CAN Bus", label: "Vehicle telemetry links", iconName: "map" },
      { value: "IEC 62443", label: "Aligned security design", iconName: "shield" },
      { value: "99.5%", label: "Charge balance accuracy", iconName: "medal" }
    ]
  },
  {
    slug: "pollution-machine",
    name: "Pollution Machine",
    categories: ["vehicle-compliance"],
    image: "/images/verticals/frame-7118.png",
    shortDesc: "Certified Pollution Under Control (PUC) testing machine for vehicle emissions.",
    overview:
      "An approved machine that tests vehicle emissions and prints the PUC certificate on the spot, for petrol, diesel, and CNG vehicles.",
    features: [
      "Automated emissions testing cycle",
      "Direct PUC certificate printing",
      "Government database connectivity",
      "Calibration self-check",
      "Support for petrol, diesel & CNG vehicles"
    ],
    specifications: [
      { label: "Test Types", value: "Petrol / Diesel / CNG" },
      { label: "Connectivity", value: "Government PUC database link" },
      { label: "Printer", value: "Integrated certificate printer" },
      { label: "Calibration", value: "Automated self-check" },
      { label: "Certification", value: "Legal Metrology & pollution control board approved" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Ensure accurate, compliant emissions testing",
      "Streamline PUC center operations",
      "Direct integration with regulatory databases"
    ],
    applications: ["PUC testing centers", "Fleet compliance checks", "Automated testing stations"],
    faq: [
      { q: "Is it approved by pollution control authorities?", a: "Yes, the machine is built to meet Legal Metrology and pollution control board approval standards." },
      { q: "Can it test CNG vehicles?", a: "Yes, it supports petrol, diesel, and CNG emissions testing cycles." }
    ],
    stats: [
      { value: "5k+", label: "Centers active nationwide", iconName: "medal" },
      { value: "3 Fuel", label: "Petrol, Diesel & CNG cycles", iconName: "antenna" },
      { value: "100%", label: "VAHAN database integrated", iconName: "map" },
      { value: "Legal Metr.", label: "Compliant calibration", iconName: "shield" }
    ]
  },
  {
    slug: "automated-testing-lane",
    name: "Automated Testing Lane",
    categories: ["automated-testing-solutions"],
    image: "/images/verticalb2g/frame-7119.png",
    shortDesc: "Automated multi-point vehicle fitness testing lane infrastructure.",
    overview:
      "A fully automated lane that checks a vehicle's brakes, lights, and emissions without human bias, built to government testing standards.",
    features: [
      "Sequential automated test stations",
      "Brake, headlight & emissions testing",
      "Digital test result reporting",
      "Government ATS database integration",
      "Minimal manual intervention required"
    ],
    specifications: [
      { label: "Test Modules", value: "Brake, suspension, headlight, emissions, speedometer" },
      { label: "Throughput", value: "Configurable per lane design" },
      { label: "Reporting", value: "Digital, database-linked" },
      { label: "Certification", value: "Automated Testing Station (ATS) compliant" },
      { label: "Installation", value: "Turnkey civil + equipment" },
      { label: "Warranty", value: "Project-based terms" }
    ],
    benefits: ["Remove manual inspection bias", "Meet government ATS mandates", "Increase testing throughput and accuracy"],
    applications: ["State transport department testing stations", "Private vehicle fitness centers", "Fleet compliance testing facilities"],
    faq: [
      { q: "What standards does the lane comply with?", a: "The lane is designed to meet Automated Testing Station (ATS) norms mandated for vehicle fitness certification." },
      { q: "Is this a turnkey installation?", a: "Yes, APM provides end-to-end design, equipment, and installation for testing lane projects." }
    ],
    stats: [
      { value: "5", label: "Multi-point testing modules", iconName: "antenna" },
      { value: "ATS", label: "Government compliant norms", iconName: "shield" },
      { value: "100%", label: "Digital bias-free scoring", iconName: "medal" },
      { value: "Turnkey", label: "Civil and mechanical fitment", iconName: "map" }
    ]
  },
  {
    slug: "automated-test-driving-track",
    name: "Automated Test Driving Track",
    categories: ["automated-testing-solutions"],
    image: "/images/verticalb2g/frame-7120.png",
    shortDesc: "Sensor-instrumented track infrastructure for automated driving license testing.",
    overview:
      "A sensor-equipped track that scores driving test candidates automatically and fairly, used by RTOs across India.",
    features: [
      "Sensor-based maneuver detection",
      "Automated pass/fail scoring",
      "Camera-based violation recording",
      "Integration with licensing databases",
      "Multi-scenario test track design"
    ],
    specifications: [
      { label: "Track Modules", value: "Reverse, parallel park, gradient, S-curve" },
      { label: "Sensing", value: "Inductive loops + camera vision" },
      { label: "Reporting", value: "Automated digital scorecards" },
      { label: "Certification", value: "Automated Driving Test Track standards" },
      { label: "Installation", value: "Turnkey civil + equipment" },
      { label: "Warranty", value: "Project-based terms" }
    ],
    benefits: ["Remove bias from license testing", "Standardize driving test evaluation nationwide", "Integrate directly with RTO licensing systems"],
    applications: ["RTO driving test centers", "State transport authorities", "Driving school certification tracks"],
    faq: [
      { q: "How is scoring automated?", a: "Sensors and cameras track vehicle position and maneuvers, generating an objective pass/fail scorecard automatically." },
      { q: "Can it integrate with RTO licensing systems?", a: "Yes, results can be integrated directly with government licensing databases." }
    ],
    stats: [
      { value: "Sensor-B.", label: "Loop & track sensors", iconName: "antenna" },
      { value: "Camera-V.", label: "Line violation monitoring", iconName: "medal" },
      { value: "100%", label: "Bias-free RTO scoring", iconName: "shield" },
      { value: "SARATHI", label: "RTO software integrated", iconName: "map" }
    ]
  },
  {
    slug: "ais-140-gps",
    name: "AIS 140 GPS",
    categories: ["public-transport-solutions"],
    image: "/images/verticals/frame-7113.png",
    shortDesc: "Government-mandated AIS-140 compliant GPS tracking device.",
    overview:
      "A government-mandated GPS tracker for buses, taxis, and school vehicles, reporting location straight to official tracking systems.",
    features: [
      "AIS-140 certified hardware & firmware",
      "SOS panic button",
      "Government VLTD database integration",
      "Tamper-proof installation",
      "Real-time location reporting"
    ],
    specifications: [
      { label: "Connectivity", value: "4G LTE / 2G fallback" },
      { label: "Positioning", value: "GPS + GLONASS" },
      { label: "Certification", value: "AIS-140 certified" },
      { label: "Operating Temperature", value: "-20°C to 70°C" },
      { label: "Database", value: "VLTD-compliant reporting" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: ["Meet mandatory public vehicle tracking regulations", "Simplify RTO compliance audits", "Enable passenger safety monitoring"],
    applications: ["Public transport buses", "School buses", "Commercial passenger vehicles"],
    faq: [
      { q: "Is AIS-140 mandatory for all vehicles?", a: "AIS-140 is mandated for public service vehicles including buses, taxis, and school transport in most Indian states." },
      { q: "Does it connect to government tracking databases?", a: "Yes, it's built to report directly to VLTD-compliant government tracking systems." }
    ],
    stats: [
      { value: "AIS-140", label: "Certified tracking standard", iconName: "shield" },
      { value: "1.2M+", label: "Installations across India", iconName: "medal" },
      { value: "VLTD", label: "Direct database reporting", iconName: "map" },
      { value: "99.9%", label: "Location server uptime", iconName: "antenna" }
    ]
  },
  {
    slug: "high-security-registration-plate",
    name: "High Security Registration Plate",
    categories: ["vehicle-compliance"],
    image: "/images/verticals/frame-7122.png",
    shortDesc: "Tamper-proof HSRP number plates compliant with government mandates.",
    overview:
      "A tamper-proof number plate with a laser-etched code and hologram, required by law for vehicle registration.",
    features: [
      "Laser-branded permanent identification number",
      "Chromium-based hologram sticker",
      "Non-reusable snap locks",
      "Retro-reflective sheeting",
      "Vehicle-specific unique coding"
    ],
    specifications: [
      { label: "Material", value: "Aluminum with reflective sheeting" },
      { label: "Locking", value: "Non-removable snap locks" },
      { label: "Identification", value: "Laser-etched unique code" },
      { label: "Hologram", value: "Chromium-based, tamper-evident" },
      { label: "Certification", value: "Government HSRP specification compliant" },
      { label: "Warranty", value: "Manufacturing defect warranty" }
    ],
    benefits: [
      "Prevent registration plate tampering and forgery",
      "Meet mandatory government registration requirements",
      "Improve vehicle identification for law enforcement"
    ],
    applications: ["New vehicle registration", "Registration plate replacement", "State transport department programs"],
    faq: [
      { q: "Is HSRP mandatory for all vehicles?", a: "Yes, High Security Registration Plates are mandated by the central government for all new and many existing vehicles." },
      { q: "Can a plate be reused after removal?", a: "No, HSRP snap locks are designed to be non-reusable, ensuring plates cannot be tampered with or reinstalled." }
    ],
    stats: [
      { value: "#1 Player", label: "HSRP manufacturing in India", iconName: "medal" },
      { value: "16Cr+", label: "Fitments completed nationwide", iconName: "antenna" },
      { value: "26", label: "States covered with setup", iconName: "map" },
      { value: "28k+", label: "Dealership fitment network", iconName: "shield" }
    ]
  },
  {
    slug: "printing-solution",
    name: "Printing Solution",
    categories: ["printing-identification"],
    image: "/images/verticalb2g/frame-7118.png",
    shortDesc: "Secure printing systems for registration, licensing, and compliance documents.",
    overview:
      "Secure printing systems for registration certificates, licenses, and other official documents, built to prevent forgery.",
    features: [
      "Secure, tamper-evident print formats",
      "High-throughput batch printing",
      "Government database integration",
      "Card & document format support",
      "Audit trail and print logging"
    ],
    specifications: [
      { label: "Print Types", value: "Cards, certificates, compliance documents" },
      { label: "Throughput", value: "Configurable per installation" },
      { label: "Security", value: "Tamper-evident print features" },
      { label: "Integration", value: "Government database connectivity" },
      { label: "Deployment", value: "Centralized or distributed" },
      { label: "Warranty", value: "Project-based terms" }
    ],
    benefits: [
      "Ensure secure, verifiable document issuance",
      "Support large-scale government printing programs",
      "Reduce fraud through tamper-evident formats"
    ],
    applications: ["Vehicle registration certificate printing", "Driving license issuance", "Compliance certificate programs"],
    faq: [
      { q: "What types of documents can be printed?", a: "The system supports registration certificates, license cards, and various compliance documents in secure formats." },
      { q: "Is it suitable for large-scale government deployments?", a: "Yes, it's designed for high-throughput institutional and government printing programs." }
    ],
    stats: [
      { value: "99.9%", label: "Anti-forgery authentication", iconName: "shield" },
      { value: "Card/Doc", label: "Secure multi-format printing", iconName: "map" },
      { value: "Audit-Tr.", label: "Print transaction logging", iconName: "medal" },
      { value: "10k+/hr", label: "Industrial speed capability", iconName: "antenna" }
    ]
  },
  {
    slug: "rover-view",
    name: "Rover View",
    categories: ["video-surveillance"],
    image: "/images/verticals/frame-7123.png",
    shortDesc: "AI-powered vision analytics platform for fleet and driver insight.",
    overview:
      "Rover View turns camera footage into useful insight, flagging risky driving and safety incidents in real time so fleet managers can act faster.",
    features: [
      "AI-based driver behavior scoring",
      "Real-time incident detection & alerts",
      "Fleet-wide safety analytics dashboard",
      "Video event tagging & retrieval",
      "Integration with Rover camera hardware"
    ],
    specifications: [
      { label: "Processing", value: "Edge AI + cloud analytics" },
      { label: "Integration", value: "Rover AI Dash Cam, Mobile DVR" },
      { label: "Dashboard", value: "Web & mobile fleet dashboard" },
      { label: "Alerts", value: "Real-time push notifications" },
      { label: "Certification", value: "ISO 27001-aligned data handling" },
      { label: "Warranty", value: "Platform service terms" }
    ],
    benefits: ["Identify risky driving behavior proactively", "Reduce incident response time", "Turn raw video data into actionable insight"],
    applications: ["Fleet safety programs", "Driver coaching & training", "Insurance risk assessment"],
    faq: [
      { q: "What hardware does Rover View work with?", a: "Rover View is designed to integrate with APM's Rover AI Dash Cam and Mobile DVR camera systems." },
      { q: "Is data processed in the cloud or on-device?", a: "Rover View uses a combination of edge AI processing and cloud analytics for real-time and historical insight." }
    ],
    stats: [
      { value: "1080p", label: "Full HD live streaming", iconName: "antenna" },
      { value: "AI Driver", label: "Fatigue & distraction check", iconName: "medal" },
      { value: "ISO 27001", label: "Secure data standards", iconName: "shield" },
      { value: "4G/WiFi", label: "Hybrid fleet upload", iconName: "map" }
    ]
  },
  {
    slug: "industrial-label-printer",
    name: "Industrial Label Printer",
    categories: ["industrial-label-printing"],
    image: "/images/verticalb2g/frame-7118.png",
    shortDesc: "High-speed label printing system for durable, serialized industrial asset marking.",
    overview:
      "Prints rugged, high-throughput barcode and QR labels rated for harsh manufacturing and warehouse environments, with direct ERP/MES integration for automatic serialization.",
    features: [
      "Chemical, thermal & abrasion-resistant label stock options",
      "High-speed serialized barcode/QR printing",
      "Direct ERP / MES / WMS integration",
      "Scan-reliability validation before dispatch",
      "Multi-site deployment support"
    ],
    specifications: [
      { label: "Print Speed", value: "Configurable per installation" },
      { label: "Label Formats", value: "Barcode / QR / RFID-ready" },
      { label: "Durability Rating", value: "Chemical, thermal & abrasion resistant" },
      { label: "Integration", value: "ERP / MES / WMS" },
      { label: "Deployment", value: "Centralized or distributed" },
      { label: "Warranty", value: "Project-based terms" }
    ],
    benefits: [
      "Eliminate mislabeling and traceability gaps",
      "Withstand harsh industrial environments",
      "Automate serialization at production speed"
    ],
    applications: ["Manufacturing part marking", "Warehouse & logistics labeling", "Electronics component traceability"],
    faq: [
      { q: "What environments is the label stock rated for?", a: "Chemical-resistant, thermal-resistant, and abrasion-resistant stock options are available depending on the deployment environment." },
      { q: "Does it integrate with our plant systems?", a: "Yes, it integrates directly with ERP, MES, and WMS systems so serialization happens automatically as parts move through production." }
    ],
    stats: [
      { value: "Line-Speed", label: "High-throughput printing", iconName: "antenna" },
      { value: "Barcode/QR", label: "Serialized label formats", iconName: "medal" },
      { value: "ERP/MES", label: "Direct system integration", iconName: "shield" },
      { value: "Multi-Site", label: "Consistent deployment", iconName: "map" }
    ]
  },
  {
    slug: "asset-id-tag-system",
    name: "Asset ID Tag System",
    categories: ["asset-identification"],
    image: "/images/verticals/frame-7114.png",
    shortDesc: "RFID and barcode tagging system for enterprise and government asset registries.",
    overview:
      "Tags and digitally registers enterprise assets so audits reconcile the physical inventory against the register automatically, without a manual walkthrough.",
    features: [
      "RFID and barcode tag options",
      "Handheld & fixed reader support",
      "Automatic register reconciliation",
      "Discrepancy flagging on audit",
      "ERP / asset-register integration"
    ],
    specifications: [
      { label: "Tag Types", value: "RFID / barcode" },
      { label: "Reader Support", value: "Handheld & fixed" },
      { label: "Integration", value: "ERP / asset-management software" },
      { label: "Durability", value: "Rated for indoor & outdoor asset life" },
      { label: "Reporting", value: "Automated discrepancy flagging" },
      { label: "Warranty", value: "1 year" }
    ],
    benefits: [
      "Eliminate manual audit hours",
      "Reduce asset loss and write-offs",
      "Resolve custody disputes with a verifiable record"
    ],
    applications: ["Government department registries", "Enterprise IT & furniture audits", "Manufacturing plant tool cribs"],
    faq: [
      { q: "Does this replace our existing asset-register software?", a: "No, it integrates with your existing ERP or asset-management software and strengthens it with verifiable RFID/barcode reconciliation." },
      { q: "Can it track assets across multiple sites?", a: "Yes, the same tagging and reader system reconciles assets across any number of registered sites from one register." }
    ],
    stats: [
      { value: "RFID/BC", label: "Dual tag technology", iconName: "antenna" },
      { value: "Auto-Recon.", label: "Register reconciliation", iconName: "medal" },
      { value: "ERP-Ready", label: "Asset system integration", iconName: "shield" },
      { value: "Multi-Site", label: "Registry consolidation", iconName: "map" }
    ]
  },
  {
    slug: "apm-connect-enterprise",
    name: "APM Connect (Enterprise Fleet Platform)",
    categories: ["software-platforms"],
    image: "/images/solutions/software-solutions-realistic.png",
    shortDesc: "Cloud-native enterprise software platform for real-time fleet tracking, video telematics, and analytics.",
    overview:
      "APM Connect is a highly scalable enterprise fleet management platform. It unifies vehicle locations, live video feeds, sensor telemetry, and driver safety reports into a single, intuitive control panel. With granular user permissions, geofencing rules, and developer-friendly REST APIs, APM Connect integrates seamlessly with your internal ERP and supply chain databases to drive automated operational workflows.",
    features: [
      "Real-time tracking & route replay",
      "Live video telematics & camera playback",
      "Custom geofencing & instant exception alerts",
      "Developer-first REST APIs & webhooks",
      "Advanced driver behavior scoring & analytics"
    ],
    specifications: [
      { label: "Platform Type", value: "Cloud-native SaaS (Web & Mobile)" },
      { label: "API Protocol", value: "RESTful JSON / Webhooks" },
      { label: "Ingestion Capacity", value: "10,000+ events/sec" },
      { label: "Security", value: "SSL Encryption & Role-based Access Control" },
      { label: "Support", value: "24/7 SLA-based enterprise support" }
    ],
    benefits: [
      "Eliminate manual logging with automatic digital reports",
      "Sync vehicle diagnostics directly with maintenance schedules",
      "Reduce disputes with instant visual incident verification"
    ],
    applications: ["Enterprise fleet operators", "Logistics companies", "Public transit networks", "Municipal fleets"],
    faq: [
      { q: "Does APM Connect support third-party trackers?", a: "Yes, our APIs support integrating telemetry data from a wide variety of third-party hardware devices." },
      { q: "Can we run APM Connect on our own servers?", a: "By default, APM Connect is hosted in a secure, high-availability cloud, but private cloud deployments are available for large-scale enterprise clients." }
    ],
    stats: [
      { value: "10k+", label: "Daily active fleets", iconName: "medal" },
      { value: "24/7", label: "Real-time monitoring support", iconName: "antenna" },
      { value: "99.99%", label: "Platform uptime SLA", iconName: "shield" }
    ]
  },
  {
    slug: "rover-connect-consumer",
    name: "Rover Connect (Consumer Platform)",
    categories: ["software-platforms"],
    image: "/images/solutions/software-solutions-realistic.png",
    shortDesc: "Intuitive mobile app for consumer vehicle tracking, security alerts, and family safety.",
    overview:
      "Rover Connect is a consumer-focused mobile application designed to keep families connected and passenger vehicles protected. Working alongside Rover hardware, the app provides real-time location mapping, anti-theft ignition alerts, geofence boundary alerts, and detailed trip history logs right on your smartphone. Simple to set up and navigate, Rover Connect puts vehicle safety and peace of mind directly in your hands.",
    features: [
      "Real-time location mapping on mobile devices",
      "Instant anti-theft ignition & towing notifications",
      "Virtual boundary geofences with push alerts",
      "Detailed trip logs & driving behavior feedback",
      "One-tap emergency contact sharing"
    ],
    specifications: [
      { label: "Supported OS", value: "iOS and Android" },
      { label: "Mapping Provider", value: "Google Maps / Apple Maps integration" },
      { label: "Alert Latency", value: "< 2 seconds for push alerts" },
      { label: "Data Security", value: "End-to-end user data encryption" },
      { label: "Billing", value: "Annual or monthly subscription options" }
    ],
    benefits: [
      "Instantly track your vehicle in case of theft",
      "Get notified if family members arrive safely",
      "Monitor teen driving habits with objective scores"
    ],
    applications: ["Personal cars", "Family vehicles", "Local delivery cars"],
    faq: [
      { q: "Does the app require a GPS tracker installed in the car?", a: "Yes, Rover Connect is designed to work in tandem with APM's Rover series GPS tracking devices." },
      { q: "Can I monitor multiple vehicles in one app account?", a: "Yes, you can register and track multiple vehicles from a single Rover Connect user account." }
    ],
    stats: [
      { value: "500k+", label: "Active consumer installs", iconName: "medal" },
      { value: "<2s", label: "Average alert notification time", iconName: "antenna" },
      { value: "4.8★", label: "App Store & Play Store rating", iconName: "map" }
    ]
  }
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySolution(slug: string): Product[] {
  return products.filter((p) => p.categories.includes(slug));
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, limit);
}
