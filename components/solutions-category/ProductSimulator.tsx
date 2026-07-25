"use client";

import { useState, useEffect } from "react";
import { Gauge, HelpCircle, Activity, ShieldAlert, Award, Calculator, TrendingUp, Info } from "lucide-react";

interface SpecItem {
  label: string;
  value: string;
}

interface ProductType {
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
}

interface ProductSimulatorProps {
  product: ProductType;
}

// Lightweight animated counter component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const ease = progress * (2 - progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span className="font-mono tabular-nums font-black text-cyan-400">
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function ProductSimulator({ product }: ProductSimulatorProps) {
  // --- STATE FOR CALCULATOR ACCORDION ---
  const [expandedSection, setExpandedSection] = useState<string>("sliders");

  // --- STATE FOR CALCULATOR INPUTS ---
  const [vehicles, setVehicles] = useState(10);
  
  // Payload specific inputs
  const [trips, setTrips] = useState(3);
  const [overload, setOverload] = useState(4);
  const [workingDays, setWorkingDays] = useState(25);

  // Fuel specific inputs
  const [fuelExpense, setFuelExpense] = useState(40000);
  const [theftRate, setTheftRate] = useState(8);
  const [idleHours, setIdleHours] = useState(2);

  // Safety specific inputs
  const [accidentCost, setAccidentCost] = useState(120000);
  const [accidentRate, setAccidentRate] = useState(2); // annual accidents per 10 vehicles
  const [insurancePrem, setInsurancePrem] = useState(24000);

  // Compliance specific inputs
  const [complianceFines, setComplianceFines] = useState(8000);

  // Temperature / cold-chain specific inputs
  const [cargoValue, setCargoValue] = useState(160000);
  const [spoilageRate, setSpoilageRate] = useState(6);

  // Reflective tape specific inputs
  const [nightDrivingPercent, setNightDrivingPercent] = useState(35);
  const [nightAccidentCost, setNightAccidentCost] = useState(60000);

  // HSRP specific inputs
  const [cloningIncidents, setCloningIncidents] = useState(2);
  const [tollDelayCost, setTollDelayCost] = useState(20000);

  // Auto dipper specific inputs
  const [nightKmPercent, setNightKmPercent] = useState(30);
  const [oncomingDensity, setOncomingDensity] = useState(5);

  // General fallback inputs
  const [runningHours, setRunningHours] = useState(8);

  // --- OUTPUT CALCULATIONS ---
  let monthlySavings = 0;
  let yearlySavings = 0;
  let costWithout = 0;
  let costWith = 0;
  let roi = 0;

  // Breakdown metrics
  let breakdowns: Array<{ label: string; monthly: number; yearly: number; color: string }> = [];

  const isPayload = product.id === "payload-monitoring";
  const isFuel = product.id === "fuel-sensor";
  const isAI = product.id === "ai-camera";
  const isGPSOrSpeed = product.id === "ais-140-gps" || product.id === "speed-limiter";
  const isTemp = product.id === "temp-sensor";
  const isReflective = product.id === "reflective-tape";
  const isHSRP = product.id === "hsrp";
  const isAutoDipper = product.id === "auto-dipper";

  if (isPayload) {
    // 1. PAYLOAD MONITORING FORMULAS
    const revenueM = vehicles * trips * overload * workingDays * 1920; // Freight optimization + fine avoidance
    const fuelM = vehicles * trips * (overload * 0.8) * workingDays * 72; // Reduced mechanical engine strain
    const tyreM = vehicles * 4 * (overload / 5) * 5600 / 12; // Tyre life extension
    const maintM = vehicles * (overload / 3) * 7200 / 12; // Lower suspension wear

    breakdowns = [
      { label: "Revenue Increase", monthly: Math.round(revenueM), yearly: Math.round(revenueM * 12), color: "#00E5FF" },
      { label: "Fuel Savings", monthly: Math.round(fuelM), yearly: Math.round(fuelM * 12), color: "#3b82f6" },
      { label: "Tyre Life Extension", monthly: Math.round(tyreM), yearly: Math.round(tyreM * 12), color: "#f59e0b" },
      { label: "Maintenance Reduction", monthly: Math.round(maintM), yearly: Math.round(maintM * 12), color: "#ef4444" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 50000; // Base operating cost baseline
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 18000)) * 100);
  } else if (isFuel) {
    // 2. FUEL MONITORING FORMULAS
    const fuelSavedM = vehicles * fuelExpense * (theftRate / 100);
    const idleSavedM = vehicles * (idleHours * 0.15) * 24 * workingDays; // Fuel saved by cutting idling waste
    const maintenanceSavedM = vehicles * idleHours * 192; // Reduced engine wear

    breakdowns = [
      { label: "Pilferage Restored", monthly: Math.round(fuelSavedM), yearly: Math.round(fuelSavedM * 12), color: "#00E5FF" },
      { label: "Idling Fuel Saved", monthly: Math.round(idleSavedM), yearly: Math.round(idleSavedM * 12), color: "#3b82f6" },
      { label: "Engine Wear Reduction", monthly: Math.round(maintenanceSavedM), yearly: Math.round(maintenanceSavedM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * fuelExpense;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 2400)) * 100);
  } else if (isAI) {
    // 3. AI CAMERA ADAS FORMULAS
    const accidentAvoidedM = (vehicles * (accidentRate / 10) * accidentCost * 0.65) / 12;
    const insuranceSavedM = (vehicles * insurancePrem * 0.15) / 12;
    const liabilitySavedM = (vehicles * 4000) / 12; // Litigation risk reduction

    breakdowns = [
      { label: "Accident Costs Avoided", monthly: Math.round(accidentAvoidedM), yearly: Math.round(accidentAvoidedM * 12), color: "#00E5FF" },
      { label: "Insurance Savings", monthly: Math.round(insuranceSavedM), yearly: Math.round(insuranceSavedM * 12), color: "#3b82f6" },
      { label: "Liability Shield", monthly: Math.round(liabilitySavedM), yearly: Math.round(liabilitySavedM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 4000; // Baseline safety risk cost
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 13000)) * 100);
  } else if (isGPSOrSpeed) {
    // 4. GPS / SPEED GOVERNOR FORMULAS
    const fuelSavedM = vehicles * fuelExpense * 0.05; // 5% speed governance impact
    const finesAvoidedM = (vehicles * complianceFines) / 12;
    const theftRecoveredM = (vehicles * 2400) / 12;

    breakdowns = [
      { label: "Fuel Economy Savings", monthly: Math.round(fuelSavedM), yearly: Math.round(fuelSavedM * 12), color: "#00E5FF" },
      { label: "Fines Avoided", monthly: Math.round(finesAvoidedM), yearly: Math.round(finesAvoidedM * 12), color: "#3b82f6" },
      { label: "Asset Recovery Guard", monthly: Math.round(theftRecoveredM), yearly: Math.round(theftRecoveredM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 24000;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 7200)) * 100);
  } else if (isTemp) {
    // 5. COLD-CHAIN TEMPERATURE FORMULAS
    const spoilagePreventedM = vehicles * cargoValue * (spoilageRate / 100);
    const disputeSavedM = vehicles * 140; // Faster claim resolution via verifiable logs
    const alertResponseM = vehicles * 440; // Earlier intervention before total spoilage

    breakdowns = [
      { label: "Spoilage Loss Prevented", monthly: Math.round(spoilagePreventedM), yearly: Math.round(spoilagePreventedM * 12), color: "#00E5FF" },
      { label: "Claim Dispute Savings", monthly: Math.round(disputeSavedM), yearly: Math.round(disputeSavedM * 12), color: "#3b82f6" },
      { label: "Alert Response Savings", monthly: Math.round(alertResponseM), yearly: Math.round(alertResponseM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 60000;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 3000)) * 100);
  } else if (isReflective) {
    // 6. REFLECTIVE CONSPICUITY FORMULAS
    const accidentsAvoidedM = (vehicles * (nightDrivingPercent / 100) * nightAccidentCost * 0.04) / 12;
    const insuranceDiscountM = vehicles * 360; // No-claim / low-risk fleet discount
    const complianceSavedM = vehicles * 180; // AIS-090 non-conformance fines avoided

    breakdowns = [
      { label: "Night Collisions Avoided", monthly: Math.round(accidentsAvoidedM), yearly: Math.round(accidentsAvoidedM * 12), color: "#00E5FF" },
      { label: "Insurance Discount", monthly: Math.round(insuranceDiscountM), yearly: Math.round(insuranceDiscountM * 12), color: "#3b82f6" },
      { label: "Compliance Fines Avoided", monthly: Math.round(complianceSavedM), yearly: Math.round(complianceSavedM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 8000;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 1600)) * 100);
  } else if (isHSRP) {
    // 7. HSRP TAMPER / VERIFICATION FORMULAS
    const cloningLossAvoidedM = (vehicles * (cloningIncidents / 10) * 9000) / 12;
    const tollSavedM = (vehicles * tollDelayCost) / 12;
    const complianceSavedM = vehicles * 120; // MoRTH mandate fine avoidance

    breakdowns = [
      { label: "Cloning Loss Avoided", monthly: Math.round(cloningLossAvoidedM), yearly: Math.round(cloningLossAvoidedM * 12), color: "#00E5FF" },
      { label: "Toll & Checkpost Savings", monthly: Math.round(tollSavedM), yearly: Math.round(tollSavedM * 12), color: "#3b82f6" },
      { label: "Compliance Fines Avoided", monthly: Math.round(complianceSavedM), yearly: Math.round(complianceSavedM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 3000;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 2400)) * 100);
  } else if (isAutoDipper) {
    // 8. AUTO DIPPER NIGHT-BEAM FORMULAS
    const glareAccidentAvoidedM = (vehicles * (nightKmPercent / 100) * (oncomingDensity / 10) * 12000) / 12;
    const fatigueSavedM = vehicles * 140; // Reduced driver eye-strain / fatigue incidents
    const insuranceSavedM = vehicles * 100;

    breakdowns = [
      { label: "Glare Collisions Avoided", monthly: Math.round(glareAccidentAvoidedM), yearly: Math.round(glareAccidentAvoidedM * 12), color: "#00E5FF" },
      { label: "Driver Fatigue Savings", monthly: Math.round(fatigueSavedM), yearly: Math.round(fatigueSavedM * 12), color: "#3b82f6" },
      { label: "Insurance Savings", monthly: Math.round(insuranceSavedM), yearly: Math.round(insuranceSavedM * 12), color: "#f59e0b" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 4000;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 3200)) * 100);
  } else {
    // 9. DEFAULT CALCULATOR FORMULAS (Other accessories)
    const efficiencyM = vehicles * runningHours * workingDays * 10;
    const safetyM = vehicles * 720;

    breakdowns = [
      { label: "Operational Gains", monthly: Math.round(efficiencyM), yearly: Math.round(efficiencyM * 12), color: "#00E5FF" },
      { label: "Risk Penalty Avoided", monthly: Math.round(safetyM), yearly: Math.round(safetyM * 12), color: "#3b82f6" }
    ];

    monthlySavings = breakdowns.reduce((sum, item) => sum + item.monthly, 0);
    yearlySavings = monthlySavings * 12;
    costWithout = vehicles * 12800;
    costWith = Math.max(0, costWithout - monthlySavings);
    roi = Math.round((yearlySavings / (vehicles * 4800)) * 100);
  }

  // Graph heights
  const mWithoutHeight = (costWithout / (costWithout + costWith)) * 100 || 0;
  const mWithHeight = (costWith / (costWithout + costWith)) * 100 || 0;

  // Dynamic cost values for visual storytelling comparisons
  const fuelTheftLoss = Math.round(vehicles * fuelExpense * (theftRate / 100));
  const payloadOverloadFine = Math.round(vehicles * overload * 4480);
  const accidentLiabilityCost = Math.round(vehicles * (accidentRate / 10) * accidentCost);
  const speedFineCost = Math.round(vehicles * complianceFines);
  const genericInfficiency = Math.round(vehicles * runningHours * 1200);

  return (
    <div className="space-y-4 border-t border-slate-900 pt-4">
      
      {/* Inline styles for custom visuals keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fuelDrain {
          0% { height: 26px; y: 17px; }
          50% { height: 6px; y: 37px; }
          100% { height: 26px; y: 17px; }
        }
        @keyframes leakDrop1 {
          0% { transform: translateY(-24px); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(0); opacity: 0; }
        }
        @keyframes leakDrop2 {
          0% { transform: translateY(-26px); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(0); opacity: 0; }
        }
        @keyframes scannerMotion {
          0% { transform: translateY(4px); }
          50% { transform: translateY(24px); }
          100% { transform: translateY(4px); }
        }
        @keyframes swayAxle {
          0% { d: "M 10 32 Q 35 34, 60 32"; }
          50% { d: "M 10 32 Q 35 46, 60 32"; }
          100% { d: "M 10 32 Q 35 34, 60 32"; }
        }
        @keyframes speedVibrate {
          0% { transform: rotate(40deg); }
          50% { transform: rotate(45deg); }
          100% { transform: rotate(40deg); }
        }
        .animate-fuel-drain {
          animation: fuelDrain 4s infinite linear;
        }
        .animate-leak-drop-1 {
          animation: leakDrop1 1.8s infinite cubic-bezier(0.55, 0.085, 0.68, 0.53);
        }
        .animate-leak-drop-2 {
          animation: leakDrop2 2.2s infinite cubic-bezier(0.55, 0.085, 0.68, 0.53);
        }
        .animate-scan-line {
          animation: scannerMotion 2.5s infinite ease-in-out;
        }
        .animate-sway-axle {
          animation: swayAxle 3s infinite ease-in-out;
        }
        .animate-speed-needle {
          transform-origin: 30px 40px;
          animation: speedVibrate 0.15s infinite linear;
        }
      `}} />

      {/* Header */}
      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 mb-2">
        <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Business ROI Simulator
      </h4>

      <div className="space-y-3 text-left">

        {/* 1. INPUT SLIDERS CARD */}
        <div className="bg-slate-900/35 border border-slate-850 rounded-2xl overflow-hidden shadow-lg transition-all">
          <button
            onClick={() => setExpandedSection(expandedSection === "sliders" ? "none" : "sliders")}
            className="w-full flex justify-between items-center p-3 text-left bg-slate-900/10 hover:bg-slate-900/20 transition-colors border-b border-slate-900/40"
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" /> 1. Parameters
            </span>
            <span className="text-[8px] text-slate-500 font-bold">{expandedSection === "sliders" ? "EXPANDED" : "COLLAPSED"}</span>
          </button>
          {expandedSection === "sliders" && (
            <div className="p-3 space-y-3 animate-fade-in text-left">
              
              {/* Input 1: Vehicles Count (Global) */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                  <span>Vehicles Count</span>
                  <span className="text-white font-mono">{vehicles} Platforms</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={vehicles}
                  onChange={(e) => setVehicles(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {isPayload && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Daily Trips / Vehicle</span>
                      <span className="text-white font-mono">{trips} Runs</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={trips}
                      onChange={(e) => setTrips(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Overload Weight Exceed</span>
                      <span className="text-white font-mono">+{overload} Tons</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={overload}
                      onChange={(e) => setOverload(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Working Days / Month</span>
                      <span className="text-white font-mono">{workingDays} Days</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="31"
                      value={workingDays}
                      onChange={(e) => setWorkingDays(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isFuel && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Monthly Fuel Expense</span>
                      <span className="text-white font-mono">₹{fuelExpense.toLocaleString("en-IN")} / veh</span>
                    </div>
                    <input
                      type="range"
                      min="40000"
                      max="640000"
                      step="8000"
                      value={fuelExpense}
                      onChange={(e) => setFuelExpense(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Estimated Theft Rate</span>
                      <span className="text-white font-mono">{theftRate}% loss</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      value={theftRate}
                      onChange={(e) => setTheftRate(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Engine Idling Time</span>
                      <span className="text-white font-mono">{idleHours} hrs / day</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="6"
                      step="0.5"
                      value={idleHours}
                      onChange={(e) => setIdleHours(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isAI && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Average Accident Damage Cost</span>
                      <span className="text-white font-mono">₹{accidentCost.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                      type="range"
                      min="160000"
                      max="3200000"
                      step="80000"
                      value={accidentCost}
                      onChange={(e) => setAccidentCost(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Incidents Rate per Year</span>
                      <span className="text-white font-mono">{accidentRate} per 10 veh</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={accidentRate}
                      onChange={(e) => setAccidentRate(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Annual Premium</span>
                      <span className="text-white font-mono">₹{insurancePrem.toLocaleString("en-IN")} / veh</span>
                    </div>
                    <input
                      type="range"
                      min="40000"
                      max="400000"
                      step="8000"
                      value={insurancePrem}
                      onChange={(e) => setInsurancePrem(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isGPSOrSpeed && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Monthly Fuel Expense</span>
                      <span className="text-white font-mono">₹{fuelExpense.toLocaleString("en-IN")} / veh</span>
                    </div>
                    <input
                      type="range"
                      min="40000"
                      max="640000"
                      step="8000"
                      value={fuelExpense}
                      onChange={(e) => setFuelExpense(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>RTO Fines Avoided</span>
                      <span className="text-white font-mono">₹{complianceFines.toLocaleString("en-IN")} / yr</span>
                    </div>
                    <input
                      type="range"
                      min="8000"
                      max="240000"
                      step="8000"
                      value={complianceFines}
                      onChange={(e) => setComplianceFines(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isTemp && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Cold-Chain Cargo Value / Vehicle</span>
                      <span className="text-white font-mono">₹{cargoValue.toLocaleString("en-IN")} / mo</span>
                    </div>
                    <input
                      type="range"
                      min="200000"
                      max="2000000"
                      step="50000"
                      value={cargoValue}
                      onChange={(e) => setCargoValue(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Spoilage Risk Without Monitoring</span>
                      <span className="text-white font-mono">{spoilageRate}% loss</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={spoilageRate}
                      onChange={(e) => setSpoilageRate(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isReflective && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Night Driving Share</span>
                      <span className="text-white font-mono">{nightDrivingPercent}% of hours</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      value={nightDrivingPercent}
                      onChange={(e) => setNightDrivingPercent(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Avg Night Collision Cost</span>
                      <span className="text-white font-mono">₹{nightAccidentCost.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="1000000"
                      step="25000"
                      value={nightAccidentCost}
                      onChange={(e) => setNightAccidentCost(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isHSRP && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Cloning / Fraud Incidents</span>
                      <span className="text-white font-mono">{cloningIncidents} per 10 veh/yr</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={cloningIncidents}
                      onChange={(e) => setCloningIncidents(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Toll & Checkpost Delay Cost</span>
                      <span className="text-white font-mono">₹{tollDelayCost.toLocaleString("en-IN")} / yr</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="60000"
                      step="5000"
                      value={tollDelayCost}
                      onChange={(e) => setTollDelayCost(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {isAutoDipper && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Night Driving Distance Share</span>
                      <span className="text-white font-mono">{nightKmPercent}% of km</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      value={nightKmPercent}
                      onChange={(e) => setNightKmPercent(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Oncoming Traffic Density</span>
                      <span className="text-white font-mono">{oncomingDensity} / 10</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={oncomingDensity}
                      onChange={(e) => setOncomingDensity(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

              {!isPayload && !isFuel && !isAI && !isGPSOrSpeed && !isTemp && !isReflective && !isHSRP && !isAutoDipper && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase font-bold text-slate-400">
                      <span>Daily Driving Hours</span>
                      <span className="text-white font-mono">{runningHours} Hours</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      value={runningHours}
                      onChange={(e) => setRunningHours(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </>
              )}

            </div>
          )}
        </div>

        {/* 2. VISUAL COMPARISON STORY CARD */}
        <div className="bg-slate-900/35 border border-slate-850 rounded-2xl overflow-hidden shadow-lg transition-all">
          <button
            onClick={() => setExpandedSection(expandedSection === "story" ? "none" : "story")}
            className="w-full flex justify-between items-center p-3 text-left bg-slate-900/10 hover:bg-slate-900/20 transition-colors border-b border-slate-900/40"
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-cyan-400" /> 2. Impact Visualizer
            </span>
            <span className="text-[8px] text-slate-500 font-bold">{expandedSection === "story" ? "EXPANDED" : "COLLAPSED"}</span>
          </button>
          {expandedSection === "story" && (
            <div className="p-3.5 space-y-3.5 animate-fade-in text-left">
              
              <div className="grid grid-cols-1 gap-3">
                
                {/* Without APM state */}
                <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-3 flex items-center gap-4 relative overflow-hidden">
                  <div className="shrink-0 w-12 h-12 bg-rose-950/40 border border-rose-900/35 rounded-lg flex items-center justify-center relative">
                    {isFuel && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <rect x="18" y="10" width="24" height="28" rx="2" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                        <line x1="22" y1="14" x2="38" y2="14" stroke="#f43f5e" strokeWidth="1.5" />
                        <rect className="animate-fuel-drain" x="20" y="20" width="20" height="16" fill="#f43f5e" opacity="0.6" />
                        <line className="animate-leak-drop-1" x1="28" y1="38" x2="28" y2="46" stroke="#f43f5e" strokeWidth="1.5" />
                        <line className="animate-leak-drop-2" x1="32" y1="38" x2="32" y2="46" stroke="#f43f5e" strokeWidth="1.5" />
                      </svg>
                    )}

                    {isPayload && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <circle cx="10" cy="32" r="6" fill="#f43f5e" opacity="0.3" />
                        <circle cx="50" cy="32" r="6" fill="#f43f5e" opacity="0.3" />
                        <path className="animate-sway-axle" d="M 10 32 Q 35 44, 60 32" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                        <circle cx="30" cy="38" r="3" fill="#f43f5e" />
                      </svg>
                    )}

                    {isAI && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <path d="M10,24 Q30,10 50,24 Q30,38 10,24 Z" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                        <path d="M22,14 L38,34 M38,14 L22,34" stroke="#f43f5e" strokeWidth="2" />
                      </svg>
                    )}

                    {isGPSOrSpeed && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <path d="M12,38 A20,20 0 0,1 48,38" fill="none" stroke="#f43f5e" strokeWidth="3" />
                        <line className="animate-speed-needle" x1="30" y1="38" x2="16" y2="24" stroke="#f43f5e" strokeWidth="2" />
                        <circle cx="30" cy="38" r="3" fill="#111827" stroke="#f43f5e" strokeWidth="1" />
                      </svg>
                    )}

                    {isTemp && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Cargo door ajar */}
                        <path d="M14,10 L14,38 L26,38 L26,10 Z" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                        <path d="M26,10 L40,14 L40,34 L26,38" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
                        {/* Rising thermometer */}
                        <rect x="46" y="12" width="6" height="22" rx="3" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                        <circle cx="49" cy="36" r="4" fill="#f43f5e" opacity="0.6" />
                        <line className="animate-leak-drop-1" x1="49" y1="30" x2="49" y2="16" stroke="#f43f5e" strokeWidth="2" />
                      </svg>
                    )}

                    {isReflective && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Dim, low-contrast vehicle silhouette at night */}
                        <rect x="14" y="20" width="32" height="12" rx="2" fill="#f43f5e" opacity="0.15" />
                        <circle cx="22" cy="34" r="4" fill="#f43f5e" opacity="0.15" />
                        <circle cx="38" cy="34" r="4" fill="#f43f5e" opacity="0.15" />
                        <path d="M4,10 L56,38" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
                      </svg>
                    )}

                    {isHSRP && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Plate with tamper crack */}
                        <rect x="12" y="16" width="36" height="16" rx="2" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                        <path d="M20,16 L28,32 M38,16 L32,32" stroke="#f43f5e" strokeWidth="1.5" />
                        <path d="M42,10 L50,18 M50,10 L42,18" stroke="#f43f5e" strokeWidth="2" />
                      </svg>
                    )}

                    {isAutoDipper && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Glaring crossed high-beams */}
                        <path d="M6,34 L34,14" stroke="#f43f5e" strokeWidth="2" />
                        <path d="M6,26 L34,14" stroke="#f43f5e" strokeWidth="1.5" opacity="0.6" />
                        <path d="M54,34 L26,14" stroke="#f43f5e" strokeWidth="2" />
                        <path d="M54,26 L26,14" stroke="#f43f5e" strokeWidth="1.5" opacity="0.6" />
                        <circle cx="30" cy="14" r="3" fill="#f43f5e" />
                      </svg>
                    )}

                    {!isFuel && !isPayload && !isAI && !isGPSOrSpeed && !isTemp && !isReflective && !isHSRP && !isAutoDipper && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <circle cx="30" cy="24" r="18" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
                        <path d="M20,20 L40,28 M20,28 L40,20" stroke="#f43f5e" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Status Quo</span>
                    <span className="text-[10px] font-black text-rose-400 font-mono">
                      {isFuel && `₹${Math.round(fuelExpense * (theftRate / 100) * vehicles).toLocaleString("en-IN")}/mo leak`}
                      {isPayload && `₹${Math.round(vehicles * trips * overload * workingDays * 2800).toLocaleString("en-IN")}/mo fine`}
                      {isAI && `₹${Math.round((accidentCost * accidentRate * (vehicles / 10)) / 12).toLocaleString("en-IN")}/mo loss`}
                      {isGPSOrSpeed && `₹${Math.round(vehicles * 6400).toLocaleString("en-IN")}/mo risk`}
                      {isTemp && `₹${Math.round(vehicles * cargoValue * (spoilageRate / 100)).toLocaleString("en-IN")}/mo spoilage`}
                      {isReflective && `₹${Math.round((vehicles * (nightDrivingPercent / 100) * nightAccidentCost * 0.04)).toLocaleString("en-IN")}/mo risk`}
                      {isHSRP && `₹${Math.round((vehicles * (cloningIncidents / 10) * 45000) / 12).toLocaleString("en-IN")}/mo fraud loss`}
                      {isAutoDipper && `₹${Math.round((vehicles * (nightKmPercent / 100) * (oncomingDensity / 10) * 60000) / 12).toLocaleString("en-IN")}/mo glare risk`}
                      {!isFuel && !isPayload && !isAI && !isGPSOrSpeed && !isTemp && !isReflective && !isHSRP && !isAutoDipper && `₹${Math.round(vehicles * 11200).toLocaleString("en-IN")}/mo loss`}
                    </span>
                  </div>
                </div>

                {/* With APM state */}
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-4 relative overflow-hidden">
                  <div className="shrink-0 w-12 h-12 bg-emerald-950/40 border border-emerald-900/35 rounded-lg flex items-center justify-center relative">
                    {isFuel && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <rect x="18" y="10" width="24" height="28" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <line x1="22" y1="14" x2="38" y2="14" stroke="#22c55e" strokeWidth="1.5" />
                        <rect x="20" y="24" width="20" height="12" fill="#22c55e" opacity="0.6" />
                        <circle cx="30" cy="24" r="5" fill="#111827" stroke="#22c55e" strokeWidth="1" />
                        <path d="M28,24 L30,26 L33,22" fill="none" stroke="#22c55e" strokeWidth="1" />
                      </svg>
                    )}

                    {isPayload && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <circle cx="10" cy="28" r="6" fill="#00e5ff" opacity="0.3" />
                        <circle cx="50" cy="28" r="6" fill="#00e5ff" opacity="0.3" />
                        <line x1="10" y1="28" x2="50" y2="28" stroke="#22c55e" strokeWidth="2.5" />
                        <circle cx="30" cy="28" r="9" fill="#111827" stroke="#22c55e" strokeWidth="1" />
                        <path d="M27,28 L29,30 L33,26" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                      </svg>
                    )}

                    {isAI && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <path d="M10,24 Q30,10 50,24 Q30,38 10,24 Z" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
                        <circle cx="30" cy="24" r="7" fill="none" stroke="#22c55e" strokeWidth="1" />
                        <circle cx="30" cy="24" r="3" fill="#22c55e" />
                        <line className="animate-scan-line" x1="8" y1="8" x2="52" y2="8" stroke="#00e5ff" strokeWidth="1.25" />
                      </svg>
                    )}

                    {isGPSOrSpeed && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <path d="M12,38 A20,20 0 0,1 48,38" fill="none" stroke="#334155" strokeWidth="3" />
                        <path d="M12,38 A20,20 0 0,1 30,18" fill="none" stroke="#22c55e" strokeWidth="3" />
                        <line x1="30" y1="38" x2="30" y2="16" stroke="#22c55e" strokeWidth="2" />
                        <circle cx="30" cy="38" r="3" fill="#111827" stroke="#22c55e" strokeWidth="1" />
                      </svg>
                    )}

                    {isTemp && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Sealed cargo door */}
                        <path d="M14,10 L14,38 L26,38 L26,10 Z" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M26,10 L40,10 L40,38 L26,38" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        {/* Stable thermometer + alert check */}
                        <rect x="46" y="12" width="6" height="22" rx="3" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <circle cx="49" cy="36" r="4" fill="#22c55e" opacity="0.6" />
                        <line x1="49" y1="30" x2="49" y2="26" stroke="#22c55e" strokeWidth="2" />
                        <path d="M43,22 L46,25 L52,17" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                      </svg>
                    )}

                    {isReflective && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Bright reflective vehicle outline at night */}
                        <rect x="14" y="20" width="32" height="12" rx="2" fill="none" stroke="#22c55e" strokeWidth="2" />
                        <circle cx="22" cy="34" r="4" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <circle cx="38" cy="34" r="4" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M14,20 L46,20 M14,32 L46,32" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
                      </svg>
                    )}

                    {isHSRP && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Verified tamper-proof plate */}
                        <rect x="12" y="16" width="36" height="16" rx="2" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M18,24 L26,30 L42,18" fill="none" stroke="#22c55e" strokeWidth="2" />
                      </svg>
                    )}

                    {isAutoDipper && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        {/* Dipped, soft beams avoiding glare */}
                        <path d="M6,34 L26,26" stroke="#22c55e" strokeWidth="2" />
                        <path d="M54,34 L34,26" stroke="#22c55e" strokeWidth="2" />
                        <circle cx="30" cy="26" r="3" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M24,20 L27,23 L33,16" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                      </svg>
                    )}

                    {!isFuel && !isPayload && !isAI && !isGPSOrSpeed && !isTemp && !isReflective && !isHSRP && !isAutoDipper && (
                      <svg width="60" height="48" viewBox="0 0 60 48">
                        <circle cx="30" cy="24" r="18" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M22,24 L27,29 L38,18" fill="none" stroke="#22c55e" strokeWidth="2" />
                      </svg>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Mitigated Risk</span>
                    <span className="text-[10px] font-black text-emerald-400 font-mono">
                      ₹0 / Operational Loss
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

        {/* 3. PROJECTIONS & BREAKDOWN CARD */}
        <div className="bg-slate-900/35 border border-slate-850 rounded-2xl overflow-hidden shadow-lg transition-all">
          <button
            onClick={() => setExpandedSection(expandedSection === "breakdown" ? "none" : "breakdown")}
            className="w-full flex justify-between items-center p-3 text-left bg-slate-900/10 hover:bg-slate-900/20 transition-colors border-b border-slate-900/40"
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-350 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" /> 3. Financial Forecast
            </span>
            <span className="text-[8px] text-slate-500 font-bold">{expandedSection === "breakdown" ? "EXPANDED" : "COLLAPSED"}</span>
          </button>
          {expandedSection === "breakdown" && (
            <div className="p-3.5 space-y-3.5 animate-fade-in text-left">
              
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                <div className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl flex flex-col">
                  <span className="text-[7px] uppercase font-bold text-slate-500 block">Total Monthly Savings</span>
                  <AnimatedCounter prefix="₹" value={monthlySavings} />
                </div>
                <div className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl flex flex-col">
                  <span className="text-[7px] uppercase font-bold text-slate-500 block">Projected Year 1 ROI</span>
                  <AnimatedCounter value={roi} suffix="%" />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block">Impact Breakdown</span>
                <div className="space-y-1 text-[9px] font-bold text-slate-400">
                  {breakdowns.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950/20 px-2 py-1 rounded border border-slate-900/40">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex gap-2 font-mono">
                        <span className="text-slate-300">₹{item.monthly.toLocaleString("en-IN")}/mo</span>
                        <span className="text-slate-500">(₹{item.yearly.toLocaleString("en-IN")}/yr)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 4. COST PROJECTIONS GRAPH CARD */}
        <div className="bg-slate-900/35 border border-slate-850 rounded-2xl overflow-hidden shadow-lg transition-all">
          <button
            onClick={() => setExpandedSection(expandedSection === "graph" ? "none" : "graph")}
            className="w-full flex justify-between items-center p-3 text-left bg-slate-900/10 hover:bg-slate-900/20 transition-colors border-b border-slate-900/40"
          >
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-350 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> 4. Projections Bar Chart
            </span>
            <span className="text-[8px] text-slate-500 font-bold">{expandedSection === "graph" ? "EXPANDED" : "COLLAPSED"}</span>
          </button>
          {expandedSection === "graph" && (
            <div className="p-3.5 space-y-3.5 animate-fade-in text-left">
              
              <div className="bg-slate-950/70 border border-slate-900 rounded-2xl p-3 flex flex-col justify-between gap-3 h-36">
                <div className="flex justify-around items-end h-24 pb-2 border-b border-slate-900">
                  
                  {/* Bar 1: Monthly Cost Without APM */}
                  <div className="flex flex-col items-center gap-1 w-[20%]">
                    <div className="text-[7px] text-slate-500 font-mono">₹{costWithout.toLocaleString("en-IN")}</div>
                    <div 
                      className="w-4 bg-slate-700/40 border border-slate-600 rounded-t transition-all duration-500 ease-out" 
                      style={{ height: `${mWithoutHeight * 0.7}px` }}
                    />
                    <span className="text-[7px] text-slate-500 uppercase truncate max-w-full text-center">Status Quo</span>
                  </div>

                  {/* Bar 2: Monthly Cost With APM */}
                  <div className="flex flex-col items-center gap-1 w-[20%]">
                    <div className="text-[7px] text-emerald-400 font-mono">₹{costWith.toLocaleString("en-IN")}</div>
                    <div 
                      className="w-4 bg-gradient-to-t from-emerald-600/30 to-emerald-400/90 border border-emerald-500/30 rounded-t transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.15)]" 
                      style={{ height: `${mWithHeight * 0.7}px` }}
                    />
                    <span className="text-[7px] text-emerald-400 uppercase truncate max-w-full text-center">With APM</span>
                  </div>

                  <div className="w-[1px] h-20 bg-slate-900 self-center" />

                  {/* Bar 3: Yearly Cost Without APM */}
                  <div className="flex flex-col items-center gap-1 w-[20%]">
                    <div className="text-[7px] text-slate-500 font-mono">₹{(costWithout * 12).toLocaleString("en-IN")}</div>
                    <div 
                      className="w-4 bg-slate-700/40 border border-slate-600 rounded-t transition-all duration-500 ease-out" 
                      style={{ height: `${mWithoutHeight * 0.7}px` }}
                    />
                    <span className="text-[7px] text-slate-500 uppercase truncate max-w-full text-center">Yr 1 Base</span>
                  </div>

                  {/* Bar 4: Yearly Cost With APM */}
                  <div className="flex flex-col items-center gap-1 w-[20%]">
                    <div className="text-[7px] text-cyan-400 font-mono">₹{(costWith * 12).toLocaleString("en-IN")}</div>
                    <div 
                      className="w-4 bg-gradient-to-t from-cyan-600/30 to-cyan-400/90 border border-cyan-500/30 rounded-t transition-all duration-500 ease-out shadow-[0_0_8px_rgba(0,229,255,0.15)]" 
                      style={{ height: `${mWithHeight * 0.7}px` }}
                    />
                    <span className="text-[7px] text-cyan-400 uppercase truncate max-w-full text-center">Yr 1 Opt</span>
                  </div>

                </div>

                <div className="flex items-center justify-between text-[7px] text-slate-500 uppercase font-black tracking-wider px-1 leading-none">
                  <span>Monthly Fleet Cost</span>
                  <span>Yearly Projection</span>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
