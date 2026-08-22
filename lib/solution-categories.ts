import type { ChallengeItem, BenefitCard, ProductUsage } from "@/lib/solutions-data";

export interface CategoryChild {
  /** Real Solution slug — resolves against solutions[] in solutions-data.ts. Never renamed. */
  slug: string;
  /** Nested URL segment. Defaults to `slug` when omitted. */
  path?: string;
  /** Card label / H1 / breadcrumb override when viewed through the category. Defaults to solution.name. */
  displayName?: string;
}

export interface SolutionCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  overview: string[];
  challenges: ChallengeItem[];
  howItWorks: string[];
  benefits: BenefitCard[];
  industries: string[];
  featuredProducts: ProductUsage[];
  children: CategoryChild[];
}

export const solutionCategories: SolutionCategory[] = [
  {
    slug: "vehicle-solutions",
    name: "Vehicle IoT Solutions",
    tagline:
      "End-to-end intelligent vehicle solutions for transportation, logistics, construction, mining, passenger mobility, and industrial fleets.",
    description:
      "Connected vehicle intelligence — tracking, safety, compliance, and power electronics — engineered for commercial and passenger fleets operating at scale.",
    heroImage: "/images/solutions/vehicle-tracking.png",
    overview: [
      "Every vehicle-dependent business is really running two operations at once: the physical movement of goods and people, and the flow of data that tells you whether that movement is efficient, safe, and compliant. Most businesses have only ever built the first one.",
      "APM's Vehicle Solutions bring both together — GPS tracking, video telematics, driver safety hardware, payload and compliance systems, and the power electronics that keep electric and connected vehicles running, all reporting into a single operational picture. Whether the fleet is five delivery vans or five thousand mining trucks, the same connected layer applies.",
      "This isn't a single product — it's a portfolio of purpose-built systems that businesses combine based on what they actually operate: a logistics company leans on fleet management and asset tracking, a state transport corporation leans on public transport compliance and video telematics, a construction firm leans on vehicle safety and asset tracking together. Each system stands on its own and integrates cleanly with the others."
    ],
    challenges: [
      { title: "Fragmented Vehicle Data", description: "Location, fuel, driver behavior, and compliance status often live in separate systems that were never designed to talk to each other." },
      { title: "Rising Operating Costs", description: "Fuel waste, unplanned maintenance, and inefficient routing quietly erode margins across a growing fleet." },
      { title: "Safety & Liability Exposure", description: "Every uninstrumented vehicle carries unmanaged risk — to drivers, other road users, and the business's insurance and reputation." },
      { title: "Regulatory Complexity", description: "Multiple, overlapping mandates — tracking, emissions, registration, passenger safety — apply differently across vehicle types and states." },
      { title: "Electrification Uncertainty", description: "Fleets moving to electric and connected platforms need power and connectivity electronics they've never had to manage before." },
      { title: "Scaling Without Adding Headcount", description: "The operational visibility that works for ten vehicles has to keep working, unchanged in kind, at ten thousand." }
    ],
    howItWorks: [
      "A vehicle is fitted with the combination of hardware its operation actually needs — GPS tracking, cameras, safety sensors, payload monitors, or compliance devices — installed through APM's nationwide certified dealer network.",
      "Every device reports continuously into a common data layer, so location, condition, driver behavior, and compliance status sit side by side instead of in separate silos.",
      "Fleet managers work from one dashboard regardless of which underlying systems are active, with automated alerts surfacing the exceptions that need a decision.",
      "Compliance and safety hardware operate automatically and consistently — speed governance, tamper-proof plates, certified tracking — removing dependence on manual enforcement.",
      "As the fleet grows or shifts toward electric vehicles, the same platform and dealer network scale with it, without re-architecting how the business monitors its operation."
    ],
    benefits: [
      { title: "One Operational View", description: "See location, safety, compliance, and utilization across every vehicle from a single system." },
      { title: "Lower Total Cost of Operation", description: "Cut fuel waste, unplanned downtime, and insurance exposure across the fleet." },
      { title: "Provable Compliance", description: "Meet tracking, safety, and registration mandates with certified, auditable hardware." },
      { title: "Measurable Safety Improvement", description: "Reduce accident rates with hardware that enforces safe behavior automatically." },
      { title: "Electrification-Ready", description: "Extend the same operational model to electric and connected vehicle platforms." },
      { title: "Scale Without Re-Architecting", description: "Grow from a handful of vehicles to a national fleet on the same systems and dealer network." }
    ],
    industries: ["Transportation", "Logistics", "Construction", "Mining", "Government", "Public Transport", "Manufacturing"],
    featuredProducts: [
      { slug: "rover-elite", why: "Real-time GPS tracking that anchors visibility across every vehicle solution in this category." },
      { slug: "rover-view", why: "Turns live camera and sensor data into safety alerts and driver behavior insight." },
      { slug: "bms-card", why: "Automotive-grade battery management for fleets moving to electric platforms." }
    ],
    children: [
      { slug: "fleet-management" },
      { slug: "video-surveillance", path: "video-telematics", displayName: "Video Telematics" },
      { slug: "public-transport-solutions", path: "public-transport", displayName: "Public Transport" },
      { slug: "vehicle-compliance" },
      { slug: "vehicle-safety" },
      { slug: "asset-tracking" },
      { slug: "electric-mobility" }
    ]
  },
  {
    slug: "automated-testing-solutions",
    name: "Intelligence Test Solutions",
    tagline: "Remove bias from vehicle inspection and driver licensing with fully automated testing infrastructure.",
    description:
      "Sensor-driven vehicle fitness and driving test infrastructure built to government Automated Testing Station and licensing standards.",
    heroImage: "/images/solutions/automated-testing-solutions.png",
    overview: [
      "Manual vehicle inspection and driver licensing are inconsistent, subjective, and hard to defend to the public.",
      "APM's Intelligence Test Solutions replace that judgment with sensor-driven, digitally logged infrastructure — an automated lane for brakes, lights, and emissions, and a sensor-instrumented driving track for licensing — delivered as a turnkey, auditable installation."
    ],
    challenges: [
      { title: "Inconsistent Manual Inspection", description: "Vehicle fitness results vary depending on which inspector performs the test." },
      { title: "Licensing Test Subjectivity", description: "Manual driving test evaluation is vulnerable to inconsistency and influence." },
      { title: "Low Testing Throughput", description: "Manual processes cap how many vehicles or candidates can be tested per day." },
      { title: "Lack of Digital Records", description: "Paper-based results are difficult to audit, dispute, or trace after the fact." },
      { title: "Regulatory Standard Compliance", description: "Testing infrastructure must meet government ATS and licensing certification requirements." }
    ],
    howItWorks: [
      "Vehicles or candidates move through a sequence of automated test stations — brakes, lights, emissions, or driving maneuvers — without a human scorer in the decision loop.",
      "Sensors, inductive loops, and camera-based monitoring capture the raw performance data at each stage.",
      "Every result is scored digitally and automatically, removing subjective judgment from the outcome.",
      "Results log directly into government-linked databases, creating an auditable, tamper-resistant record.",
      "Testing infrastructure is delivered as a turnkey installation — civil works and equipment together — built to Automated Testing Station and licensing track standards."
    ],
    benefits: [
      { title: "Eliminate Testing Bias", description: "Remove subjectivity from both vehicle inspection and driver evaluation." },
      { title: "Increase Testing Throughput", description: "Process more vehicles and candidates without sacrificing accuracy." },
      { title: "Create Auditable Records", description: "Maintain digital, tamper-resistant results for every test performed." },
      { title: "Meet Government Standards", description: "Satisfy ATS and licensing certification requirements out of the box." },
      { title: "Improve Public Trust", description: "Demonstrate fair, consistent testing to the public and regulators." },
      { title: "Support Turnkey Deployment", description: "Implement complete testing infrastructure without piecing together vendors." }
    ],
    industries: ["Government", "Transportation", "Public Transport", "Logistics"],
    featuredProducts: [
      { slug: "automated-testing-lane", why: "Runs sequential, sensor-based vehicle fitness checks without manual inspection bias." },
      { slug: "automated-test-driving-track", why: "Scores driver licensing candidates automatically using sensor and camera-based evaluation." }
    ],
    children: [
      { slug: "automated-testing-lane" },
      { slug: "automated-driving-test-track" }
    ]
  },
  {
    slug: "printing-identification-solutions",
    name: "Printing & Identification Solutions",
    tagline: "Issue secure, verifiable identification and documentation at the scale government and industry demand.",
    description:
      "Secure printing, tamper-proof identification, and industrial labeling systems engineered for high-throughput, tamper-evident issuance.",
    heroImage: "/images/solutions/printing-identification.png",
    overview: [
      "Every plate, ID card, license, and asset label an institution issues carries trust — proof it can't be forged, cloned, or misattributed.",
      "APM's Printing & Identification Solutions cover that chain end to end: tamper-proof registration plates, secure government ID and card printing, and industrial labeling for asset identification — all built for high-throughput issuance without compromising security."
    ],
    challenges: [
      { title: "Forgery & Tampering Risk", description: "Standard printing, plates, and labels are vulnerable to counterfeiting, cloning, and tampering." },
      { title: "High-Volume Issuance Demands", description: "Large institutions need to issue thousands of secure documents, plates, or labels without delays." },
      { title: "Government Database Integration", description: "Issued plates, IDs, and certificates must be verifiable against official records." },
      { title: "Multi-Format Requirements", description: "Institutions need to issue cards, certificates, plates, and labels from a coordinated set of systems." },
      { title: "Audit & Accountability Needs", description: "Every issued item must be traceable for compliance, warranty, and audit purposes." }
    ],
    howItWorks: [
      "Tamper-evident features — laser etching, holograms, secure print formats, or embedded codes — are applied directly during manufacturing or printing, making forgery immediately detectable.",
      "High-throughput equipment handles large-volume issuance without compromising those security features.",
      "Every item issued is logged automatically, creating an audit trail tied to government or institutional records.",
      "The portfolio spans multiple formats — registration plates, ID cards, certificates, and industrial labels — so institutions aren't assembling point solutions from separate vendors.",
      "Deployment can be centralized at one facility or distributed across a dealer and manufacturing network, depending on institutional scale."
    ],
    benefits: [
      { title: "Prevent Forgery & Tampering", description: "Apply tamper-evident security features to every plate, document, or label issued." },
      { title: "Support High-Volume Issuance", description: "Print and manufacture at institutional scale without sacrificing security." },
      { title: "Ensure Government Verifiability", description: "Integrate directly with official databases for document and plate validation." },
      { title: "Maintain Full Audit Trails", description: "Track every item issued for compliance and accountability." },
      { title: "Simplify Multi-Format Programs", description: "Issue plates, cards, certificates, and labels from one coordinated portfolio." },
      { title: "Reduce Fraud-Related Costs", description: "Lower the operational cost of managing forged or disputed items." }
    ],
    industries: ["Government", "Transportation", "Manufacturing", "Public Transport", "Logistics"],
    featuredProducts: [
      { slug: "high-security-registration-plate", why: "Tamper-proof, laser-etched vehicle identification manufactured to government HSRP specification." },
      { slug: "printing-solution", why: "High-throughput, tamper-evident printing for licenses, certificates, and government identification." }
    ],
    children: [
      { slug: "high-security-registration-plate" },
      { slug: "industrial-label-printing" },
      { slug: "asset-identification" },
      { slug: "government-identification" }
    ]
  },
  {
    slug: "industrial-iot",
    name: "Industrial IoT Solutions",
    tagline: "Ruggedized telemetry, edge sensing, and battery management for industrial machinery and smart grids.",
    description: "Rugged edge sensors, cellular controllers, and battery management systems engineered for industrial automation, remote asset monitoring, and grid infrastructure.",
    heroImage: "/images/solutions/data-logger-clean.png",
    overview: [
      "Modern industrial facilities and utilities operate in high-stakes environments where machinery downtime or power failures carry immediate, compounding costs. Without continuous, edge-level visibility, operators are forced to manage critical infrastructure reactively, responding to failures only after they interrupt service.",
      "APM's Industrial IoT Solutions bridge the gap between physical machinery and digital operations. We deploy ruggedized telemetry controllers, edge sensors, and automotive-grade battery management systems (BMS) that capture and transmit diagnostic data under the most extreme operating conditions.",
      "Whether monitoring remote generators, managing battery energy storage systems, or tracking industrial equipment across multi-site utility operations, our hardware keeps you connected. Delivered as a rugged, drop-in telemetry layer, it integrates directly with your existing SCADA or ERP systems to automate exception alerts and predictive maintenance scheduling."
    ],
    challenges: [
      { title: "Extreme Operating Conditions", description: "Industrial hardware must survive continuous vibration, moisture, and temperature fluctuations without failing." },
      { title: "High Downtime Costs", description: "Unplanned generator or machinery failures quickly halt production lines or disrupt municipal utility services." },
      { title: "Isolated Remote Assets", description: "Telemetry from remote sites and mobile generators is difficult to centralize without reliable, low-power cellular connectivity." },
      { title: "Complex Battery Management", description: "Deploying large-scale energy storage or electric platforms requires precise cell-level balancing to prevent thermal runaway." },
      { title: "Security & Compliance Exposure", description: "Industrial networks require secure, tamper-proof communication channels to protect operational telemetry from unauthorized access." }
    ],
    howItWorks: [
      "Ruggedized edge controllers, BMS cards, and telemetry sensors are installed directly onto industrial machinery, generators, or battery packs.",
      "Embedded cellular eSIM controllers establish a secure, continuous data connection, streaming diagnostic metrics to a central monitoring dashboard.",
      "Edge-level monitoring checks for cell imbalance, temperature spikes, or abnormal vibration, triggering instant safety shutdowns if thresholds are exceeded.",
      "Telemetry logs directly into enterprise dashboards, enabling predictive maintenance scheduling based on actual machine runtime rather than intervals.",
      "The entire deployment operates under industrial-grade security standards, keeping remote infrastructure monitored, compliant, and protected."
    ],
    benefits: [
      { title: "Minimize Unplanned Downtime", description: "Identify early wear and battery degradation before they cause operational failure." },
      { title: "Extend Battery Asset Life", description: "Manage cell balance and thermal thresholds to maximize the lifespan of battery packs." },
      { title: "Ensure Continuous Connectivity", description: "Embedded eSIMs connect reliably across remote utility networks and industrial sites." },
      { title: "Automate Remote Audits", description: "Eliminate manual site checks with continuous, digital telemetry records." },
      { title: "Protect Critical Infrastructure", description: "Prevent thermal runaway and machinery damage with automatic edge safety controls." },
      { title: "Seamless Systems Integration", description: "Stream telemetry directly into existing ERP and industrial control software." }
    ],
    industries: ["Manufacturing", "Utilities", "Mining", "Construction", "Logistics", "Energy & Storage"],
    featuredProducts: [
      { slug: "2g-4g-data-logger", why: "Rugged cellular logging hub for remote industrial sensors and machinery monitoring." },
      { slug: "iot-m2m-esim", why: "Ensures reliable, tamper-proof cellular connectivity for remote industrial assets." },
      { slug: "bms-card", why: "Provides cell-level management and safety controls for battery energy storage." }
    ],
    children: [
      { slug: "electric-mobility", displayName: "Power Electronics" },
      { slug: "industrial-monitoring", displayName: "Industrial Telemetry" }
    ]
  },
  {
    slug: "software-solutions",
    name: "Software Solutions",
    tagline: "A unified enterprise platform connecting vehicles, industrial assets, and drivers in real time.",
    description: "Enterprise software platforms and APIs providing live tracking, fleet analytics, driver safety scoring, and integration tools to unify your connected operations.",
    heroImage: "/images/solutions/software-solutions-realistic.png",
    overview: [
      "Connected hardware is only as powerful as the software that coordinates it. Without a unified interface, data from GPS trackers, video telematics, and industrial sensors remains siloed in separate dashboards, forcing operators to piece together spreadsheets to understand their operations.",
      "APM's Software Solutions bring your entire connected ecosystem into a single operational picture. Our cloud-native platforms process live telemetry, camera streams, and sensor logs to deliver real-time mapping, automated alerts, and actionable efficiency metrics.",
      "Designed for scalability, our software features high-throughput APIs that integrate seamlessly with your existing ERP, logistics, and supply chain applications. From monitoring public transport passenger metrics to scoring driver safety and scheduling vehicle maintenance, APM's platforms turn raw data into decisions."
    ],
    challenges: [
      { title: "Siloed Device Dashboards", description: "Managing separate software for tracking, camera feeds, and vehicle maintenance increases administrative load and hides operational patterns." },
      { title: "Data Overload & Noise", description: "Processing millions of telemetry coordinates is meaningless without software that highlights only the exceptions needing action." },
      { title: "Legacy System Integration", description: "New IoT telemetry must connect cleanly with existing ERP, CRM, or billing databases to drive automated workflows." },
      { title: "High Scaling Costs", description: "Enterprise software must handle growing fleets of devices without lagging or experiencing reliability bottlenecks." },
      { title: "Security and Access Control", description: "Multi-tenant operations require granular user permissions to protect sensitive route and diagnostic logs." }
    ],
    howItWorks: [
      "Onboard vehicle and industrial devices stream live telemetry securely to APM's ingestion servers.",
      "APM Connect unifies this data, applying real-time geofencing, route matching, and exception-detection algorithms.",
      "Fleet and facility managers work from a single dashboard, receiving instant alerts for safety violations or vehicle deviations.",
      "Robust REST APIs and webhooks push event logs directly to existing enterprise software like SAP or custom logistics systems.",
      "Granular user roles and access logs ensure data security across all branches, depots, and sub-contractor accounts."
    ],
    benefits: [
      { title: "Single Pane of Glass", description: "Monitor vehicles, assets, and drivers from a single enterprise interface." },
      { title: "Automate Operational Alerts", description: "Receive instant notifications for route deviations, idling, or harsh driving." },
      { title: "Streamline ERP Integrations", description: "Sync telemetry with back-office billing, scheduling, and logistics software." },
      { title: "Improve Driver Performance", description: "Generate objective safety scores based on harsh braking, acceleration, and speeding." },
      { title: "Secure Multi-Tenant Access", description: "Define role-based access for dispatchers, managers, and external clients." },
      { title: "Scale with Zero Lag", description: "Ingest thousands of events per second on a resilient, high-availability platform." }
    ],
    industries: ["Logistics", "Transportation", "Public Transport", "Government", "Construction", "Manufacturing"],
    featuredProducts: [
      { slug: "apm-connect-enterprise", why: "Enterprise-grade cloud platform connecting vehicles, cameras, and diagnostics." },
      { slug: "rover-connect-consumer", why: "User-friendly mobile tracking and family safety application for personal vehicles." }
    ],
    children: [
      { slug: "connected-vehicle-platform", displayName: "Connected Vehicle Platform" },
      { slug: "fleet-analytics", displayName: "Fleet Analytics & APIs" }
    ]
  },
  {
    slug: "manufacturing-solutions",
    name: "Manufacturing Solutions",
    tagline: "High-throughput digital traffic sign printing and secure manufacturing systems.",
    description: "Durable, specification-compliant digital traffic sign printing and secure industrial identification systems backed by Tracole Technologies.",
    heroImage: "/images/solutions/trafficjet-printers.png",
    overview: [
      "APM's Manufacturing Solutions feature TrafficJet digital printers, the trusted system for producing durable traffic safety, wayfinding, and custom signage. Backed 100% by Tracole Technologies Pvt. Ltd., we provide the entire system—including printer, ink, reflective sheeting, lamination, and technical support—ensuring single-supplier warranty and peace of mind.",
      "Built on a proven high-performance platform, our digital printing systems automate sign making with True Traffic Color™ spot inks and integrated dryers, producing specification-compliant, durable signage at high speeds while minimizing dust intrusion and cartridge wear."
    ],
    challenges: [
      { title: "Multi-Supplier Warranty Gaps", description: "Assembling printers, inks, and media from different vendors leaves sign manufacturers with no clear service owner." },
      { title: "Strict Compliance Matching", description: "Manually matching strict regulatory color codes for traffic control signage is slow and prone to errors." },
      { title: "High Material & Ink Waste", description: "Standard printing processes consume excessive ink and produce cartridge waste during long print runs." },
      { title: "Dust and Clutter Intrusion", description: "Industrial print environments introduce dust that clogs printheads, causing costly print defects." }
    ],
    howItWorks: [
      "Operators prepare traffic control, wayfinding, or custom signage designs in the automated sign-making software.",
      "The TrafficJet printer applies True Traffic Color™ spot inks directly onto reflective sheeting with tight front-panel tolerances that minimize dust.",
      "An integrated dryer dries the print in real-time to enable fast print speeds up to 162 sq ft per hour.",
      "Sign faces are laminated and applied to rigid substrates, fully backed by our unified, single-supplier system warranty."
    ],
    benefits: [
      { title: "Single-Supplier Warranty", description: "Printer, ink, sheeting, overlay, laminator, and service support are backed 100% by a single source." },
      { title: "Integrated Active Dryer", description: "Integrated dryer enables fast print speeds up to 162 ft²/hour with reduced ink consumption." },
      { title: "Reduced Cartridge Waste", description: "Bulk ink loaders increase capacity, reduce waste, and allow easy monitoring via indicator LEDs." },
      { title: "Specification Compliant", description: "True Traffic Color™ spot inks and included software automate compliant traffic sign making." },
      { title: "Real-Time Print Inspection", description: "Large clear front panel and illuminated interior allow operators to monitor prints in real-time." },
      { title: "Maximize Printhead Life", description: "True Traffic Color™ configuration splits the black ink workload between two channels to extend printhead life." }
    ],
    industries: ["Sign Manufacturing", "Transportation", "Government", "Infrastructure", "Logistics"],
    featuredProducts: [
      { slug: "printing-solution", why: "TrafficJet digital sign system automating specification-compliant sign production." },
      { slug: "industrial-label-printer", why: "High-durability labeling systems for assets and industrial environments." }
    ],
    children: [
      { slug: "printing-solution", displayName: "Secure Printing Solutions" },
      { slug: "industrial-label-printing", displayName: "Industrial Label Printing" },
      { slug: "asset-identification", displayName: "Asset Identification Systems" }
    ]
  },
  {
    slug: "workplace-safety",
    name: "Workplace Safety Solutions",
    tagline: "Intelligent road safety and worksite protection for crews, drivers, and pedestrians sharing the same space.",
    description:
      "Traffic control infrastructure and certified protective equipment engineered to reduce accidents on roads, construction sites, and smart city corridors.",
    heroImage: "/images/solutions-topics/workplace-safety.png",
    overview: [
      "Most road and worksite incidents share one root cause: someone or something wasn't seen, or protected, in time.",
      "APM addresses both sides — high-visibility traffic control that marks hazard zones for drivers, and certified protective equipment that keeps crews visible and protected on every shift.",
      "Government agencies, contractors, and infrastructure operators deploy these as a coordinated system rather than separate purchases: signage and delineators define the space, and PPE protects the people working inside it — both engineered to hold up under real outdoor conditions for years, not just when new."
    ],
    challenges: [
      { title: "Low Visibility in Work Zones", description: "Poorly marked construction and diversion zones increase collision risk for drivers and crews alike." },
      { title: "Inconsistent PPE Standards", description: "Without standardized equipment, worker visibility varies unpredictably across teams and shifts." },
      { title: "Weather & Impact Degradation", description: "Standard signage, markers, and workwear degrade quickly under sustained outdoor exposure and vehicle contact." },
      { title: "Regulatory Visibility Mandates", description: "Worksite and road safety regulations increasingly require certified high-visibility equipment and signage." },
      { title: "Rapid Deployment Needs", description: "Temporary work zones need traffic control that can be set up and cleared quickly without sacrificing safety." }
    ],
    howItWorks: [
      "High-visibility markers, signage, and delineators are placed to define hazard zones and lane diversions clearly for approaching traffic.",
      "Reflective, impact-resistant materials rated for outdoor durability keep that visibility consistent through years of sun, rain, UV exposure, and vehicle contact.",
      "Workers in the same zone are equipped with certified high-visibility garments suited to the specific environment — standard shifts or heavy construction conditions.",
      "Equipment is deployed and maintained through APM's nationwide dealer network, keeping installation quality consistent across every site.",
      "Together, the infrastructure and the PPE form one visibility system — engineered so drivers see the zone, and the zone's workers are seen."
    ],
    benefits: [
      { title: "Reduce Work Zone Collisions", description: "Improve hazard awareness and visibility around active work areas." },
      { title: "Reduce Worker Injuries", description: "Protect crews with certified equipment built for real site conditions." },
      { title: "Meet Regulatory Standards", description: "Satisfy road safety and worksite visibility compliance requirements." },
      { title: "Withstand Outdoor Conditions", description: "Maintain reflectivity and structural integrity for years, not months." },
      { title: "Enable Rapid Deployment", description: "Set up and clear temporary work zones quickly without cutting corners on safety." },
      { title: "Standardize Safety Fleet-Wide", description: "Apply consistent equipment and signage standards across every crew and site." }
    ],
    industries: ["Government", "Construction", "Transportation", "Utilities", "Public Transport"],
    featuredProducts: [
      { slug: "traffic-cone", why: "Marks hazard zones and guides traffic safely around road work and diversions." },
      { slug: "safety-jacket", why: "Keeps workers visible during standard shifts with breathable, reflective fabric." }
    ],
    children: [
      { slug: "road-safety-solutions" },
      { slug: "workplace-safety", path: "personal-protective-equipment", displayName: "Personal Protective Equipment" }
    ]
  }
];

export function getCategory(slug: string): SolutionCategory | undefined {
  return solutionCategories.find((c) => c.slug === slug);
}

export function getCategoryChild(category: SolutionCategory, pathOrSlug: string): CategoryChild | undefined {
  return category.children.find((c) => (c.path ?? c.slug) === pathOrSlug);
}

/** The category (if any) that owns a given solution slug, for breadcrumbs/related/prev-next on legacy flat pages. */
export function getCategoryForSolution(slug: string): SolutionCategory | undefined {
  return solutionCategories.find((c) => c.children.some((child) => child.slug === slug));
}
