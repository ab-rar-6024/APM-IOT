import { PRODUCTS, type VehicleType } from "@/data/vehicle-apm-config";

// Ported from components/solutions-category/VehicleSolutionsBuilder.tsx's getMetricsForVehicle —
// same base constants and per-product impact bonuses, reused here so the light Vehicle Solutions
// page's Dashboard Integration and Customer Value Summary sections stay numerically consistent.

export interface FleetMetrics {
  safetyScore: number;
  fuelEfficiency: number;
  complianceLabel: string;
  compliancePercent: number;
  maintenanceHealth: number;
  driverBehaviour: number;
  savingsPerVehicle: number;
}

export function computeFleetMetrics(vehicle: VehicleType, selectedProductIds: string[]): FleetMetrics {
  let safety = vehicle.baseSafetyScore;
  let savingsPerVehicle = 0;

  selectedProductIds.forEach((id) => {
    const item = PRODUCTS.find((p) => p.id === id);
    if (item) {
      safety += item.safetyImpact;
      savingsPerVehicle += item.savingsImpact;
    }
  });
  safety = Math.min(99, safety);

  const baseComplianceVal = vehicle.id === "truck" ? 15 : vehicle.id === "bus" ? 35 : 60;
  const baseFuelEffVal = vehicle.id === "truck" ? 70 : vehicle.id === "bus" ? 75 : 85;

  const hasAIS140 = selectedProductIds.includes("ais-140-gps");
  const hasSpeedLimiter = selectedProductIds.includes("speed-limiter");
  const hasWeightCompliance = selectedProductIds.includes("payload-monitoring");

  let complianceLabel = vehicle.baseCompliance;
  if (vehicle.id === "truck") {
    if (hasAIS140 && hasSpeedLimiter && hasWeightCompliance) {
      complianceLabel = "Fully Compliant (AIS-140 + Speed + Load)";
    } else if (hasAIS140 && hasSpeedLimiter) {
      complianceLabel = "Partially Compliant (Missing Weight Sensor)";
    } else if (hasAIS140) {
      complianceLabel = "Basic Compliance (GPS Only)";
    } else {
      complianceLabel = "Non-Compliant (Requires VLT/Speed)";
    }
  } else if (vehicle.id === "bus") {
    if (hasAIS140 && hasSpeedLimiter) {
      complianceLabel = "Fully Compliant (School Bus Code)";
    } else if (hasAIS140) {
      complianceLabel = "Partially Compliant (Missing Speed Governor)";
    } else {
      complianceLabel = "Non-Compliant";
    }
  } else if (vehicle.id === "taxi") {
    const hasFare = selectedProductIds.includes("fare-meter");
    const hasBMS = selectedProductIds.includes("bms-card");
    if (hasAIS140 && hasFare && hasBMS) {
      complianceLabel = "EV Commercial Compliant";
    } else if (hasAIS140) {
      complianceLabel = "GPS Certified Only";
    } else {
      complianceLabel = "Non-Compliant";
    }
  }

  return {
    safetyScore: safety,
    fuelEfficiency: Math.min(
      99,
      baseFuelEffVal +
        (selectedProductIds.includes("fuel-sensor") ? 10 : 0) +
        (selectedProductIds.includes("speed-limiter") ? 8 : 0) +
        (selectedProductIds.includes("tpms") ? 4 : 0) +
        (selectedProductIds.includes("ais-140-gps") ? 3 : 0)
    ),
    complianceLabel,
    compliancePercent: Math.min(
      100,
      baseComplianceVal +
        (hasAIS140 ? 40 : 0) +
        (hasSpeedLimiter ? 20 : 0) +
        (selectedProductIds.includes("hsrp") ? 15 : 0) +
        (selectedProductIds.includes("reflective-tape") ? 10 : 0) +
        (selectedProductIds.includes("bms-card") ? 25 : 0)
    ),
    maintenanceHealth: Math.min(
      95,
      10 +
        (hasWeightCompliance ? 25 : 0) +
        (selectedProductIds.includes("tpms") ? 12 : 0) +
        (selectedProductIds.includes("fuel-sensor") ? 10 : 0) +
        (selectedProductIds.includes("bms-card") ? 15 : 0) +
        (selectedProductIds.includes("dc-converter") ? 8 : 0)
    ),
    driverBehaviour: Math.min(
      99,
      65 +
        (selectedProductIds.includes("ai-camera") ? 20 : 0) +
        (hasSpeedLimiter ? 10 : 0) +
        (hasAIS140 ? 5 : 0)
    ),
    savingsPerVehicle
  };
}
