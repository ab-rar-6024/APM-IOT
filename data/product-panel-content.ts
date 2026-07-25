// Per-product content for the Product Information Panel on /solutions/vehicle-solutions.
// Everything else the panel needs (image, desc, features bullet list, impact numbers) already
// lives on ProductType in vehicle-apm-config.ts — this file only adds the two fields that don't.

export interface ProductPanelContent {
  howItWorksSteps: string[];
  businessBenefits: { title: string; description: string }[];
}

export const PRODUCT_PANEL_CONTENT: Record<string, ProductPanelContent> = {
  "ais-140-gps": {
    howItWorksSteps: [
      "A certified AIS-140 unit with an integrated eSIM is fitted into the dashboard cab assembly in a 45-minute install.",
      "The device streams encrypted location, speed, and ignition data every few seconds directly to RTO VAHAN servers.",
      "A panic trigger or route deviation raises an instant alert on the fleet dashboard and the government backend simultaneously."
    ],
    businessBenefits: [
      { title: "Prove Compliance Automatically", description: "Certified GPS tracking reports directly to RTO VAHAN servers, satisfying AIS-140 mandates without manual paperwork." },
      { title: "Recover Stolen Assets Faster", description: "Continuous location verification cuts theft-related losses and recovery time by up to 90%." },
      { title: "Real-Time Dispatch Control", description: "Dispatchers see every vehicle's live position, enabling tighter routing and faster response to delays." }
    ]
  },
  "ai-camera": {
    howItWorksSteps: [
      "An AI dashcam with an infrared lens and onboard neural processor is mounted at the windshield glass center.",
      "The unit continuously tracks pupil dilation, yawning, and gaze direction to detect fatigue or lane drift in real time.",
      "The moment a risk pattern is detected, an acoustic alarm fires in-cab and a flagged clip uploads to the fleet dashboard."
    ],
    businessBenefits: [
      { title: "Cut Collision Rates", description: "Continuous fatigue and lane-drift detection reduces preventable collisions by up to 40%." },
      { title: "Protect Cargo & Reputation", description: "Early warnings before an incident protect high-value cargo and reduce liability exposure." },
      { title: "Lower Insurance Costs", description: "A documented safety record and fewer claims translate into lower fleet insurance premiums over time." }
    ]
  },
  "fuel-sensor": {
    howItWorksSteps: [
      "A capacitive fuel rod is fitted into the main diesel tank chamber during a single service visit.",
      "The rod streams live fuel-volume readings, detecting drainage or pilferage via dielectric variance.",
      "Any abnormal drop triggers an instant alert and is logged into the fuel audit report."
    ],
    businessBenefits: [
      { title: "Eliminate Fuel Pilferage", description: "Theft-drain events are flagged within seconds instead of discovered at month-end reconciliation." },
      { title: "Accurate Fuel Audits", description: "Capacitive measurement audits fuel bills to 99% accuracy, closing the gap drivers could previously exploit." },
      { title: "Cut Idle Waste", description: "Idle-burn consumption is visible per vehicle, so wasteful idling can be coached out of the fleet." }
    ]
  },
  "payload-monitoring": {
    howItWorksSteps: [
      "Strain-gauge sensors are bonded to the chassis suspension axles during a single 120-minute service visit.",
      "The sensors continuously measure axle bending strain and convert it into a live cargo weight readout.",
      "Crossing the legal load limit triggers an overload warning before the vehicle leaves the yard, not after a checkpost fine."
    ],
    businessBenefits: [
      { title: "Avoid Overloading Fines", description: "Live axle-strain readouts keep every load within Legal Metrology limits, avoiding fines and vehicle impoundment." },
      { title: "Extend Suspension Life", description: "Catching overload events early cuts suspension and axle wear by roughly 25%." },
      { title: "Improve Braking Stability", description: "Balanced, within-limit loads keep braking distances and handling predictable on every trip." }
    ]
  },
  "speed-limiter": {
    howItWorksSteps: [
      "A tamper-proof governor is wired into the engine cabin's intake throttle during a 45-minute install.",
      "It continuously limits fuel flow or throttle input so the vehicle cannot exceed the RTO-mandated speed ceiling.",
      "Any tamper attempt or override is logged and flagged to the fleet dashboard for immediate follow-up."
    ],
    businessBenefits: [
      { title: "Enforce Safe Speeds", description: "Hard-capped velocity keeps every driver within RTO limits automatically, with no reliance on manual discipline." },
      { title: "Improve Fuel Economy", description: "Governed speeds cut aerodynamic drag and harsh acceleration, improving fuel economy by around 8%." },
      { title: "Reduce Tyre Wear", description: "Lower peak speeds and smoother driving reduce tyre wear and unplanned downtime." }
    ]
  },
  tpms: {
    howItWorksSteps: [
      "RF pressure-and-temperature sensors are fitted to each wheel's valve cap in a 30-minute install.",
      "Each sensor streams live tyre pressure and temperature to an in-cab display and the fleet dashboard.",
      "A slow leak or overheating tyre raises an early warning long before it becomes a highway blowout."
    ],
    businessBenefits: [
      { title: "Prevent Blowouts", description: "Early leak detection stops slow pressure loss from turning into a high-speed tyre failure." },
      { title: "Extend Tyre Life", description: "Correctly inflated tyres wear more evenly, extending tread life by around 15%." },
      { title: "Improve Fuel Efficiency", description: "Properly inflated tyres reduce rolling resistance, trimming fuel consumption fleet-wide." }
    ]
  },
  "temp-sensor": {
    howItWorksSteps: [
      "A waterproof stainless-steel probe is fitted inside the rear cargo container in a 20-minute install.",
      "It logs cargo air temperature continuously and compares it against the cold-chain threshold set for that route.",
      "A door-open event or temperature breach raises an instant alert, and the full log is exportable for dispute resolution."
    ],
    businessBenefits: [
      { title: "Guarantee Cold-Chain Freshness", description: "Continuous logging catches temperature excursions the moment they happen, not after delivery." },
      { title: "Eliminate Spoilage Losses", description: "Early alerts on rising temperature let dispatch intervene before a full load is spoiled." },
      { title: "Verifiable Compliance Reports", description: "Exportable temperature logs settle customer disputes and satisfy HACCP audit requirements." }
    ]
  },
  "auto-dipper": {
    howItWorksSteps: [
      "A photosensitive LDR module is wired into the front grille and headlamp circuit in a 30-minute install.",
      "The sensor continuously watches for oncoming headlamp glare on the road ahead.",
      "The instant it detects an approaching vehicle, it dips the beam automatically in under 100ms, no driver action needed."
    ],
    businessBenefits: [
      { title: "Prevent Glare Collisions", description: "Automatic dipping removes the split-second of blindness that causes many night-time head-on crashes." },
      { title: "Reduce Driver Fatigue", description: "Drivers no longer have to manually toggle beams on every oncoming vehicle, cutting eye strain on long night hauls." },
      { title: "Improve Night-Drive Compliance", description: "Meets RTO night-drive safety expectations without relying on driver memory." }
    ]
  },
  "reverse-parking": {
    howItWorksSteps: [
      "Four waterproof ultrasonic sensors are fitted along the rear bumper outline in a 40-minute install.",
      "While reversing, the sensors continuously measure distance to docks, walls, and people behind the vehicle.",
      "As the gap closes, an acoustic and numeric LED warning escalates, giving the driver time to stop before contact."
    ],
    businessBenefits: [
      { title: "Cut Loading-Bay Damage", description: "Real-time distance warnings reduce reversing dents and dock damage by up to 80%." },
      { title: "Protect Warehouse Crew", description: "Audible alerts give ground crew and drivers a shared, unambiguous warning during tight reversing manoeuvres." },
      { title: "Lower Repair Costs", description: "Fewer bumper and dock collisions mean less unplanned vehicle downtime and repair spend." }
    ]
  },
  "reflective-tape": {
    howItWorksSteps: [
      "AIS-090 approved prismatic conspicuity tape is applied along the rear and lateral sides in a 20-minute install.",
      "At night or in fog, the tape reflects any approaching headlamp back toward its source, outlining the vehicle's full length.",
      "Other drivers see a clearly defined vehicle silhouette from much further away than an unmarked vehicle allows."
    ],
    businessBenefits: [
      { title: "Improve Night Visibility", description: "Reflective outlining makes the vehicle up to 3x more visible in darkness or fog compared to an unmarked body." },
      { title: "Reduce Side-Swipe Risk", description: "A clearly outlined silhouette gives other drivers more reaction time, cutting side and rear collision risk." },
      { title: "Satisfy Road Safety Norms", description: "AIS-090 compliant tape meets mandated high-visibility outlining requirements out of the box." }
    ]
  },
  hsrp: {
    howItWorksSteps: [
      "Laser-etched, hologram-stamped plates are fitted to the front and rear bumpers using non-reusable snap locks in 15 minutes.",
      "Each plate carries a unique serial code linked to the RTO VAHAN database for instant identity verification.",
      "Any attempt to remove or swap the plate visibly damages the snap lock, flagging tampering to any inspecting officer."
    ],
    businessBenefits: [
      { title: "Prevent Plate Cloning", description: "Laser-etched serials and holograms make it far harder for a stolen identity to be used on another vehicle." },
      { title: "Simplify Highway Checkposts", description: "VAHAN-linked plates speed up toll and checkpost verification instead of manual document checks." },
      { title: "Meet MoRTH Mandates", description: "Fully satisfies the national HSRP mandate, avoiding non-compliance penalties at registration and renewal." }
    ]
  },
  "panic-button": {
    howItWorksSteps: [
      "A heavy-press emergency switch is mounted into the passenger cabin panel in a 30-minute install.",
      "Pressing it fires a silent, high-priority alert with live GPS coordinates straight to the dispatch console.",
      "Dispatch sees the exact vehicle and location instantly and can escalate to emergency services without alerting a threat onboard."
    ],
    businessBenefits: [
      { title: "Faster Emergency Response", description: "Silent, location-tagged alerts cut the time between an incident and help arriving." },
      { title: "Improve Passenger Confidence", description: "A visible panic button reassures passengers and drivers that help is always one press away." },
      { title: "Meet Transport Act Requirements", description: "Satisfies the AIS-140 emergency button mandate required for passenger and school transport fleets." }
    ]
  },
  "bms-card": {
    howItWorksSteps: [
      "A battery management card is installed in the under-chassis battery tray, wired across up to 16 cell groups, in 90 minutes.",
      "It continuously monitors individual cell voltage and temperature, balancing charge across the pack.",
      "Any thermal or voltage anomaly triggers a protective cut and an alert, long before it can become a runaway event."
    ],
    businessBenefits: [
      { title: "Prevent Thermal Runaways", description: "Cell-level monitoring catches dangerous voltage or heat anomalies before they escalate into a safety incident." },
      { title: "Extend Battery Life", description: "Balanced charging across cells extends usable battery life by up to 30%." },
      { title: "Track Battery Health Live", description: "State-of-health charts give dispatch early warning of a pack that needs servicing." }
    ]
  },
  "dc-converter": {
    howItWorksSteps: [
      "An IP67-sealed DC-DC converter is fitted in the under-hood motor compartment in a 45-minute install.",
      "It steps the high-voltage traction battery current down to a stable 12V feed for cabin and telemetry electronics.",
      "Overcurrent and reverse-polarity protection isolate the converter automatically if an auxiliary fault occurs."
    ],
    businessBenefits: [
      { title: "Prevent Auxiliary Drains", description: "A dedicated stable 12V feed stops dash screens and telemetry hardware from draining the main battery pack." },
      { title: "Protect Cabin Electronics", description: "Consistent voltage delivery prevents the resets and glitches caused by unregulated auxiliary power." },
      { title: "Reduce Electrical Failures", description: "Built-in overcurrent and reverse-polarity protection cut down on electrical fault callouts." }
    ]
  }
};

/** Product ids that get a bespoke visual simulator instead of the generic ROI calculator. */
export const BESPOKE_SIMULATOR_IDS = [
  "payload-monitoring",
  "fuel-sensor",
  "temp-sensor",
  "ai-camera",
  "ais-140-gps",
  "reflective-tape",
  "hsrp",
  "auto-dipper"
] as const;

export type BespokeSimulatorId = (typeof BESPOKE_SIMULATOR_IDS)[number];

export function isBespokeSimulator(productId: string): productId is BespokeSimulatorId {
  return (BESPOKE_SIMULATOR_IDS as readonly string[]).includes(productId);
}
