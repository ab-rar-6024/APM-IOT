"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Shield, 
  ShieldAlert,
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Cpu, 
  Tv, 
  Navigation, 
  Zap, 
  Check, 
  Plus, 
  RotateCcw,
  Gauge,
  Scale,
  Thermometer,
  Layers,
  Lock,
  DollarSign as MoneyIcon,
  ChevronRight,
  Info,
  ArrowRight,
  Clock,
  MapPin,
  HelpCircle,
  Award,
  Truck,
  Briefcase
} from "lucide-react";
import gsap from "gsap";
import Vehicle3DViewer from "./Vehicle3DViewer";
import ProductSimulator from "./ProductSimulator";

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
    <span className="font-mono tabular-nums font-black">
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

import { VEHICLES, PRODUCTS, type VehicleType, type ProductType } from "@/data/vehicle-apm-config";

export default function VehicleSolutionsBuilder() {
  const [view, setView] = useState<"selection" | "builder">("selection");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  
  // Configurations dictionary per vehicle platform
  const [configs, setConfigs] = useState<Record<string, string[]>>({
    truck: ["ais-140-gps", "ai-camera", "fuel-sensor"],
    bus: ["ais-140-gps", "ai-camera"],
    taxi: ["ais-140-gps", "tpms"]
  });

  const equippedIds = selectedVehicle ? configs[selectedVehicle.id] || [] : [];
  const [hoveredProduct, setHoveredProduct] = useState<ProductType | null>(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState<ProductType | null>(null);

  // Smooth detailed card swapping states
  const [transitionState, setTransitionState] = useState<"idle" | "animating">("idle");
  const [displayedProduct, setDisplayedProduct] = useState<ProductType | null>(null);
  
  // Lead Form state
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", size: "1-10", phone: "" });

  // AI Alerts/Recommendations Notification Stack state
  const [alerts, setAlerts] = useState<Array<{ id: string; title: string; type: string; msg: string }>>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [activeMobileSheet, setActiveMobileSheet] = useState<"none" | "loadout" | "diagnostics">("none");

  const triggerAIRecommendation = (customAlert?: any) => {
    // Recommendation catalog list
    const ALERTS_CATALOG = [
      { id: "fuel", check: "fuel-sensor", title: "Fuel Theft Flagged", type: "danger", msg: "Sudden 14L fuel drop flagged in main diesel tank. Sensor Offline.", safeTitle: "Fuel Security Verified", safeMsg: "Capacitive fuel rod reporting 100% tank volume security." },
      { id: "fatigue", check: "ai-camera", title: "Driver Fatigue Warning", type: "warning", msg: "ADAS lens detected continuous driver micro-sleep eyes-closed pattern.", safeTitle: "Driver Alertness OK", safeMsg: "AI camera scans confirm active driver attentiveness." },
      { id: "maint", check: "payload-monitoring", title: "Maintenance Overdue", type: "warning", msg: "Rear axle leaf wear indicates mechanical service is required within 4 days.", safeTitle: "Axle Status Balanced", safeMsg: "Axle strain balanced. Predictive scheduling log registered." },
      { id: "overload", check: "payload-monitoring", title: "Payload Overloaded", type: "danger", msg: "Axle load exceeded by 4.2 Tons on rear leaf suspensions. Overloading Fines Risk.", safeTitle: "Payload Compliant", safeMsg: "Cargo load within legal parameters (18.2 Tons total)." },
      { id: "tpms", check: "tpms", title: "Tire Pressure Critical", type: "danger", msg: "Rear-left wheel pressure dropped below 45 PSI. High blowout risk.", safeTitle: "TPMS Pressures OK", safeMsg: "All hubs reporting optimal operational pressures (110 PSI)." },
      { id: "temp", check: "temp-sensor", title: "Cold-chain Temp Leak", type: "warning", msg: "Cargo interior temperature rose above 6.5°C safe limit.", safeTitle: "Cold-chain Stable", safeMsg: "Cargo interior temperature constant at 4.0°C (Stable)." },
      { id: "impact", check: "reverse-parking", title: "Impact Event Registered", type: "danger", msg: "Rear sensor registered 2.4G collision shock at bumper.", safeTitle: "Obstacle Warning Active", safeMsg: "Rear sonar active, audible warnings active for docking bay." }
    ];

    let alertData;
    if (customAlert) {
      alertData = customAlert;
    } else {
      // Pick a random recommendation alert from list
      const idx = Math.floor(Math.random() * ALERTS_CATALOG.length);
      const selected = ALERTS_CATALOG[idx];
      const isEquipped = equippedIds.includes(selected.check);
      
      alertData = {
        title: isEquipped ? selected.safeTitle : selected.title,
        msg: isEquipped ? selected.safeMsg : selected.msg,
        type: isEquipped ? "info" : selected.type
      };
    }

    const uniqueId = Math.random().toString(36).substring(2, 9);
    const newAlert = { ...alertData, id: uniqueId };
    
    setAlerts((prev) => [newAlert, ...prev].slice(0, 3)); // keep last 3 recommendations active

    // Auto fade-out after 5 seconds
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== uniqueId));
    }, 5000);
  };

  // Run auto-simulated recommendations loop when vehicle is selected
  useEffect(() => {
    if (view === "builder" && selectedVehicle) {
      // Trigger first alert after 3 seconds
      const initialTimer = setTimeout(() => {
        triggerAIRecommendation();
      }, 3000);

      // Repeat loop every 12 seconds
      const interval = setInterval(() => {
        triggerAIRecommendation();
      }, 12000);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(interval);
      };
    }
  }, [view, selectedVehicle, equippedIds]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedVehicleRef = useRef<HTMLDivElement | null>(null);

  // Background particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Cyber Grid Lines
      ctx.strokeStyle = "rgba(47, 143, 239, 0.02)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Particles
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // GSAP: Entry cards animation
  useEffect(() => {
    if (view === "selection") {
      gsap.fromTo(
        ".vehicle-card",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, [view]);

  // Handle vehicle card click - morph transition
  const handleSelectVehicle = (vehicle: VehicleType) => {
    setSelectedVehicle(vehicle);
    setSelectedProductDetails(null);
    setHoveredProduct(null);
    
    const clickedCard = document.getElementById(`card-${vehicle.id}`);
    const otherCards = VEHICLES.filter((v) => v.id !== vehicle.id).map((v) => document.getElementById(`card-${v.id}`));
    const selectionHeader = document.getElementById("selection-header");

    const tl = gsap.timeline({
      onComplete: () => {
        setView("builder");
        // Fade in builder panels
        gsap.fromTo(
          ".builder-panel",
          { opacity: 0, scale: 0.98, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "power2.out" }
        );
      }
    });

    // 1. Slide other elements out of the viewport
    tl.to([selectionHeader, ...otherCards], {
      opacity: 0,
      y: 40,
      duration: 0.45,
      stagger: 0.05,
      ease: "power2.inOut"
    });

    // 2. Animate selected card to full viewport size smoothly
    if (clickedCard) {
      const img = clickedCard.querySelector(".vehicle-img");
      const text = clickedCard.querySelectorAll(".card-text");
      
      tl.to(text, { opacity: 0, y: -15, duration: 0.3, ease: "power2.in" }, "<");
      tl.to(clickedCard, {
        borderColor: "rgba(0, 229, 255, 0.3)",
        backgroundColor: "rgba(2, 6, 23, 0.95)",
        boxShadow: "0 0 50px rgba(0, 229, 255, 0.15)",
        duration: 0.5,
        ease: "power3.inOut"
      }, "-=0.2");
      
      tl.to(img, {
        scale: 1.12,
        y: -10,
        duration: 0.6,
        ease: "power3.inOut"
      }, "<");
    }
  };

  // Reset to vehicle selection screen
  const handleReset = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedVehicle(null);
        setSelectedProductDetails(null);
        setHoveredProduct(null);
        setView("selection");
      }
    });

    tl.to(".builder-panel", {
      opacity: 0,
      scale: 0.98,
      y: 15,
      duration: 0.4,
      ease: "power2.in"
    });
  };

  // Get compatible products for selected vehicle
  const getCompatibleProducts = () => {
    if (!selectedVehicle) return [];
    return PRODUCTS.filter((p) => p.compatibility.includes(selectedVehicle.id));
  };

  const compatibleProducts = getCompatibleProducts();

  // Toggle equipment installation state
  const handleToggleProduct = (product: ProductType) => {
    if (!selectedVehicle || !product.compatibility.includes(selectedVehicle.id)) return;

    const isEquipping = !equippedIds.includes(product.id);

    const vehicleId = selectedVehicle.id;

    setConfigs((prev) => {
      const prevEquipped = prev[vehicleId] || [];
      const updated = !isEquipping
        ? prevEquipped.filter((id) => id !== product.id)
        : [...prevEquipped, product.id];
      
      if (!isEquipping && selectedProductDetails?.id === product.id) {
        setSelectedProductDetails(null);
      } else if (isEquipping) {
        setSelectedProductDetails(product);
      }

      return { ...prev, [vehicleId]: updated };
    });

    if (isEquipping) {
      // Find relevant alert metadata to flash in Copilot HUD
      const ALERTS_CATALOG = [
        { check: "fuel-sensor", title: "Fuel Security Verified", msg: "Capacitive fuel rod reporting 100% tank volume security." },
        { check: "ai-camera", title: "Driver Alertness OK", msg: "AI camera scans confirm active driver attentiveness." },
        { check: "payload-monitoring", title: "Axle Status Balanced", msg: "Axle strain balanced. Predictive scheduling log registered." },
        { check: "tpms", title: "TPMS Pressures OK", msg: "All hubs reporting optimal operational pressures (110 PSI)." },
        { check: "temp-sensor", title: "Cold-chain Stable", msg: "Cargo interior temperature constant at 4.0°C (Stable)." },
        { check: "reverse-parking", title: "Obstacle Warning Active", msg: "Rear sonar active, audible warnings active for docking bay." }
      ];

      const matched = ALERTS_CATALOG.find((a) => a.check === product.id) || {
        title: "Hardware Calibrated",
        msg: `${product.name} link verified by APM AI Copilot.`
      };

      triggerAIRecommendation({
        title: matched.title,
        msg: matched.msg,
        type: "info"
      });
    }

    // Glowing impact flashes
    gsap.fromTo(
      ".metric-glow",
      { textShadow: "0 0 15px rgba(0, 229, 255, 0.7)", scale: 1.04 },
      { textShadow: "0 0 0px rgba(0, 229, 255, 0)", scale: 1, duration: 0.45, ease: "power2.out" }
    );
  };

  // Real-time stats calculations generalized for comparisons
  const getMetricsForVehicle = (v: VehicleType | null, activeEquippedIds: string[]) => {
    if (!v) {
      return {
        uptime: 0,
        fuelWaste: 0,
        safety: 0,
        savings: 0,
        compliance: "Non-Compliant",
        safetyPercent: 0,
        compliancePercent: 0,
        fuelEfficiency: 0,
        maintenanceReduction: 0,
        driverBehaviour: 0,
        vehicleHealth: 0,
        predictiveMaint: 0,
        totalSavings: 0
      };
    }
    
    let uptime = v.baseUptime;
    let fuelWaste = v.baseFuelWaste;
    let safety = v.baseSafetyScore;
    let savings = 0;
    
    let hasAIS140 = false;
    let hasSpeedLimiter = false;
    let hasWeightCompliance = false;

    activeEquippedIds.forEach((id) => {
      const item = PRODUCTS.find((p) => p.id === id);
      if (item) {
        uptime += item.uptimeImpact;
        fuelWaste += item.fuelImpact;
        safety += item.safetyImpact;
        savings += item.savingsImpact;

        if (item.id === "ais-140-gps") hasAIS140 = true;
        if (item.id === "speed-limiter") hasSpeedLimiter = true;
        if (item.id === "payload-monitoring") hasWeightCompliance = true;
      }
    });

    uptime = Math.min(uptime, 99);
    fuelWaste = Math.max(fuelWaste, 4);
    safety = Math.min(safety, 99);

    let compliance = v.baseCompliance;
    if (v.id === "truck") {
      if (hasAIS140 && hasSpeedLimiter && hasWeightCompliance) {
        compliance = "Fully Compliant (AIS-140 + Speed + Load)";
      } else if (hasAIS140 && hasSpeedLimiter) {
        compliance = "Partially Compliant (Missing Weight Sensor)";
      } else if (hasAIS140) {
        compliance = "Basic Compliance (GPS Only)";
      } else {
        compliance = "Non-Compliant (Requires VLT/Speed)";
      }
    } else if (v.id === "bus") {
      if (hasAIS140 && hasSpeedLimiter) {
        compliance = "Fully Compliant (School Bus Code)";
      } else if (hasAIS140) {
        compliance = "Partially Compliant (Missing Speed governor)";
      } else {
        compliance = "Non-Compliant";
      }
    } else if (v.id === "taxi") {
      const hasFare = activeEquippedIds.includes("fare-meter");
      const hasBMS = activeEquippedIds.includes("bms-card");
      if (hasAIS140 && hasFare && hasBMS) {
        compliance = "EV Commercial Compliant";
      } else if (hasAIS140) {
        compliance = "GPS Certified Only";
      } else {
        compliance = "Non-Compliant";
      }
    }

    const baseComplianceVal = v.id === "truck" ? 15 : v.id === "bus" ? 35 : 60;
    const baseFuelEffVal = v.id === "truck" ? 70 : v.id === "bus" ? 75 : 85;

    return {
      uptime,
      fuelWaste,
      safety,
      savings,
      compliance,
      safetyPercent: safety,
      compliancePercent: Math.min(100, baseComplianceVal + 
        (activeEquippedIds.includes("ais-140-gps") ? 40 : 0) + 
        (activeEquippedIds.includes("speed-limiter") ? 20 : 0) + 
        (activeEquippedIds.includes("hsrp") ? 15 : 0) + 
        (activeEquippedIds.includes("reflective-tape") ? 10 : 0) +
        (activeEquippedIds.includes("bms-card") ? 25 : 0)),
      fuelEfficiency: Math.min(99, baseFuelEffVal +
        (activeEquippedIds.includes("fuel-sensor") ? 10 : 0) +
        (activeEquippedIds.includes("speed-limiter") ? 8 : 0) +
        (activeEquippedIds.includes("tpms") ? 4 : 0) +
        (activeEquippedIds.includes("ais-140-gps") ? 3 : 0)),
      maintenanceReduction: Math.min(95, 10 + 
        (activeEquippedIds.includes("payload-monitoring") ? 25 : 0) + 
        (activeEquippedIds.includes("tpms") ? 12 : 0) + 
        (activeEquippedIds.includes("fuel-sensor") ? 10 : 0) + 
        (activeEquippedIds.includes("bms-card") ? 15 : 0) +
        (activeEquippedIds.includes("dc-converter") ? 8 : 0)),
      driverBehaviour: Math.min(99, 65 + 
        (activeEquippedIds.includes("ai-camera") ? 20 : 0) + 
        (activeEquippedIds.includes("speed-limiter") ? 10 : 0) + 
        (activeEquippedIds.includes("ais-140-gps") ? 5 : 0)),
      vehicleHealth: Math.min(99, 75 + 
        (activeEquippedIds.includes("tpms") ? 8 : 0) + 
        (activeEquippedIds.includes("bms-card") ? 10 : 0) + 
        (activeEquippedIds.includes("dc-converter") ? 6 : 0) +
        (activeEquippedIds.includes("payload-monitoring") ? 5 : 0)),
      predictiveMaint: Math.min(95, 20 + 
        (activeEquippedIds.includes("tpms") ? 25 : 0) + 
        (activeEquippedIds.includes("payload-monitoring") ? 20 : 0) + 
        (activeEquippedIds.includes("temp-sensor") ? 15 : 0) + 
        (activeEquippedIds.includes("bms-card") ? 20 : 0)),
      totalSavings: savings
    };
  };

  const metrics = getMetricsForVehicle(selectedVehicle, equippedIds);

  // Lead Form submission handler
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setLeadSubmitError(null);

    const equippedNames = equippedIds
      .map((id) => PRODUCTS.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const vehicleName = selectedVehicle ? selectedVehicle.name : "Custom Vehicle Platform";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: formData.name,
          PhoneNumber: formData.phone,
          Email: formData.email,
          PreferredServices: [vehicleName],
          Message: `Pilot & Live Demo Request for ${vehicleName}.\nCompany: ${formData.company}\nFleet Size: ${formData.size}\nEquipped Systems: ${equippedNames || "None selected"}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err) {
      setLeadSubmitError(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Helper to resolve fleet size
  const getVehiclesCount = () => {
    switch (formData.size) {
      case "1-10": return 5;
      case "11-50": return 30;
      case "51-200": return 125;
      case "200+": return 350;
      default: return 10;
    }
  };
  const vehicles = getVehiclesCount();

  // PDF proposal generator
  const generateProposalPDF = async () => {
    if (typeof window === "undefined" || !selectedVehicle) return;

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. Title Banner
    doc.setFillColor(15, 23, 42); // deep slate background
    doc.rect(0, 0, pageWidth, 42, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("APM FLEET AUTOMATION GROUP", 14, 18);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(6, 182, 212); // cyan
    doc.text("INTERACTIVE DIGITAL TWIN CONFIGURATION", 14, 25);

    // Title Block
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("EXECUTIVE FLEET PROPOSAL", 14, 60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    const dateStr = new Date().toLocaleDateString();
    doc.text(`Prepared for: ${formData.company}  |  Representative: ${formData.name}  |  Date: ${dateStr}`, 14, 68);
    doc.line(14, 72, pageWidth - 14, 72);

    // Section 1: Metadata
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text("1. PLATFORM SUMMARY & METADATA", 14, 82);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text(`Selected Vehicle Platform: ${selectedVehicle.name}`, 14, 90);
    doc.text(`Configured Fleet Count: ${vehicles} Units`, 14, 96);
    doc.text(`Contact Representative: ${formData.name} (${formData.email})`, 14, 102);

    // Installed Solutions Packs
    doc.setFont("helvetica", "bold");
    doc.text("Configured Solutions Pack:", 14, 112);
    doc.setFont("helvetica", "normal");
    let hardwareY = 118;
    equippedIds.forEach((id) => {
      const item = PRODUCTS.find((p) => p.id === id);
      if (item) {
        doc.text(`- [x] ${item.name} (${item.location})`, 18, hardwareY);
        hardwareY += 6;
      }
    });

    // Section 2: Projections
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("2. OPERATIONAL & FINANCIAL IMPACT", 14, hardwareY + 12);
    hardwareY += 20;

    doc.setFont("helvetica", "normal");
    doc.text(`Estimated Annual Savings: Rs. ${metrics.totalSavings.toLocaleString("en-IN")} / year`, 14, hardwareY);
    doc.text(`Target Fleet Safety Index: ${metrics.safetyPercent}%`, 14, hardwareY + 6);
    doc.text(`Fleet Compliance Rating: ${metrics.compliancePercent}% Compliance`, 14, hardwareY + 12);
    doc.text(`Projected Year 1 ROI: ${Math.round((metrics.totalSavings / (vehicles * 68000)) * 100)}%`, 14, hardwareY + 18);
    doc.text(`Fuel Efficiency Level: ${metrics.fuelEfficiency}% Optimal`, 14, hardwareY + 24);
    doc.text(`Maintenance Costs Offset: -${metrics.maintenanceReduction}% Drop`, 14, hardwareY + 30);

    // Section 3: Roadmap
    hardwareY += 42;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("3. IMPLEMENTATION ROADMAP", 14, hardwareY);
    hardwareY += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Phase 1: Pilot Verification (Weeks 1-2)", 14, hardwareY);
    doc.setFont("helvetica", "normal");
    doc.text("Local installation of 1 pilot unit for verification of telemetry streams.", 14, hardwareY + 5);

    doc.setFont("helvetica", "bold");
    doc.text("Phase 2: Full Integration (Weeks 3-4)", 14, hardwareY + 13);
    doc.setFont("helvetica", "normal");
    doc.text("Depot roll-out and wiring for the remaining configured fleet size.", 14, hardwareY + 18);

    doc.setFont("helvetica", "bold");
    doc.text("Phase 3: Telemetry Activation (Week 5)", 14, hardwareY + 26);
    doc.setFont("helvetica", "normal");
    doc.text("VBHAN portal mapping, secure dispatcher training, and ROI tracking online.", 14, hardwareY + 31);

    // Footer
    doc.setDrawColor(226, 232, 240);
    doc.line(14, 280, pageWidth - 14, 280);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("APM IoT Group © 2026. All rights reserved.", 14, 285);
    doc.text("Page 1 of 1", pageWidth - 28, 285);

    doc.save(`APM_Fleet_Proposal_${formData.company.replace(/\\s+/g, "_")}.pdf`);
  };

  // Calculations for selection count and completion percentage
  const equippedCount = equippedIds.length;
  const totalCompatibleCount = compatibleProducts.length;
  const completionPercentage = totalCompatibleCount > 0 
    ? Math.round((equippedCount / totalCompatibleCount) * 100) 
    : 0;

  // Render Product Card Icon helper
  const renderProductIcon = (iconName: string) => {
    const cls = "w-4 h-4";
    switch (iconName) {
      case "navigation": return <Navigation className={cls} />;
      case "tv": return <Tv className={cls} />;
      case "gauge": return <Gauge className={cls} />;
      case "scale": return <Scale className={cls} />;
      case "shield": return <Shield className={cls} />;
      case "activity": return <Activity className={cls} />;
      case "thermometer": return <Thermometer className={cls} />;
      case "zap": return <Zap className={cls} />;
      case "layers": return <Layers className={cls} />;
      case "check-circle": return <CheckCircle2 className={cls} />;
      case "alert-triangle": return <AlertTriangle className={cls} />;
      case "cpu": return <Cpu className={cls} />;
      default: return <Cpu className={cls} />;
    }
  };

  const handleSelectProductFromHotspot = (product: ProductType | null) => {
    setSelectedProductDetails(product);
    if (product) {
      setDisplayedProduct(product);
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setActiveMobileSheet("diagnostics");
      }
    }
  };

  // Determine active detail product
  const activeDetailProduct = hoveredProduct || selectedProductDetails;

  // Details card transition interpolation
  useEffect(() => {
    if (activeDetailProduct !== displayedProduct) {
      setTransitionState("animating");
      const timer = setTimeout(() => {
        setDisplayedProduct(activeDetailProduct);
        setTransitionState("idle");
      }, 150); // small transition delay
      return () => clearTimeout(timer);
    }
  }, [activeDetailProduct, displayedProduct]);

  return (
    <section className="relative min-h-[calc(100vh-80px)] w-full bg-[#020617] text-white flex flex-col items-center justify-center font-sans overflow-hidden select-none py-12 md:py-16 z-10">
      
      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Background Cyber Glow spots */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* --- PHASE 1: VEHICLE SELECTION --- */}
      {view === "selection" && (
        <div className="w-full max-w-7xl px-6 flex flex-col items-center justify-center z-10 relative">
          
          <div id="selection-header" className="text-center mb-12 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/35 bg-cyan-950/40 text-cyan-400 text-xs font-black tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <Cpu className="w-3.5 h-3.5 animate-pulse" /> Platform Selector
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Select Vehicle Platform
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Equip certified telematics, compliance governors, cargo weight sensors, and safety electronics to configure your smart vehicle and model real-time ROI statistics.
            </p>
          </div>

          {/* Selection Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center">
            {VEHICLES.map((vehicle) => (
              <div
                key={vehicle.id}
                id={`card-${vehicle.id}`}
                onClick={() => handleSelectVehicle(vehicle)}
                className="vehicle-card w-full max-w-sm aspect-[3/4.2] group bg-slate-950/45 backdrop-blur-xl border border-white/5 hover:border-cyan-500/40 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:bg-slate-900/50 cursor-pointer overflow-hidden relative [perspective:1000px]"
              >
                
                {/* Glowing border outline overlay */}
                <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/25 rounded-3xl transition-colors duration-500 pointer-events-none z-10" />

                {/* Dark ambient cyan background card highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Active glowing headlights cone effect */}
                <div 
                  className="absolute bottom-1/3 left-[-20%] w-[120%] h-48 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-cyan-400/25 via-cyan-400/5 to-transparent blur-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 scale-y-75 origin-left"
                  style={{ transform: "rotate(-10deg)" }}
                />

                {/* Info Text Top */}
                <div className="card-text z-10 relative">
                  <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                    {vehicle.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {vehicle.name}
                  </h3>
                </div>

                {/* Center Image Container */}
                <div className="relative w-full h-40 flex items-center justify-center z-10">
                  <div className="w-full h-full relative transition-transform duration-700 ease-out group-hover:[transform:rotateY(-15deg)_rotateX(8deg)_scale(1.06)]">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      sizes="30vw"
                      className="object-contain vehicle-img"
                      priority
                    />
                  </div>
                </div>

                {/* Details bottom text info */}
                <div className="card-text space-y-4 z-10 relative">
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {vehicle.desc}
                  </p>

                  <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs">
                    <span className="text-slate-500">APM Compatible Slots</span>
                    <span className="text-cyan-400 font-black px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-850">
                      {PRODUCTS.filter(p => p.compatibility.includes(vehicle.id)).length} Loadouts
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-white/80 group-hover:text-cyan-300 font-bold transition-colors duration-300 pt-1">
                    Configure Platform <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PHASE 2: IMMERSIVE 4-PANEL VEHICLE BUILDER --- */}
      {view === "builder" && selectedVehicle && (
        <div className="w-full max-w-7xl px-4 flex flex-col gap-6 z-10 relative">
          
          {/* Header Panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-4 builder-panel">
            <div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-white mb-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Back to Selection Screen
              </button>
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                {selectedVehicle.name}
                <span className="text-[10px] font-normal px-2.5 py-0.5 rounded-full border border-cyan-500/25 bg-cyan-950/25 text-cyan-400 tracking-wider">
                  Digital Twin Active
                </span>
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Vehicle Platform Switcher */}
              <div className="flex items-center bg-slate-950/80 border border-slate-900 p-1 rounded-xl">
                {VEHICLES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVehicle(v);
                      setSelectedProductDetails(null);
                    }}
                    className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg tracking-wider transition-all ${
                      selectedVehicle.id === v.id
                        ? "bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        : "text-slate-500 hover:text-slate-350"
                    }`}
                  >
                    {v.name.split(" ").slice(-1)[0]}
                  </button>
                ))}
              </div>

              {/* Compare Configurations Trigger */}
              <button
                onClick={() => setShowCompare(true)}
                className="bg-slate-950/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 font-bold py-1.5 px-3.5 rounded-xl text-[9px] uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(0,229,255,0.03)] pointer-events-auto active:scale-95 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Compare Platforms
              </button>
            </div>
          </div>

          {/* Builder Layout Area */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* 1. LEFT PANEL (25%): Call of Duty Loadout Menu */}
            <div className="hidden lg:flex lg:col-span-3 bg-slate-950/45 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex-col shadow-xl builder-panel h-[560px]">
              
              {/* CoD Deck Header */}
              <div className="border-b border-slate-900 pb-3 mb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">
                    Loadout Deck
                  </h3>
                  <span className="text-[10px] font-black uppercase text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-900/40">
                    Equipped: {equippedCount}/{totalCompatibleCount}
                  </span>
                </div>
                
                {/* Progress Bar completion percentage */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase">
                    <span>Build Completion</span>
                    <span className="text-cyan-300 font-black">{completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Product Cards List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2 max-h-[430px]">
                {PRODUCTS.map((product) => {
                  const isCompatible = product.compatibility.includes(selectedVehicle.id);
                  const isEquipped = equippedIds.includes(product.id);
                  
                  return (
                    <div
                      key={product.id}
                      onMouseEnter={() => setHoveredProduct(product)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onClick={() => isCompatible && handleToggleProduct(product)}
                      className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 relative flex items-center justify-between group overflow-hidden ${
                        !isCompatible
                          ? "opacity-35 bg-slate-950/10 border-slate-900 cursor-not-allowed"
                          : isEquipped
                          ? "border-cyan-500/45 bg-cyan-950/10 shadow-[0_0_15px_rgba(6,182,212,0.08)] cursor-pointer hover:border-cyan-400"
                          : "border-slate-850 bg-slate-950/30 cursor-pointer hover:border-slate-700 hover:bg-slate-900/25"
                      }`}
                    >
                      {/* Compact card layout */}
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        
                        {/* Icon Block */}
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          !isCompatible
                            ? "bg-slate-950 text-slate-600 border border-slate-900"
                            : isEquipped
                            ? "bg-cyan-950/70 text-cyan-400 border border-cyan-800/40"
                            : "bg-slate-900 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/20 border border-slate-800"
                        }`}>
                          {!isCompatible ? <Lock className="w-3.5 h-3.5" /> : renderProductIcon(product.iconName)}
                        </div>

                        {/* Text Block */}
                        <div className="min-w-0">
                          <span className="text-[10px] font-black uppercase text-white tracking-wide block truncate group-hover:text-cyan-300 transition-colors">
                            {product.name}
                          </span>
                          <span className="text-[8px] text-slate-500 block truncate leading-none mb-1">
                            {product.benefit}
                          </span>
                          <span className="text-[7px] uppercase font-bold text-slate-500 tracking-wider block">
                            {!isCompatible ? `Locked: ${product.compatLabel}` : "Compatible"}
                          </span>
                        </div>
                      </div>

                      {/* Status Check / Icon */}
                      <div className="shrink-0 pl-2">
                        {!isCompatible ? (
                          <Lock className="w-3 h-3 text-slate-600" />
                        ) : isEquipped ? (
                          <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.2)]">
                            <Check className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                            <Plus className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* 2. CENTER PANEL (50%): Large Interactive 3D Vehicle */}
            <div className="col-span-12 lg:col-span-6 bg-slate-950/45 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center relative shadow-xl builder-panel h-[400px] md:h-[480px] lg:h-[560px] overflow-hidden">
              
              {/* Radial holographic ring shadows */}
              <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-500/5 animate-[orbit-slow_48s_linear_infinite]" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-blue-500/5 border-dashed animate-[orbit-reverse_64s_linear_infinite]" />

              <div className="w-full h-full relative z-10 flex items-center justify-center animate-fade-in">
                <Vehicle3DViewer
                  vehicleId={selectedVehicle.id}
                  equippedIds={equippedIds}
                  products={PRODUCTS}
                  onSelectProduct={handleSelectProductFromHotspot}
                  hoveredProduct={hoveredProduct}
                  setHoveredProduct={setHoveredProduct}
                  selectedProduct={selectedProductDetails}
                />
              </div>

              {/* Floating AI Recommendation Panel */}
              <div className="absolute top-4 right-4 z-20 w-64 md:w-72 flex flex-col gap-2 max-h-[380px] overflow-hidden pointer-events-none">
                
                {/* CSS keyframes for slide-in alerts */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes slideInAlert {
                    0% { opacity: 0; transform: translateX(40px) scale(0.9); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                  }
                  .animate-slide-in {
                    animation: slideInAlert 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                  }
                `}} />

                {/* Simulate Trigger Button */}
                <button
                  onClick={() => triggerAIRecommendation()}
                  className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl px-2.5 py-1 text-[8px] uppercase font-bold tracking-widest text-cyan-400 shadow-lg pointer-events-auto self-end flex items-center gap-1 transition-all duration-300 active:scale-95 mb-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Simulate AI Recommendation
                </button>

                {/* Alerts list container */}
                <div className="space-y-2 overflow-y-auto pr-1">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`animate-slide-in p-3 rounded-2xl border backdrop-blur-2xl shadow-xl flex items-start gap-3 pointer-events-auto transition-all ${
                        alert.type === "danger"
                          ? "bg-rose-950/45 border-rose-500/40 shadow-rose-950/35 hover:border-rose-450"
                          : alert.type === "warning"
                          ? "bg-amber-950/45 border-amber-500/40 shadow-amber-950/35 hover:border-amber-450"
                          : "bg-slate-950/65 border-emerald-500/40 shadow-emerald-950/35 hover:border-emerald-450"
                      }`}
                    >
                      {/* Left icon marker */}
                      <div className={`p-2 rounded-xl shrink-0 ${
                        alert.type === "danger"
                          ? "bg-rose-950/70 text-rose-400 border border-rose-900/40"
                          : alert.type === "warning"
                          ? "bg-amber-950/70 text-amber-400 border border-amber-900/40"
                          : "bg-emerald-950/70 text-emerald-400 border border-emerald-900/40"
                      }`}>
                        {alert.type === "danger" && <ShieldAlert className="w-4 h-4 animate-bounce" />}
                        {alert.type === "warning" && <AlertTriangle className="w-4 h-4" />}
                        {alert.type === "info" && <CheckCircle2 className="w-4 h-4" />}
                      </div>

                      {/* Text details */}
                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-black uppercase tracking-wide text-white block">
                            {alert.title}
                          </span>
                          <span className="text-[7px] text-slate-500 font-mono">Just Now</span>
                        </div>
                        <p className="text-[9.5px] text-slate-350 leading-normal mt-1">
                          {alert.msg}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interaction Tip */}
              <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none">
                <span className="text-[9px] text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  Interactive Digital Twin telemetry online
                </span>
              </div>

              {/* Mobile Drawer Trigger Buttons */}
              <div className="lg:hidden absolute bottom-3 left-0 w-full flex items-center justify-center gap-3 px-4 z-20 pointer-events-auto">
                <button
                  onClick={() => setActiveMobileSheet("loadout")}
                  className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl px-3 py-2 text-[8px] md:text-[9px] uppercase font-black tracking-widest text-cyan-400 shadow-xl flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  📂 Loadout Deck ({equippedCount})
                </button>
                <button
                  onClick={() => {
                    if (!displayedProduct) {
                      const compatible = PRODUCTS.find((p) => p.compatibility.includes(selectedVehicle.id));
                      if (compatible) {
                        setDisplayedProduct(compatible);
                        setSelectedProductDetails(compatible);
                      }
                    }
                    setActiveMobileSheet("diagnostics");
                  }}
                  className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl px-3 py-2 text-[8px] md:text-[9px] uppercase font-black tracking-widest text-cyan-400 shadow-xl flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  📊 Diagnostics Stream
                </button>
              </div>
            </div>

            {/* 3. RIGHT PANEL (25%): Live Product Details */}
            <div className="hidden lg:flex lg:col-span-3 bg-slate-950/45 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex-col shadow-xl builder-panel h-[560px] overflow-hidden">
              <div className="h-full flex flex-col justify-between">
                
                {/* Details Header */}
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 border-b border-slate-900 pb-2">
                  <Info className="w-3.5 h-3.5 text-cyan-400" /> Diagnostics Stream
                </h3>

                {/* Card Smooth Swapping Transition wrapper */}
                <div className="flex-1 flex flex-col justify-between mt-3 overflow-y-auto pr-1">
                  <div className={`flex-1 flex flex-col justify-between transition-all duration-300 ${
                    transitionState === "animating" ? "opacity-0 scale-95 translate-y-3" : "opacity-100 scale-100 translate-y-0"
                  }`}>
                    {displayedProduct ? (
                      <div className="space-y-4">
                        
                        {/* Deployment Status Indicator Badge */}
                        <div className="flex items-center justify-between border-b border-slate-900/50 pb-2">
                          <span className="text-[9px] uppercase font-bold text-slate-500">System Link</span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            !displayedProduct.compatibility.includes(selectedVehicle.id)
                              ? "bg-rose-950/40 text-rose-400 border border-rose-900/30"
                              : equippedIds.includes(displayedProduct.id)
                              ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/30 animate-pulse"
                              : "bg-slate-900 text-slate-400 border border-slate-800"
                          }`}>
                            {!displayedProduct.compatibility.includes(selectedVehicle.id)
                              ? "Incompatible / Locked"
                              : equippedIds.includes(displayedProduct.id)
                              ? "Active / Connected"
                              : "Available / Standby"}
                          </span>
                        </div>

                        {/* Centered Image with Cyber Grid */}
                        <div className="relative w-full h-24 flex items-center justify-center bg-slate-950/80 border border-slate-900 rounded-2xl overflow-hidden p-2 shadow-inner group">
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                          <div className="relative w-20 h-20 transition-transform duration-500 group-hover:scale-105">
                            <Image
                              src={displayedProduct.image}
                              alt={displayedProduct.name}
                              fill
                              sizes="150px"
                              className="object-contain p-1 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.15)]"
                            />
                          </div>
                        </div>

                        {/* Title & Overview */}
                        <div>
                          <h4 className="text-sm font-black text-white">{displayedProduct.name}</h4>
                          <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider block mt-0.5">
                            {displayedProduct.compliance}
                          </span>
                          <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                            {displayedProduct.desc}
                          </p>
                        </div>

                        {/* Installation Location & Time details */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                          <div className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[8px] text-slate-500 block">Fitment Area</span>
                              <span className="text-[9px] text-slate-300 block truncate">{displayedProduct.location}</span>
                            </div>
                          </div>
                          <div className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[8px] text-slate-500 block">Fitment Time</span>
                              <span className="text-[9px] text-slate-300 block truncate">{displayedProduct.installTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* How it Works */}
                        <div className="space-y-1.5 bg-slate-900/25 border border-slate-900 p-3 rounded-2xl">
                          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block flex items-center gap-1">
                            <HelpCircle className="w-3 h-3 text-cyan-400" /> Operational Loop
                          </span>
                          <p className="text-[10px] text-slate-400 leading-normal">
                            {displayedProduct.howItWorks}
                          </p>
                        </div>

                        {/* Specifications */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block border-b border-slate-900/50 pb-1">
                            Technical Specifications
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                            {displayedProduct.specs.map((spec, sIdx) => (
                              <div key={sIdx} className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl">
                                <span className="text-[7px] uppercase font-bold text-slate-500 block truncate">{spec.label}</span>
                                <span className="text-[9px] text-slate-300 block truncate">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Business Benefits */}
                        <div className="space-y-1.5">
                          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block border-b border-slate-900/50 pb-1 flex items-center gap-1">
                            <Award className="w-3 h-3 text-emerald-400" /> Fleet Business Outcomes
                          </span>
                          <ul className="space-y-1 text-[10px] text-slate-400 list-disc list-inside leading-normal font-bold">
                            {displayedProduct.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="truncate text-emerald-400/90">{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Industries & Compatible Platforms */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold border-t border-slate-900/50 pt-2.5">
                          <div>
                            <span className="text-[8px] text-slate-500 uppercase block flex items-center gap-0.5">
                              <Briefcase className="w-2.5 h-2.5 text-cyan-400" /> Vertical Sectors
                            </span>
                            <span className="text-[9px] text-slate-300 block truncate mt-0.5">
                              {displayedProduct.industries.join(", ")}
                            </span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 uppercase block flex items-center gap-0.5">
                              <Truck className="w-2.5 h-2.5 text-cyan-400" /> Compatibility
                            </span>
                            <span className="text-[9px] text-slate-300 block truncate mt-0.5">
                              {displayedProduct.compatLabel}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Business Simulator */}
                        <ProductSimulator product={displayedProduct} />
                      </div>
                    ) : (
                      // Default Status Console Screen
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-3">
                        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-cyan-950/30 border border-cyan-500/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Device Log Inactive</h4>
                          <p className="text-[10px] text-slate-500 mt-1.5 leading-relaxed max-w-[180px] mx-auto">
                            Select or hover over a product in the Loadout Deck to stream real-time specifications and engineering logs.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>

            {/* 4. BOTTOM PANEL (Full width): Vehicle Intelligence Dashboard */}
            <div
              className="col-span-12 lg:col-span-12 flex overflow-x-auto snap-x lg:grid lg:grid-cols-8 gap-4 builder-panel scrollbar-none snap-mandatory pb-3 lg:pb-0 z-10 relative"
            >
              
              {/* Inline style block for ECG animation */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes heartbeat {
                  0% { stroke-dashoffset: 80; }
                  100% { stroke-dashoffset: 0; }
                }
              `}} />

              {/* Stat 1: Fleet Safety (Circular Progress) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="min-w-0">
                  <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Fleet Safety</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-base font-black text-white">
                      <AnimatedCounter value={metrics.safetyPercent} />
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">%</span>
                  </div>
                  <span className="inline-flex text-[6.5px] font-black uppercase text-emerald-400 bg-emerald-950/40 px-1 rounded mt-1 border border-emerald-900/30">
                    +{(equippedIds.length * 2)}% Alert
                  </span>
                </div>
                <div className="shrink-0 relative flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 40 40" className="transform -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="16" 
                      fill="none" 
                      stroke="#00E5FF" 
                      strokeWidth="2.5" 
                      strokeDasharray="100.5" 
                      strokeDashoffset={100.5 - (metrics.safetyPercent / 100) * 100.5}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat 2: Compliance Level (Circular Progress) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="min-w-0">
                  <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Compliance</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-base font-black text-white">
                      <AnimatedCounter value={metrics.compliancePercent} />
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">%</span>
                  </div>
                  <span className="inline-flex text-[6.5px] font-black uppercase text-cyan-400 bg-cyan-950/40 px-1 rounded mt-1 border border-cyan-900/30">
                    {metrics.compliancePercent === 100 ? "Certified" : "Audit Pending"}
                  </span>
                </div>
                <div className="shrink-0 relative flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 40 40" className="transform -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="16" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="2.5" 
                      strokeDasharray="100.5" 
                      strokeDashoffset={100.5 - (metrics.compliancePercent / 100) * 100.5}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat 3: Fuel Efficiency (Semi-circular Gauge) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="min-w-0">
                  <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Fuel Economy</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-base font-black text-white">
                      <AnimatedCounter value={metrics.fuelEfficiency} />
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">%</span>
                  </div>
                  <span className="text-[6.5px] font-black uppercase text-emerald-400 block mt-1">
                    -{metrics.fuelWaste}% Idle Waste
                  </span>
                </div>
                <div className="shrink-0 flex items-center justify-center">
                  <svg width="40" height="24" viewBox="0 0 40 24" className="relative overflow-visible">
                    <path d="M 4 22 A 16 16 0 0 1 36 22" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 4 22 A 16 16 0 0 1 36 22" fill="none" stroke="#00e5ff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="50.2" strokeDashoffset={50.2 - (metrics.fuelEfficiency / 100) * 50.2} className="transition-all duration-700 ease-out" />
                    <line x1="20" y1="22" x2="20" y2="8" stroke="#ef4444" strokeWidth="1.75" strokeLinecap="round" style={{ transform: `rotate(${(metrics.fuelEfficiency / 100) * 180 - 90}deg)`, transformOrigin: "20px 22px" }} className="transition-transform duration-700 ease-out" />
                  </svg>
                </div>
              </div>

              {/* Stat 4: Maintenance Reduction (Mini line-chart sparkline) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Maintenance Index</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-base font-black text-white">
                      -<AnimatedCounter value={metrics.maintenanceReduction} />
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">% Cost</span>
                  </div>
                  <span className="text-[6.5px] font-black uppercase text-emerald-400 block mt-1">
                    Wear Decelerated
                  </span>
                </div>
                <div className="shrink-0">
                  <svg width="40" height="24" viewBox="0 0 50 30" className="opacity-90">
                    <path d={`M 5 25 L 18 20 L 32 ${25 - (metrics.maintenanceReduction / 100) * 10} L 45 ${25 - (metrics.maintenanceReduction / 100) * 15}`} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="transition-all duration-700 ease-out" />
                    <path d={`M 5 25 L 18 20 L 32 ${25 - (metrics.maintenanceReduction / 100) * 10} L 45 ${25 - (metrics.maintenanceReduction / 100) * 15} L 45 28 L 5 28 Z`} fill="rgba(239, 68, 68, 0.08)" />
                  </svg>
                </div>
              </div>

              {/* Stat 5: Driver Behaviour (Circular progress) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="min-w-0">
                  <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Driver Behavior</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-base font-black text-white">
                      <AnimatedCounter value={metrics.driverBehaviour} />
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">/100</span>
                  </div>
                  <span className="inline-flex text-[6.5px] font-black uppercase text-emerald-400 bg-emerald-950/40 px-1 rounded mt-1 border border-emerald-900/30">
                    Active ADAS
                  </span>
                </div>
                <div className="shrink-0 relative flex items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 40 40" className="transform -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#0f172a" strokeWidth="2.5" />
                    <circle 
                      cx="20" 
                      cy="20" 
                      r="16" 
                      fill="none" 
                      stroke="#a855f7" 
                      strokeWidth="2.5" 
                      strokeDasharray="100.5" 
                      strokeDashoffset={100.5 - (metrics.driverBehaviour / 100) * 100.5}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Stat 6: Vehicle Health (ECG animation) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex items-center justify-between gap-3 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Vehicle Health</span>
                  <div className="flex items-baseline gap-0.5 mt-0.5">
                    <span className="text-base font-black text-white">
                      <AnimatedCounter value={metrics.vehicleHealth} />
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">%</span>
                  </div>
                  <span className="text-[6.5px] font-black uppercase text-emerald-450 block mt-1">
                    System Telemetry OK
                  </span>
                </div>
                <div className="shrink-0">
                  <svg width="45" height="24" viewBox="0 0 55 30" className="opacity-95">
                    <path 
                      d="M 5 15 L 15 15 L 20 5 L 25 25 L 30 12 L 35 18 L 40 15 L 50 15" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="2" 
                      strokeDasharray="80"
                      strokeDashoffset="0"
                      className="animate-[heartbeat_2s_linear_infinite]"
                      style={{ strokeDasharray: 80 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Stat 7: Predictive Maintenance (Horizontal bar) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-slate-950/65 backdrop-blur-xl border border-white/5 p-3 rounded-2xl flex flex-col justify-between gap-2 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="flex justify-between items-start gap-1">
                  <div className="min-w-0">
                    <span className="text-[7.5px] uppercase font-bold text-slate-500 block truncate">Predictive Maint</span>
                    <span className="text-[10px] font-black text-white block mt-0.5">
                      Service in: <AnimatedCounter value={Math.round(180 - (metrics.predictiveMaint * 1.5))} /> Days
                    </span>
                  </div>
                  <span className="text-[8px] font-black uppercase text-cyan-400 font-mono shrink-0">
                    {metrics.predictiveMaint}% Acc
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-700" 
                    style={{ width: `${metrics.predictiveMaint}%` }}
                  />
                </div>
              </div>

              {/* Stat 8: Estimated Savings (Pulsing currency ticker) */}
              <div className="w-[200px] shrink-0 snap-center lg:w-auto lg:shrink bg-gradient-to-br from-cyan-950/30 via-slate-950/40 to-blue-950/30 border border-cyan-500/25 p-3 rounded-2xl flex flex-col justify-between gap-2 shadow-lg hover:border-cyan-400/40 transition-all duration-300 group">
                <div className="flex justify-between items-start">
                  <span className="text-[7.5px] uppercase font-black text-cyan-400 tracking-wider">PROJECTED ROI</span>
                  <div className="text-cyan-400">
                    <MoneyIcon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[11px] font-black text-slate-300">₹</span>
                    <span className="text-base font-black text-white tracking-tight">
                      <AnimatedCounter value={metrics.totalSavings} />
                    </span>
                    <span className="text-[8px] text-slate-500 font-bold">/ yr</span>
                  </div>
                  <span className="text-[6.5px] font-black uppercase text-emerald-400 block">
                    +₹{Math.round(metrics.totalSavings / 12).toLocaleString("en-IN")} / mo Saved
                  </span>
                </div>
              </div>

            </div>

            {/* LEAD LOCK-IN DIALOG or EXECUTIVE PROPOSAL SUMMARY */}
            <div className="lg:col-span-12 mt-2 builder-panel">
              {!submitted ? (
                <div className="bg-slate-950/50 backdrop-blur-2xl border border-slate-900 rounded-3xl p-6 md:p-8 grid md:grid-cols-12 gap-8 shadow-xl items-center relative overflow-hidden animate-fade-in">
                  
                  <div className="md:col-span-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Lock-in Configuration</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white">
                      Request Custom Fleet Pilot & Live Demo
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      We supply 30-day proof-of-concept hardware packages for regional operators. Select your hardware configuration above, enter your fleet details, and our safety engineers will schedule a local technical layout consultation.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {equippedIds.map((id) => {
                        const item = PRODUCTS.find((p) => p.id === id);
                        if (!item) return null;
                        return (
                          <span key={id} className="inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                            <Check className="w-2.5 h-2.5 text-cyan-400" /> {item.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:col-span-6">
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      {leadSubmitError && (
                        <div className="p-2.5 bg-red-950/60 border border-red-500/30 rounded-xl text-red-300 text-[11px]">
                          {leadSubmitError}
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-cyan-500/40 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Company Name</label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Logistics Corp"
                            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-cyan-500/40 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Corporate Email</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@fleet.com"
                            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-cyan-500/40 focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Fleet Size</label>
                          <select
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-cyan-500/40 focus:outline-none transition-colors text-white"
                          >
                            <option value="1-10">1-10 Vehicles</option>
                            <option value="11-50">11-50 Vehicles</option>
                            <option value="51-200">51-200 Vehicles</option>
                            <option value="200+">200+ Vehicles</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 99000 12345"
                          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-cyan-500/40 focus:outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingLead}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/20 active:scale-98 transition-all disabled:opacity-50"
                      >
                        {isSubmittingLead ? "Submitting Request..." : (
                          <>
                            Lock Config & Request Pilot Kit <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-950/80 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_50px_rgba(0,229,255,0.08)] relative overflow-hidden animate-fade-in text-left">
                  
                  {/* Cyber Grid background decoration */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

                  {/* Header Title */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-850 pb-4 gap-4 relative z-10">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-950/40 text-emerald-400 text-[10px] font-black tracking-widest uppercase mb-2 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Proposal Generated Successfully
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-white">
                        Executive Fleet Modernization Summary
                      </h3>
                      <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">
                        Customized for: <span className="text-cyan-400 font-black">{formData.company}</span> &nbsp;|&nbsp; Representative: <span className="text-slate-350">{formData.name}</span>
                      </p>
                    </div>

                    <div className="flex gap-3 shrink-0">
                      <button
                        onClick={generateProposalPDF}
                        className="bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-950/30 transition-all active:scale-95 border border-cyan-500/20"
                      >
                        Download PDF Proposal
                      </button>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setConfigs((prev) => ({ ...prev, [selectedVehicle.id]: [] }));
                        }}
                        className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold py-2 px-4 rounded-xl text-xs transition-all"
                      >
                        Reset Configuration
                      </button>
                    </div>
                  </div>

                  {/* Key Metrics Display */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
                    
                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Annual Savings</span>
                      <div className="text-lg font-black text-cyan-400 mt-1">
                        <AnimatedCounter prefix="₹" value={metrics.totalSavings} />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Safety Score</span>
                      <div className="text-lg font-black text-emerald-400 mt-1">
                        <AnimatedCounter value={metrics.safetyPercent} suffix="%" />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Compliance</span>
                      <div className="text-lg font-black text-white mt-1">
                        <AnimatedCounter value={metrics.compliancePercent} suffix="%" />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Projected ROI</span>
                      <div className="text-lg font-black text-cyan-400 mt-1">
                        <AnimatedCounter value={Math.round((metrics.totalSavings / (vehicles * 68000)) * 100)} suffix="%" />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Fuel Savings</span>
                      <div className="text-lg font-black text-emerald-400 mt-1">
                        -<AnimatedCounter value={Math.round(metrics.totalSavings * 0.35)} suffix="/yr" prefix="₹" />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Maint. Cost</span>
                      <div className="text-lg font-black text-white mt-1">
                        -<AnimatedCounter value={metrics.maintenanceReduction} suffix="%" />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Fleet Efficiency</span>
                      <div className="text-lg font-black text-cyan-400 mt-1">
                        +<AnimatedCounter value={Math.round(equippedIds.length * 4.5)} suffix="%" />
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-3 rounded-2xl text-center">
                      <span className="text-[7.5px] uppercase font-bold text-slate-500 block">Payback Period</span>
                      <div className="text-lg font-black text-emerald-400 mt-1">
                        <span className="font-mono font-black text-emerald-400">
                          {metrics.totalSavings > 0 
                            ? (Math.min(12, Math.max(1, Math.round(((vehicles * 68000) / (metrics.totalSavings / 12)) * 10) / 10))) 
                            : 0}
                        </span>
                        <span className="text-[9px] text-slate-500 font-bold"> Mo</span>
                      </div>
                    </div>

                  </div>

                  {/* Body Content Section */}
                  <div className="grid md:grid-cols-12 gap-6 relative z-10">
                    
                    {/* Selected Products list */}
                    <div className="md:col-span-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl space-y-3">
                      <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-850 pb-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-400" /> Configured Hardware Solutions Pack
                      </h4>
                      <div className="space-y-2 overflow-y-auto max-h-[180px] pr-1">
                        {equippedIds.map((id) => {
                          const item = PRODUCTS.find((p) => p.id === id);
                          if (!item) return null;
                          return (
                            <div key={id} className="flex items-center justify-between bg-slate-950/40 border border-slate-900 px-3 py-1.5 rounded-xl">
                              <span className="text-[10px] font-bold text-slate-200">{item.name}</span>
                              <span className="text-[8px] text-slate-500 font-mono italic">{item.location}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Narrative Business Impact */}
                    <div className="md:col-span-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl space-y-3">
                      <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-850 pb-2 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-cyan-400" /> Projected Business Outcomes
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Deploying this integrated hardware configuration will reduce overall operational expenditures by approximately <span className="text-emerald-400 font-bold">{metrics.maintenanceReduction}%</span> in maintenance offsets, eliminate idling fuel waste, and yield an estimated annual return of <span className="text-cyan-400 font-bold">₹{metrics.totalSavings.toLocaleString("en-IN")}</span>. This deployment locks in regulatory legal compliance with CDAC and AIS-140 mandates, resolving regional fine structures.
                      </p>
                    </div>

                    {/* Timeline roadmap */}
                    <div className="md:col-span-4 bg-slate-900/30 border border-slate-850 p-4 rounded-2xl space-y-3">
                      <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-850 pb-2 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" /> Deployment Implementation Roadmap
                      </h4>
                      <div className="space-y-3 text-[10px] text-slate-400 leading-normal">
                        <div className="flex gap-2">
                          <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 text-[8px] font-bold shrink-0 mt-0.5">1</div>
                          <div>
                            <span className="font-bold text-slate-200 block">Weeks 1-2: Pilot Installation</span>
                            Mounting telemetry units in 1 pilot transporter for validation.
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 text-[8px] font-bold shrink-0 mt-0.5">2</div>
                          <div>
                            <span className="font-bold text-slate-200 block">Weeks 3-4: Depot Roll-out</span>
                            Wiring and calibrating payload gauges, speed cutoffs across the remaining fleet.
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 text-[8px] font-bold shrink-0 mt-0.5">3</div>
                          <div>
                            <span className="font-bold text-slate-200 block">Week 5: RTO VAHAN Portal Mapping</span>
                            Portal keys syncing and operator training finalized.
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- COMPARISON MODAL MATRIX --- */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in text-left">
          
          <div
            className="relative w-full max-w-5xl bg-slate-950/80 border border-cyan-500/20 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-[0_0_60px_rgba(0,229,255,0.12)] max-h-[90vh] overflow-y-auto z-50 pointer-events-auto"
          >
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">Compare Configured Platforms</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Cross-Platform Telemetry Matrix</p>
              </div>
              <button
                onClick={() => setShowCompare(false)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl px-3 py-1.5 transition-colors border border-slate-800 text-xs font-bold"
              >
                ✕ Close Matrix
              </button>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {VEHICLES.map((v) => {
                const activeEquipped = configs[v.id] || [];
                const vMetrics = getMetricsForVehicle(v, activeEquipped);

                return (
                  <div 
                    key={v.id}
                    className={`bg-slate-900/25 border rounded-2xl p-5 flex flex-col justify-between gap-5 relative overflow-hidden transition-all duration-300 ${
                      selectedVehicle?.id === v.id 
                        ? "border-cyan-500/35 bg-cyan-950/5 shadow-[0_0_20px_rgba(6,182,212,0.06)]"
                        : "border-slate-850 hover:border-slate-700"
                    }`}
                  >
                    
                    {/* Header */}
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">{v.name}</h4>
                        <span className="text-[8px] font-black uppercase text-cyan-400 bg-cyan-950/65 px-2 py-0.5 rounded border border-cyan-900/40">
                          {activeEquipped.length} Equipped
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-0.5">{v.tagline}</p>
                    </div>

                    {/* Metrics list */}
                    <div className="space-y-2 border-y border-slate-900/60 py-3 text-[10px]">
                      
                      <div className="flex justify-between">
                        <span className="text-slate-500">Safety Index</span>
                        <span className="font-bold text-emerald-400">{vMetrics.safetyPercent}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Compliance</span>
                        <span className="font-bold text-white max-w-[120px] text-right truncate text-xs" title={vMetrics.compliance}>{vMetrics.compliance}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Annual Savings</span>
                        <span className="font-black text-cyan-400">₹{vMetrics.totalSavings.toLocaleString("en-IN")}/yr</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Projected ROI</span>
                        <span className="font-bold text-cyan-400">
                          {vMetrics.totalSavings > 0 
                            ? `${Math.round((vMetrics.totalSavings / (5 * 68000)) * 100)}%` 
                            : "0%"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Fuel Efficiency</span>
                        <span className="font-bold text-emerald-400">{vMetrics.fuelEfficiency}%</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-slate-500">Maintenance Cuts</span>
                        <span className="font-bold text-white">-{vMetrics.maintenanceReduction}%</span>
                      </div>

                    </div>

                    {/* Equipped Products List */}
                    <div>
                      <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold block mb-2">Equipped Hardware</span>
                      {activeEquipped.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
                          {activeEquipped.map((id) => {
                            const item = PRODUCTS.find((p) => p.id === id);
                            if (!item) return null;
                            return (
                              <span key={id} className="text-[8px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-slate-300">
                                {item.name}
                              </span>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-[9px] italic text-slate-500">No hardware equipped. Default template pack active.</span>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        setSelectedVehicle(v);
                        setSelectedProductDetails(null);
                        setShowCompare(false);
                      }}
                      className={`w-full py-2 rounded-xl text-[9px] uppercase font-black tracking-widest transition-all ${
                        selectedVehicle?.id === v.id
                          ? "bg-cyan-950 text-cyan-400 border border-cyan-800/40 cursor-default"
                          : "bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 active:scale-95"
                      }`}
                    >
                      {selectedVehicle?.id === v.id ? "Actively Editing" : "Load Configurator"}
                    </button>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* --- MOBILE DRAWERS BOTTOM SHEETS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpDrawer {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpDrawer 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      {/* 1. MOBILE LOADOUT DRAWER */}
      {selectedVehicle && activeMobileSheet === "loadout" && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="w-full max-h-[80vh] bg-slate-950/95 border-t border-slate-800 rounded-t-3xl p-5 shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-slide-up">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-3">
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Loadout Deck</h3>
                <span className="text-[8px] font-bold text-slate-500 uppercase">Equipped: {equippedCount}/{totalCompatibleCount}</span>
              </div>
              <button
                onClick={() => setActiveMobileSheet("none")}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-bold border border-slate-850"
              >
                ✕ Close
              </button>
            </div>

            {/* Build Completion */}
            <div className="space-y-1 mb-4">
              <div className="flex items-center justify-between text-[9px] text-slate-500 font-bold uppercase">
                <span>Build Completion</span>
                <span className="text-cyan-300 font-black">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Loadout cards */}
            <div className="flex-1 overflow-y-auto space-y-2 pb-6 pr-1">
              {PRODUCTS.map((product) => {
                const isCompatible = product.compatibility.includes(selectedVehicle.id);
                const isEquipped = equippedIds.includes(product.id);
                
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      if (isCompatible) {
                        handleToggleProduct(product);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 relative flex items-center justify-between group overflow-hidden ${
                      !isCompatible
                        ? "opacity-35 bg-slate-950/10 border-slate-900"
                        : isEquipped
                        ? "border-cyan-500/45 bg-cyan-950/10 shadow-[0_0_15px_rgba(6,182,212,0.08)] cursor-pointer"
                        : "border-slate-850 bg-slate-950/30 cursor-pointer"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        !isCompatible
                          ? "bg-slate-950 text-slate-600 border border-slate-900"
                          : isEquipped
                          ? "bg-cyan-950/70 text-cyan-400 border border-cyan-800/40"
                          : "bg-slate-900 text-slate-400 border border-slate-800"
                      }`}>
                        {!isCompatible ? <Lock className="w-3.5 h-3.5" /> : renderProductIcon(product.iconName)}
                      </div>

                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase text-white tracking-wide block truncate">
                          {product.name}
                        </span>
                        <span className="text-[8px] text-slate-500 block truncate leading-none mb-1">
                          {product.benefit}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      {!isCompatible ? (
                        <Lock className="w-3 h-3 text-slate-600" />
                      ) : isEquipped ? (
                        <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                          <Plus className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* 2. MOBILE DIAGNOSTICS DRAWER */}
      {selectedVehicle && activeMobileSheet === "diagnostics" && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end justify-center bg-slate-950/80 backdrop-blur-sm animate-fade-in text-left">
          <div className="w-full h-[85vh] bg-slate-950/95 border-t border-slate-800 rounded-t-3xl p-5 shadow-2xl flex flex-col pointer-events-auto overflow-hidden animate-slide-up">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-cyan-400" /> Diagnostics Stream
              </h3>
              <button
                onClick={() => setActiveMobileSheet("none")}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-bold border border-slate-850"
              >
                ✕ Close
              </button>
            </div>

            {/* Readout Body */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-12 pr-1">
              {displayedProduct ? (
                <div className="space-y-4">
                  
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between border-b border-slate-900/50 pb-2">
                    <span className="text-[9px] uppercase font-bold text-slate-500">System Link</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      !displayedProduct.compatibility.includes(selectedVehicle.id)
                        ? "bg-rose-950/40 text-rose-400 border border-rose-900/30"
                        : equippedIds.includes(displayedProduct.id)
                        ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/30"
                        : "bg-slate-900 text-slate-400 border border-slate-850"
                    }`}>
                      {!displayedProduct.compatibility.includes(selectedVehicle.id)
                        ? "Incompatible"
                        : equippedIds.includes(displayedProduct.id)
                        ? "Active / Connected"
                        : "Standby"}
                    </span>
                  </div>

                  {/* Image Grid */}
                  <div className="relative w-full h-24 flex items-center justify-center bg-slate-950/80 border border-slate-900 rounded-2xl overflow-hidden p-2 shadow-inner">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                    <div className="relative w-20 h-20">
                      <Image
                        src={displayedProduct.image}
                        alt={displayedProduct.name}
                        fill
                        sizes="150px"
                        className="object-contain p-1 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.15)]"
                      />
                    </div>
                  </div>

                  {/* Title & Overview */}
                  <div>
                    <h4 className="text-sm font-black text-white">{displayedProduct.name}</h4>
                    <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider block mt-0.5">
                      {displayedProduct.compliance}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                      {displayedProduct.desc}
                    </p>
                  </div>

                  {/* Fitment Parameters */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <div className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[8px] text-slate-500 block">Fitment Area</span>
                        <span className="text-[9px] text-slate-300 block truncate">{displayedProduct.location}</span>
                      </div>
                    </div>
                    <div className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[8px] text-slate-500 block">Fitment Time</span>
                        <span className="text-[9px] text-slate-300 block truncate">{displayedProduct.installTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* How it Works */}
                  <div className="space-y-1.5 bg-slate-900/25 border border-slate-900 p-3 rounded-2xl">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-cyan-400" /> Operational Loop
                    </span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      {displayedProduct.howItWorks}
                    </p>
                  </div>

                  {/* Specs */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block border-b border-slate-900/50 pb-1">
                      Technical Specifications
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                      {displayedProduct.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="bg-slate-900/40 border border-slate-850 p-2 rounded-xl">
                          <span className="text-[7px] uppercase font-bold text-slate-500 block truncate">{spec.label}</span>
                          <span className="text-[9px] text-slate-300 block truncate">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block border-b border-slate-900/50 pb-1 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" /> Fleet Business Outcomes
                    </span>
                    <ul className="space-y-1 text-[10px] text-slate-400 list-disc list-inside leading-normal font-bold">
                      {displayedProduct.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="truncate text-emerald-400/90">{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Calculator accordion */}
                  <div className="border-t border-slate-900 pt-3">
                    <ProductSimulator product={displayedProduct} />
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
                  <Activity className="w-8 h-8 text-cyan-400 animate-pulse mb-3" />
                  <span>Select hardware loadout to stream stats.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
