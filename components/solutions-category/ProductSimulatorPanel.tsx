"use client";

import { useState } from "react";
import { TrendingUp, IndianRupee, Clock, Sparkles, Sun, Moon } from "lucide-react";
import type { ProductType } from "@/data/vehicle-apm-config";
import AnimatedCounter from "./AnimatedCounter";
import ComparisonBarChart from "./ComparisonBarChart";
import FlowDiagram from "./FlowDiagram";
import BeforeAfterCards from "./BeforeAfterCards";

function SliderField({
  label,
  value,
  display,
  onChange,
  min,
  max,
  step = 1
}: {
  label: string;
  value: number;
  display: string;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-slate-500">
        <span>{label}</span>
        <span className="text-navy font-mono">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
        aria-label={label}
      />
    </div>
  );
}

function StatTile({ label, value, prefix = "", suffix = "" }: { label: string; value: number; prefix?: string; suffix?: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
      <span className="text-[10px] uppercase tracking-wide text-slate-400 font-bold block mb-1">{label}</span>
      <AnimatedCounter prefix={prefix} value={value} suffix={suffix} className="block text-xl font-black text-navy font-mono tabular-nums" />
    </div>
  );
}

export default function ProductSimulatorPanel({ product, fleetSize }: { product: ProductType; fleetSize: number }) {
  // Payload Monitoring
  const [avgPayload, setAvgPayload] = useState(4);
  const [dailyTrips, setDailyTrips] = useState(3);
  const [operatingDays, setOperatingDays] = useState(25);

  // Fuel Sensor
  const [dieselPrice, setDieselPrice] = useState(96);
  const [dailyDistance, setDailyDistance] = useState(250);
  const [avgMileage, setAvgMileage] = useState(4);

  // Temperature Sensor
  const [cargoValue, setCargoValue] = useState(800000);
  const [spoilageRate, setSpoilageRate] = useState(6);

  // AI Camera
  const [accidentCost, setAccidentCost] = useState(640000);
  const [accidentRate, setAccidentRate] = useState(2);

  // Reflective Tape
  const [isNight, setIsNight] = useState(true);

  switch (product.id) {
    case "payload-monitoring": {
      const revenueM = fleetSize * dailyTrips * avgPayload * operatingDays * 9600;
      const fuelM = fleetSize * dailyTrips * (avgPayload * 0.8) * operatingDays * 360;
      const tyreM = (fleetSize * 4 * (avgPayload / 5) * 28000) / 12;
      const maintM = (fleetSize * (avgPayload / 3) * 36000) / 12;
      const annualProfit = (revenueM + fuelM + tyreM + maintM) * 12;

      return (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <SliderField label="Average Payload" value={avgPayload} display={`${avgPayload} Tons`} onChange={setAvgPayload} min={1} max={15} />
            <SliderField label="Daily Trips" value={dailyTrips} display={`${dailyTrips} Trips`} onChange={setDailyTrips} min={1} max={10} />
            <SliderField label="Operating Days / Month" value={operatingDays} display={`${operatingDays} Days`} onChange={setOperatingDays} min={10} max={31} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <StatTile label="Est. Monthly Revenue Increase" value={Math.round(revenueM)} prefix="₹" />
            <StatTile label="Fuel Savings / Month" value={Math.round(fuelM)} prefix="₹" />
            <StatTile label="Tyre Life Improvement / Month" value={Math.round(tyreM)} prefix="₹" />
            <StatTile label="Maintenance Reduction / Month" value={Math.round(maintM)} prefix="₹" />
            <StatTile label="Annual Profit" value={Math.round(annualProfit)} prefix="₹" />
          </div>
        </div>
      );
    }

    case "fuel-sensor": {
      const monthlyDieselLitres = (dailyDistance / avgMileage) * 30;
      const currentFuelCost = fleetSize * dieselPrice * monthlyDieselLitres;
      const estimatedFuelTheft = currentFuelCost * 0.08;
      const potentialSavings = estimatedFuelTheft * 0.9;
      const annualSavings = potentialSavings * 12;

      return (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <SliderField label="Diesel Price" value={dieselPrice} display={`₹${dieselPrice}/L`} onChange={setDieselPrice} min={80} max={120} />
            <SliderField label="Daily Running Distance" value={dailyDistance} display={`${dailyDistance} km`} onChange={setDailyDistance} min={50} max={600} step={10} />
            <SliderField label="Average Mileage" value={avgMileage} display={`${avgMileage} km/l`} onChange={setAvgMileage} min={2} max={10} step={0.5} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <StatTile label="Current Fuel Cost / Month" value={Math.round(currentFuelCost)} prefix="₹" />
            <StatTile label="Estimated Fuel Theft / Month" value={Math.round(estimatedFuelTheft)} prefix="₹" />
            <StatTile label="Potential Savings / Month" value={Math.round(potentialSavings)} prefix="₹" />
            <StatTile label="Annual Savings" value={Math.round(annualSavings)} prefix="₹" />
          </div>
          <ComparisonBarChart
            title="Without APM vs With APM"
            beforeLabel="Without APM"
            afterLabel="With APM"
            formatValue={(v) => `₹${Math.round(v).toLocaleString("en-IN")}`}
            bars={[{ label: "Monthly Fuel Cost", before: currentFuelCost, after: Math.max(0, currentFuelCost - potentialSavings) }]}
          />
        </div>
      );
    }

    case "temp-sensor": {
      const annualProtectionValue = fleetSize * cargoValue * (spoilageRate / 100) * 12;
      return (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <SliderField
              label="Cargo Value / Vehicle / Month"
              value={cargoValue}
              display={`₹${cargoValue.toLocaleString("en-IN")}`}
              onChange={setCargoValue}
              min={200000}
              max={2000000}
              step={50000}
            />
            <SliderField label="Spoilage Risk Without Monitoring" value={spoilageRate} display={`${spoilageRate}%`} onChange={setSpoilageRate} min={2} max={20} />
          </div>
          <FlowDiagram
            steps={["Normal Temperature", "Door Opens", "Temperature Increases", "System Alert", "Product Loss Prevented"]}
            outputLabel="Estimated Annual Inventory Protection Value"
            outputValue={Math.round(annualProtectionValue)}
            outputPrefix="₹"
          />
        </div>
      );
    }

    case "ai-camera": {
      const accidentAvoided = (fleetSize * (accidentRate / 10) * accidentCost * 0.65) / 12;
      const annualAccidentCostAvoided = accidentAvoided * 12;
      return (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <SliderField
              label="Average Accident Damage Cost"
              value={accidentCost}
              display={`₹${accidentCost.toLocaleString("en-IN")}`}
              onChange={setAccidentCost}
              min={160000}
              max={3200000}
              step={80000}
            />
            <SliderField label="Incidents / Year per 10 Vehicles" value={accidentRate} display={`${accidentRate}`} onChange={setAccidentRate} min={0} max={8} />
          </div>
          <BeforeAfterCards
            beforeTitle="Without Camera"
            afterTitle="With Camera"
            beforeItems={["No Accident Evidence", "Insurance Delay", "Driver Dispute"]}
            afterItems={["Recorded Evidence", "Faster Claim Settlement", "Driver Protection"]}
          />
          <StatTile label="Est. Annual Accident Cost Avoided" value={Math.round(annualAccidentCostAvoided)} prefix="₹" />
        </div>
      );
    }

    case "ais-140-gps": {
      const finesAvoidedAnnual = fleetSize * 40000;
      return (
        <FlowDiagram
          steps={["Vehicle", "GPS", "Cloud", "APM Connect Platform", "Live Tracking", "Emergency Response", "Compliance", "Analytics"]}
          outputLabel="Est. RTO Fines Avoided / Year"
          outputValue={finesAvoidedAnnual}
          outputPrefix="₹"
        />
      );
    }

    case "reflective-tape": {
      return (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">Preview</span>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setIsNight(false)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    !isNight ? "bg-primary text-white" : "text-slate-400"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Day
                </button>
                <button
                  type="button"
                  onClick={() => setIsNight(true)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    isNight ? "bg-navy text-white" : "text-slate-400"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Night
                </button>
              </div>
            </div>

            <div className={`grid sm:grid-cols-2 gap-4 p-6 transition-colors duration-500 ${isNight ? "bg-navy" : "bg-white"}`}>
              <div className="flex flex-col items-center gap-3">
                <span className={`text-[10px] uppercase font-bold tracking-wide ${isNight ? "text-rose-300" : "text-slate-400"}`}>
                  Without Reflective Tape
                </span>
                <div className={`w-full h-16 rounded-xl flex items-center justify-center ${isNight ? "bg-white/5" : "bg-slate-100"}`}>
                  <div
                    className={`w-2/3 h-6 rounded-md transition-opacity duration-500 ${
                      isNight ? "bg-rose-500/20 opacity-40" : "bg-slate-300 opacity-80"
                    }`}
                  />
                </div>
                <span className={`text-xs font-bold ${isNight ? "text-rose-300" : "text-slate-500"}`}>
                  {isNight ? "Low Visibility → Accident Risk" : "Fine in daylight"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <span className={`text-[10px] uppercase font-bold tracking-wide ${isNight ? "text-emerald-300" : "text-slate-400"}`}>
                  With Reflective Tape
                </span>
                <div className={`w-full h-16 rounded-xl flex items-center justify-center ${isNight ? "bg-white/5" : "bg-slate-100"}`}>
                  <div
                    className={`w-2/3 h-6 rounded-md transition-all duration-500 ${
                      isNight ? "bg-amber-300 shadow-[0_0_18px_rgba(252,211,77,0.6)]" : "bg-slate-300"
                    }`}
                  />
                </div>
                <span className={`text-xs font-bold ${isNight ? "text-emerald-300" : "text-slate-500"}`}>
                  {isNight ? "High Visibility → Improved Road Safety" : "Even more visible at night"}
                </span>
              </div>
            </div>
          </div>

          <BeforeAfterCards
            beforeItems={["Low Visibility", "Higher Accident Risk"]}
            afterItems={["High Visibility", "Improved Road Safety"]}
          />
        </div>
      );
    }

    case "hsrp": {
      return <FlowDiagram steps={["Vehicle", "Secure Registration Plate", "Tamper Detection", "Police Verification", "Vehicle Authentication"]} />;
    }

    case "auto-dipper": {
      return <FlowDiagram steps={["Night Driving", "Incoming Vehicle", "Automatic Beam Control", "Improved Driver Safety"]} />;
    }

    default: {
      // Fallback: generic per-product ROI calculator, reusing the same pattern as the vehicle-level calculator.
      const annualSavings = product.savingsImpact * fleetSize;
      return (
        <div className="bg-navy rounded-3xl p-6 md:p-8 text-white">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> {product.name} ROI Estimate
          </h3>
          <p className="text-white/50 text-xs mb-6">Based on your fleet size of {fleetSize} vehicles above.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold flex items-center gap-1">
                <IndianRupee className="w-3 h-3" /> Est. Annual Savings
              </span>
              <AnimatedCounter prefix="₹" value={Math.round(annualSavings)} className="block text-xl font-black mt-1 font-mono tabular-nums text-white" />
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Per Vehicle / Year
              </span>
              <AnimatedCounter prefix="₹" value={product.savingsImpact} className="block text-xl font-black mt-1 font-mono tabular-nums text-primary" />
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 col-span-2">
              <span className="text-[10px] uppercase tracking-wide text-white/50 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Install Time
              </span>
              <p className="text-xl font-black mt-1">{product.installTime}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}
