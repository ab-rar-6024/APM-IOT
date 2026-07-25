"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { Activity, RotateCcw } from "lucide-react";

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
  anchors: Record<string, { x: number; y: number }>;
}

interface Vehicle3DViewerProps {
  vehicleId: string;
  equippedIds: string[];
  products: ProductType[];
  onSelectProduct: (product: ProductType | null) => void;
  hoveredProduct: ProductType | null;
  setHoveredProduct: (product: ProductType | null) => void;
  selectedProduct: ProductType | null;
}

// 3D coordinates for product attachments [x, y, z] per vehicle type
const ATTACHMENT_COORDS: Record<string, Record<string, [number, number, number]>> = {
  truck: {
    "ais-140-gps": [0.65, 0.42, 0.2], // Dashboard
    "ai-camera": [0.75, 0.62, 0],    // Windshield
    "fuel-sensor": [0.1, -0.32, -0.45], // Fuel tank
    "payload-monitoring": [-0.65, -0.32, 0], // Rear Axle
    "speed-limiter": [1.1, 0.15, 0],  // Engine bay
    "tpms": [0.7, -0.32, 0.45],       // Front wheel center
    "temp-sensor": [-0.6, 0.45, 0],   // Cargo inside
    "auto-dipper": [1.2, 0.35, 0.15], // Front grille
    "reverse-parking": [-1.6, -0.22, 0], // Rear bumper
    "reflective-tape": [-1.55, 0.3, 0.4], // Rear outline
    "hsrp": [1.25, -0.22, 0],         // Front plate
    "panic-button": [0.65, 0.32, -0.2] // Cabin console
  },
  bus: {
    "ais-140-gps": [1.05, 0.32, 0.2],
    "ai-camera": [1.15, 0.48, 0],
    "fuel-sensor": [0.0, -0.42, -0.45],
    "speed-limiter": [1.45, 0.08, 0],
    "tpms": [0.95, -0.42, 0.45],
    "auto-dipper": [1.55, 0.18, 0.2],
    "reverse-parking": [-1.6, -0.32, 0],
    "reflective-tape": [-1.58, 0.35, 0.4],
    "hsrp": [1.6, -0.32, 0],
    "panic-button": [1.05, 0.22, -0.2]
  },
  taxi: {
    "ais-140-gps": [0.25, 0.22, 0.15],
    "ai-camera": [0.32, 0.35, 0],
    "tpms": [0.68, -0.32, 0.45],
    "reverse-parking": [-1.02, -0.22, 0],
    "bms-card": [0, -0.38, 0],        // Battery pack under center
    "dc-converter": [0.75, -0.15, 0], // Front motor compartment
    "fare-meter": [0.25, 0.16, -0.1], // Console screen
    "panic-button": [0.25, 0.12, 0.15],
    "hsrp": [0.98, -0.25, 0]
  },
  "mining-truck": {
    "ais-140-gps": [0.65, 0.42, 0.2],
    "ai-camera": [0.75, 0.62, 0],
    "fuel-sensor": [0.1, -0.32, -0.45],
    "payload-monitoring": [-0.65, -0.32, 0],
    "speed-limiter": [1.1, 0.15, 0],
    "tpms": [0.7, -0.32, 0.45],
    "auto-dipper": [1.2, 0.35, 0.15],
    "reverse-parking": [-1.6, -0.22, 0],
    "reflective-tape": [-1.55, 0.3, 0.4],
    "hsrp": [1.25, -0.22, 0],
    "panic-button": [0.65, 0.32, -0.2]
  },
  "construction-vehicle": {
    "ais-140-gps": [0.65, 0.42, 0.2],
    "ai-camera": [0.75, 0.62, 0],
    "fuel-sensor": [0.1, -0.32, -0.45],
    "payload-monitoring": [-0.65, -0.32, 0],
    "speed-limiter": [1.1, 0.15, 0],
    "tpms": [0.7, -0.32, 0.45],
    "auto-dipper": [1.2, 0.35, 0.15],
    "reverse-parking": [-1.6, -0.22, 0],
    "reflective-tape": [-1.55, 0.3, 0.4],
    "hsrp": [1.25, -0.22, 0],
    "panic-button": [0.65, 0.32, -0.2]
  },
  "passenger-vehicle": {
    "ais-140-gps": [0.25, 0.22, 0.15],
    "ai-camera": [0.32, 0.35, 0],
    "tpms": [0.68, -0.32, 0.45],
    "auto-dipper": [0.85, -0.05, 0.2],
    "reverse-parking": [-1.02, -0.22, 0],
    "panic-button": [0.25, 0.12, 0.15],
    "hsrp": [0.98, -0.25, 0]
  },
  "industrial-vehicle": {
    "ais-140-gps": [0.65, 0.42, 0.2],
    "ai-camera": [0.75, 0.62, 0],
    "fuel-sensor": [0.1, -0.32, -0.45],
    "speed-limiter": [1.1, 0.15, 0],
    "tpms": [0.7, -0.32, 0.45],
    "temp-sensor": [-0.6, 0.45, 0],
    "auto-dipper": [1.2, 0.35, 0.15],
    "reverse-parking": [-1.6, -0.22, 0],
    "reflective-tape": [-1.55, 0.3, 0.4],
    "hsrp": [1.25, -0.22, 0],
    "panic-button": [0.65, 0.32, -0.2]
  }
};

// Camera look-at positions [x, y, z] to focus on when a product is clicked
const CAMERA_ZOOM_TARGETS: Record<string, [number, number, number]> = {
  "ais-140-gps": [0.65, 0.42, 0.2],
  "ai-camera": [0.75, 0.62, 0],
  "fuel-sensor": [0.1, -0.32, -0.45],
  "payload-monitoring": [-0.65, -0.32, 0],
  "speed-limiter": [1.1, 0.15, 0],
  "tpms": [0.7, -0.32, 0.45],
  "temp-sensor": [-0.6, 0.45, 0],
  "auto-dipper": [1.2, 0.35, 0.15],
  "reverse-parking": [-1.6, -0.22, 0],
  "reflective-tape": [-1.55, 0.3, 0.4],
  "hsrp": [1.25, -0.22, 0],
  "panic-button": [0.65, 0.32, -0.2],
  "bms-card": [0, -0.38, 0],
  "dc-converter": [0.75, -0.15, 0],
  "fare-meter": [0.25, 0.16, -0.1],
  default: [0, 0.1, 0]
};

// Interactive camera controller inside R3F Canvas
function CameraController({
  zoomTarget,
  isZoomed
}: {
  zoomTarget: [number, number, number];
  isZoomed: boolean;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Targets are updated smoothly using linear interpolation inside requestAnimationFrame loop
  useFrame(() => {
    const targetVec = new THREE.Vector3(...zoomTarget);
    
    // Smoothly glide controls look-at target
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetVec, 0.08);
    }

    // Glide camera positions
    if (isZoomed) {
      // Zoomed-in position close to the target
      const idealCamPos = new THREE.Vector3(zoomTarget[0] + 1.2, zoomTarget[1] + 0.6, zoomTarget[2] + 1.2);
      camera.position.lerp(idealCamPos, 0.08);
    } else {
      // Default orbital viewport position
      const idealCamPos = new THREE.Vector3(3.2, 1.8, 3.8);
      camera.position.lerp(idealCamPos, 0.04);
    }

    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 + 0.1}
      minDistance={1.5}
      maxDistance={8}
    />
  );
}

// Glowing Pulse hotspot component
function Hotspot3D({
  position,
  active,
  onClick,
  onPointerOver,
  onPointerOut
}: {
  position: [number, number, number];
  active: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Pulsing scale factor
      const scale = (active ? 1.3 : 1.0) + Math.sin(time * 6) * 0.18;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
        onPointerOver();
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        onPointerOut();
      }}
    >
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial
        color={active ? "#00E5FF" : "#3b82f6"}
        transparent
        opacity={active ? 0.95 : 0.4}
        toneMapped={false}
      />
    </mesh>
  );
}

// 3D Installed Product Mesh components (GPS, Camera, etc.)
function ProductModel3D({
  productId,
  position,
  equipped
}: {
  productId: string;
  position: [number, number, number];
  equipped: boolean;
}) {
  const meshRef = useRef<THREE.Group | null>(null);

  // Animate pop-in scale assembly when equipped changes
  useEffect(() => {
    if (meshRef.current) {
      if (equipped) {
        gsap.fromTo(
          meshRef.current.scale,
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.8)" }
        );
      } else {
        gsap.to(meshRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.45, ease: "power2.in" });
      }
    }
  }, [equipped]);

  return (
    <group ref={meshRef} position={position} scale={[0, 0, 0]}>
      {/* 1. Core Telematics (AIS-140 GPS) - small flat box with flashing blue light */}
      {productId === "ais-140-gps" && (
        <mesh>
          <boxGeometry args={[0.12, 0.04, 0.08]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
          {/* LED blinker */}
          <mesh position={[0.04, 0.025, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
        </mesh>
      )}

      {/* 2. AI dashcam - windshield camera */}
      {productId === "ai-camera" && (
        <group rotation={[0.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.05, 0.08, 0.05]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          {/* Lens */}
          <mesh position={[0, -0.015, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.01, 8]} />
            <meshBasicMaterial color="#020617" />
          </mesh>
          {/* Status light */}
          <mesh position={[0.015, 0.02, 0.026]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color="#22c55e" />
          </mesh>
        </group>
      )}

      {/* 3. Fuel Level Sensor */}
      {productId === "fuel-sensor" && (
        <group>
          {/* Tank container cap */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.03, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>
          {/* Sensor probe extending into fuel tank */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.2, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}

      {/* 4. Axle Leaf Weight Payload Monitoring */}
      {productId === "payload-monitoring" && (
        <mesh>
          <boxGeometry args={[0.3, 0.04, 0.15]} />
          <meshBasicMaterial color="#00e5ff" wireframe />
        </mesh>
      )}

      {/* 5. Speed Limiter inside engine bay */}
      {productId === "speed-limiter" && (
        <mesh>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>
      )}

      {/* 6. TPMS glowing hubs on wheels */}
      {productId === "tpms" && (
        <mesh>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#f59e0b" toneMapped={false} />
        </mesh>
      )}

      {/* 7. Temperature Sensor cold chain log */}
      {productId === "temp-sensor" && (
        <group>
          <mesh>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#38bdf8" />
          </mesh>
          {/* Wire probe */}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.15, 6]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>
      )}

      {/* 8. Auto Dipper forward grille sensor */}
      {productId === "auto-dipper" && (
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.08]} />
          <meshStandardMaterial color="#020617" />
          {/* Lens */}
          <mesh position={[0, 0, 0.045]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#3b82f6" />
          </mesh>
        </mesh>
      )}

      {/* 9. Reverse Sonar Parking Sensor */}
      {productId === "reverse-parking" && (
        <mesh>
          <boxGeometry args={[0.2, 0.03, 0.03]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      )}

      {/* 10. Reflective Tape outline strip */}
      {productId === "reflective-tape" && (
        <mesh>
          <boxGeometry args={[0.01, 0.02, 0.76]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      )}

      {/* 11. HSRP Government Number Plate */}
      {productId === "hsrp" && (
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.01, 0.08, 0.28]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} />
        </mesh>
      )}

      {/* 12. SOS Panic Button */}
      {productId === "panic-button" && (
        <group>
          {/* Box housing */}
          <mesh>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          {/* Red button */}
          <mesh position={[0, 0.025, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.015, 10]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      )}

      {/* 13. BMS Card */}
      {productId === "bms-card" && (
        <mesh>
          <boxGeometry args={[0.18, 0.02, 0.12]} />
          <meshBasicMaterial color="#22c55e" wireframe />
        </mesh>
      )}

      {/* 14. DC to DC Converter */}
      {productId === "dc-converter" && (
        <group>
          <mesh>
            <boxGeometry args={[0.14, 0.06, 0.1]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
          {/* Heatsink rails */}
          <mesh position={[0, 0.035, 0]}>
            <boxGeometry args={[0.12, 0.01, 0.08]} />
            <meshBasicMaterial color="#ef4444" wireframe />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Glowing energy charge that travels along connection cables when equipped
function EnergyPulse({
  start,
  end
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const pulseRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (pulseRef.current) {
      const time = state.clock.getElapsedTime();
      const progress = (time * 1.4) % 1.0; // cycle travel every ~0.7s
      
      pulseRef.current.position.set(
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress,
        start[2] + (end[2] - start[2]) * progress
      );
    }
  });

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.016, 8, 8]} />
      <meshBasicMaterial color="#00E5FF" toneMapped={false} />
    </mesh>
  );
}

// PROGRAMMATIC CYBERNETIC 3D VEHICLE STRUCTURES
function CyberVehicleScene({
  vehicleId,
  equippedIds,
  products,
  onSelectProduct,
  hoveredProduct,
  setHoveredProduct,
  onHotspotClick
}: {
  vehicleId: string;
  equippedIds: string[];
  products: ProductType[];
  onSelectProduct: (product: ProductType) => void;
  hoveredProduct: ProductType | null;
  setHoveredProduct: (product: ProductType | null) => void;
  onHotspotClick: (prodId: string) => void;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  
  // References for headlights basic materials to flare/glow on loadout installs
  const leftLightRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const rightLightRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const lightsIntensityRef = useRef(1.0);

  // Trigger flash on loadout changes
  useEffect(() => {
    lightsIntensityRef.current = 4.8; // trigger full flash
  }, [equippedIds.length]);

  // Slow auto-rotation drift and dynamic headlight flare decay
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.07;
    }

    // Decay the light flash intensity back to standard
    lightsIntensityRef.current = THREE.MathUtils.lerp(lightsIntensityRef.current, 1.0, 0.05);

    // Standard heartbeat headlight pulse
    const basePulse = 1.0 + Math.sin(state.clock.getElapsedTime() * 4) * 0.15;
    const opacityVal = Math.min(1.0, 0.45 * lightsIntensityRef.current * basePulse);

    if (leftLightRef.current) leftLightRef.current.opacity = opacityVal;
    if (rightLightRef.current) rightLightRef.current.opacity = opacityVal;
  });

  const coords = ATTACHMENT_COORDS[vehicleId] || {};

  return (
    <group ref={groupRef}>
      
      {/* Lights & Shadows */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#00e5ff" />
      <pointLight position={[5, -2, 5]} intensity={0.4} color="#3b82f6" />

      {/* --- PROGRAMMATIC CYBER VEHICLE MESH --- */}
      <group position={[0, 0.1, 0]}>
        
        {/* 1. Heavy Cargo Transporter */}
        {vehicleId === "truck" && (
          <group>
            {/* Chassis main metal frame */}
            <mesh position={[-0.1, -0.15, 0]}>
              <boxGeometry args={[3.2, 0.15, 0.8]} />
              <meshPhysicalMaterial color="#334155" roughness={0.35} metalness={0.9} />
            </mesh>
            
            {/* Cab assembly front cabin */}
            <mesh position={[1.0, 0.35, 0]}>
              <boxGeometry args={[0.9, 0.8, 0.85]} />
              <meshPhysicalMaterial color="#0f172a" roughness={0.15} metalness={0.8} transparent opacity={0.6} transmission={0.5} />
            </mesh>

            {/* Cab Windshield Glass */}
            <mesh position={[1.46, 0.45, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.02, 0.5, 0.8]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            {/* Glowing Headlights */}
            <mesh position={[1.46, 0.05, 0.3]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[1.46, 0.05, -0.3]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {/* Fuel Tank Cylinder */}
            <mesh position={[0.1, -0.28, -0.45]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.18, 0.18, 0.6, 16]} />
              <meshPhysicalMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Heavy Cargo Bed Container Box */}
            <mesh position={[-0.7, 0.5, 0]}>
              <boxGeometry args={[2.0, 1.1, 0.86]} />
              <meshPhysicalMaterial color="#1e293b" roughness={0.2} metalness={0.6} transparent opacity={0.6} />
            </mesh>
            {/* Outline wireframe for container */}
            <mesh position={[-0.7, 0.5, 0]}>
              <boxGeometry args={[2.02, 1.12, 0.88]} />
              <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.15} />
            </mesh>

            {/* Heavy Dually Wheels (6 cylinders) */}
            <mesh position={[1.0, -0.32, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[1.0, -0.32, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>

            <mesh position={[-0.4, -0.32, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.18, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[-0.4, -0.32, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.18, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>

            <mesh position={[-0.9, -0.32, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.18, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[-0.9, -0.32, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.18, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
          </group>
        )}

        {/* 2. Smart Transit School Bus */}
        {vehicleId === "bus" && (
          <group>
            {/* Main School Bus cage box */}
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[3.2, 0.9, 0.82]} />
              <meshPhysicalMaterial color="#eab308" roughness={0.15} metalness={0.4} transparent opacity={0.65} />
            </mesh>

            {/* Cyber neon wireframe accent */}
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[3.22, 0.92, 0.84]} />
              <meshBasicMaterial color="#eab308" wireframe transparent opacity={0.15} />
            </mesh>

            {/* Front slanted cockpit glass */}
            <mesh position={[1.5, 0.32, 0]} rotation={[0, 0, -0.25]}>
              <boxGeometry args={[0.02, 0.5, 0.8]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.45} roughness={0} />
            </mesh>

            {/* Glowing Headlights */}
            <mesh position={[1.6, -0.15, 0.25]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[1.6, -0.15, -0.25]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {/* Side window glass compartments */}
            <mesh position={[-0.1, 0.38, 0.415]}>
              <boxGeometry args={[2.0, 0.2, 0.01]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>
            <mesh position={[-0.1, 0.38, -0.415]}>
              <boxGeometry args={[2.0, 0.2, 0.01]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            {/* Wheels */}
            <mesh position={[1.0, -0.32, 0.43]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[1.0, -0.32, -0.43]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[-0.9, -0.32, 0.43]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[-0.9, -0.32, -0.43]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
          </group>
        )}

        {/* 3. Electric Urban Cruiser Taxi */}
        {vehicleId === "taxi" && (
          <group>
            {/* Low chassis frame */}
            <mesh position={[0, -0.22, 0]}>
              <boxGeometry args={[2.0, 0.08, 0.8]} />
              <meshPhysicalMaterial color="#334155" roughness={0.4} metalness={0.8} />
            </mesh>
            
            {/* Main passenger cockpit cabin */}
            <mesh position={[-0.1, 0.05, 0]}>
              <boxGeometry args={[1.1, 0.48, 0.78]} />
              <meshPhysicalMaterial color="#d97706" roughness={0.15} metalness={0.3} transparent opacity={0.65} />
            </mesh>

            {/* Front hood block */}
            <mesh position={[0.62, -0.1, 0]}>
              <boxGeometry args={[0.5, 0.24, 0.78]} />
              <meshPhysicalMaterial color="#d97706" roughness={0.15} metalness={0.3} transparent opacity={0.7} />
            </mesh>

            {/* Windshield */}
            <mesh position={[0.42, 0.18, 0]} rotation={[0, 0, -0.55]}>
              <boxGeometry args={[0.02, 0.4, 0.76]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            {/* Glowing Headlights */}
            <mesh position={[0.88, -0.12, 0.25]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[0.88, -0.12, -0.25]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {/* EV Battery Tray Underneath */}
            <mesh position={[0, -0.32, 0]}>
              <boxGeometry args={[0.9, 0.1, 0.6]} />
              <meshPhysicalMaterial color="#06b6d4" transparent opacity={0.25} wireframe />
            </mesh>

            {/* Wheels */}
            <mesh position={[0.62, -0.28, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[0.62, -0.28, -0.42]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[-0.62, -0.28, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
            <mesh position={[-0.62, -0.28, -0.42]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 16]} />
              <meshStandardMaterial color="#090d16" roughness={0.9} />
            </mesh>
          </group>
        )}

        {/* 4. Mining Haul Dump Truck */}
        {vehicleId === "mining-truck" && (
          <group>
            {/* Heavy-duty chassis frame */}
            <mesh position={[-0.1, -0.2, 0]}>
              <boxGeometry args={[3.4, 0.2, 0.95]} />
              <meshPhysicalMaterial color="#3f3f46" roughness={0.4} metalness={0.9} />
            </mesh>

            {/* Rugged cab assembly */}
            <mesh position={[1.15, 0.3, 0]}>
              <boxGeometry args={[0.85, 0.7, 0.95]} />
              <meshPhysicalMaterial color="#0f172a" roughness={0.2} metalness={0.75} transparent opacity={0.6} transmission={0.4} />
            </mesh>

            {/* Windshield */}
            <mesh position={[1.58, 0.4, 0]} rotation={[0, 0, -0.18]}>
              <boxGeometry args={[0.02, 0.42, 0.9]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            {/* Glowing Headlights */}
            <mesh position={[1.58, 0, 0.35]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[1.58, 0, -0.35]}>
              <sphereGeometry args={[0.045, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {/* Fuel Tank Cylinder */}
            <mesh position={[0.1, -0.32, -0.5]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.65, 16]} />
              <meshPhysicalMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Angled dump bed (raised at rear) */}
            <mesh position={[-0.8, 0.55, 0]} rotation={[0, 0, 0.08]}>
              <boxGeometry args={[2.1, 0.9, 0.95]} />
              <meshPhysicalMaterial color="#78350f" roughness={0.35} metalness={0.55} transparent opacity={0.65} />
            </mesh>
            <mesh position={[-0.8, 0.55, 0]} rotation={[0, 0, 0.08]}>
              <boxGeometry args={[2.12, 0.92, 0.97]} />
              <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.18} />
            </mesh>

            {/* Oversized off-road wheels (6) */}
            {([[1.1, 0.5], [1.1, -0.5], [-0.3, 0.5], [-0.3, -0.5], [-1.1, 0.5], [-1.1, -0.5]] as [number, number][]).map(([px, pz], i) => (
              <mesh key={i} position={[px, -0.42, pz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.34, 0.34, 0.2, 16]} />
                <meshStandardMaterial color="#090d16" roughness={0.9} />
              </mesh>
            ))}
          </group>
        )}

        {/* 5. Construction Site Hauler */}
        {vehicleId === "construction-vehicle" && (
          <group>
            <mesh position={[-0.1, -0.16, 0]}>
              <boxGeometry args={[3.0, 0.16, 0.85]} />
              <meshPhysicalMaterial color="#334155" roughness={0.35} metalness={0.85} />
            </mesh>

            <mesh position={[1.05, 0.32, 0]}>
              <boxGeometry args={[0.8, 0.72, 0.85]} />
              <meshPhysicalMaterial color="#0f172a" roughness={0.15} metalness={0.8} transparent opacity={0.6} transmission={0.5} />
            </mesh>

            <mesh position={[1.46, 0.42, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.02, 0.45, 0.8]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            <mesh position={[1.46, 0.05, 0.3]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[1.46, 0.05, -0.3]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {/* Open flatbed deck */}
            <mesh position={[-0.6, 0.02, 0]}>
              <boxGeometry args={[1.9, 0.06, 0.85]} />
              <meshPhysicalMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
            </mesh>

            {/* Aggregate load pile (wireframe boulders) */}
            {([[-0.9, 0.18, 0.15], [-0.6, 0.22, -0.1], [-0.35, 0.16, 0.1], [-0.7, 0.15, -0.25]] as [number, number, number][]).map(([px, py, pz], i) => (
              <mesh key={i} position={[px, py, pz]}>
                <dodecahedronGeometry args={[0.16, 0]} />
                <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.4} />
              </mesh>
            ))}

            <mesh position={[0.1, -0.28, -0.4]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.16, 0.16, 0.55, 16]} />
              <meshPhysicalMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {([[1.0, 0.4], [1.0, -0.4], [-0.85, 0.4], [-0.85, -0.4]] as [number, number][]).map(([px, pz], i) => (
              <mesh key={i} position={[px, -0.3, pz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
                <meshStandardMaterial color="#090d16" roughness={0.9} />
              </mesh>
            ))}
          </group>
        )}

        {/* 6. Executive Passenger Sedan */}
        {vehicleId === "passenger-vehicle" && (
          <group>
            <mesh position={[0, -0.24, 0]}>
              <boxGeometry args={[1.9, 0.06, 0.76]} />
              <meshPhysicalMaterial color="#334155" roughness={0.4} metalness={0.8} />
            </mesh>

            {/* Cabin greenhouse */}
            <mesh position={[-0.15, 0.02, 0]}>
              <boxGeometry args={[1.0, 0.4, 0.74]} />
              <meshPhysicalMaterial color="#94a3b8" roughness={0.12} metalness={0.4} transparent opacity={0.68} />
            </mesh>

            {/* Front hood */}
            <mesh position={[0.6, -0.12, 0]}>
              <boxGeometry args={[0.45, 0.2, 0.74]} />
              <meshPhysicalMaterial color="#94a3b8" roughness={0.12} metalness={0.4} transparent opacity={0.7} />
            </mesh>

            {/* Windshield */}
            <mesh position={[0.4, 0.14, 0]} rotation={[0, 0, -0.55]}>
              <boxGeometry args={[0.02, 0.36, 0.72]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            {/* Glowing Headlights */}
            <mesh position={[0.84, -0.14, 0.24]}>
              <sphereGeometry args={[0.032, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[0.84, -0.14, -0.24]}>
              <sphereGeometry args={[0.032, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {([[0.6, 0.4], [0.6, -0.4], [-0.6, 0.4], [-0.6, -0.4]] as [number, number][]).map(([px, pz], i) => (
              <mesh key={i} position={[px, -0.3, pz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.13, 16]} />
                <meshStandardMaterial color="#090d16" roughness={0.9} />
              </mesh>
            ))}
          </group>
        )}

        {/* 7. Industrial Utility Carrier */}
        {vehicleId === "industrial-vehicle" && (
          <group>
            <mesh position={[-0.05, -0.18, 0]}>
              <boxGeometry args={[2.5, 0.16, 0.82]} />
              <meshPhysicalMaterial color="#475569" roughness={0.4} metalness={0.85} />
            </mesh>

            <mesh position={[0.85, 0.22, 0]}>
              <boxGeometry args={[0.7, 0.55, 0.82]} />
              <meshPhysicalMaterial color="#0f172a" roughness={0.2} metalness={0.75} transparent opacity={0.6} transmission={0.4} />
            </mesh>

            <mesh position={[1.2, 0.3, 0]} rotation={[0, 0, -0.22]}>
              <boxGeometry args={[0.02, 0.34, 0.78]} />
              <meshPhysicalMaterial color="#00f0ff" transparent opacity={0.4} roughness={0} />
            </mesh>

            <mesh position={[1.2, 0, 0.28]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial ref={leftLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>
            <mesh position={[1.2, 0, -0.28]}>
              <sphereGeometry args={[0.035, 16, 16]} />
              <meshBasicMaterial ref={rightLightRef} color="#00ffff" transparent opacity={0.5} toneMapped={false} />
            </mesh>

            {/* Utility flatbed deck with equipment crate */}
            <mesh position={[-0.55, -0.02, 0]}>
              <boxGeometry args={[1.5, 0.06, 0.82]} />
              <meshPhysicalMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[-0.55, 0.16, 0]}>
              <boxGeometry args={[0.55, 0.32, 0.6]} />
              <meshBasicMaterial color="#fb923c" wireframe transparent opacity={0.35} />
            </mesh>

            <mesh position={[0.15, -0.3, -0.38]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.14, 0.14, 0.5, 16]} />
              <meshPhysicalMaterial color="#64748b" metalness={0.8} roughness={0.2} />
            </mesh>

            {([[0.85, 0.38], [0.85, -0.38], [-0.7, 0.38], [-0.7, -0.38]] as [number, number][]).map(([px, pz], i) => (
              <mesh key={i} position={[px, -0.3, pz]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.22, 0.22, 0.15, 16]} />
                <meshStandardMaterial color="#090d16" roughness={0.9} />
              </mesh>
            ))}
          </group>
        )}

      </group>

      {/* --- DYNAMIC PRODUCTS & CONNECTORS MESHES --- */}
      {products.map((product) => {
        const isCompatible = product.compatibility.includes(vehicleId);
        if (!isCompatible) return null;

        const isEquipped = equippedIds.includes(product.id);
        const coord = coords[product.id];
        if (!coord) return null;

        const isHovered = hoveredProduct?.id === product.id;

        return (
          <group key={`models-${product.id}`}>
            {/* Installed physical item inside R3F space */}
            <ProductModel3D
              productId={product.id}
              position={coord}
              equipped={isEquipped}
            />

            {/* Glowing Hotspot anchor circle */}
            <Hotspot3D
              position={coord}
              active={isEquipped || isHovered}
              onClick={() => {
                onSelectProduct(product);
                onHotspotClick(product.id);
              }}
              onPointerOver={() => setHoveredProduct(product)}
              onPointerOut={() => setHoveredProduct(null)}
            />

            {/* Connecting lines growing from center chassis [0, 0.1, 0] to the hotspot */}
            {isEquipped && (
              <group>
                <Line
                  points={[
                    [0, 0.1, 0], // Center origin
                    coord       // Hotspot coordinate
                  ]}
                  color="#00E5FF"
                  lineWidth={isHovered ? 2.5 : 1}
                  transparent
                  opacity={isHovered ? 0.95 : 0.35}
                  toneMapped={false}
                />
                <EnergyPulse start={[0, 0.1, 0]} end={coord} />
              </group>
            )}
          </group>
        );
      })}

    </group>
  );
}

// Wrapper with mounted-guard to prevent server side Next hydration issues
export default function Vehicle3DViewer({
  vehicleId,
  equippedIds,
  products,
  onSelectProduct,
  hoveredProduct,
  setHoveredProduct,
  selectedProduct
}: Vehicle3DViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [zoomTarget, setZoomTarget] = useState<[number, number, number]>([0, 0.1, 0]);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Zoom camera smoothly whenever selected product changes
  useEffect(() => {
    if (selectedProduct) {
      const coord = ATTACHMENT_COORDS[vehicleId]?.[selectedProduct.id];
      if (coord) {
        setZoomTarget(coord);
        setIsZoomed(true);
      }
    } else {
      setZoomTarget([0, 0.1, 0]);
      setIsZoomed(false);
    }
  }, [selectedProduct, vehicleId]);

  // Hotspot Click triggers camera glides
  const handleHotspotClick = (prodId: string) => {
    const coord = ATTACHMENT_COORDS[vehicleId]?.[prodId];
    if (coord) {
      // Toggle zoom if already looking at it
      if (isZoomed && zoomTarget[0] === coord[0] && zoomTarget[1] === coord[1] && zoomTarget[2] === coord[2]) {
        setZoomTarget([0, 0.1, 0]);
        setIsZoomed(false);
      } else {
        setZoomTarget(coord);
        setIsZoomed(true);
      }
    }
  };

  // Reset zoom on clicking canvas background
  const handleResetZoom = () => {
    setZoomTarget([0, 0.1, 0]);
    setIsZoomed(false);
  };

  if (!mounted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-3">
        <Activity className="w-8 h-8 text-cyan-400 animate-spin" />
        <span className="text-xs uppercase font-bold tracking-widest">Initializing 3D Twin...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      
      {/* 3D R3F Canvas */}
      <Canvas 
        onPointerDown={(e) => {
          // If clicked the background canvas directly (not a hotspot mesh), reset camera zoom
          if (e.target === e.currentTarget) {
            handleResetZoom();
          }
        }}
        shadows
        className="w-full h-full bg-transparent"
        camera={{ position: [3.2, 1.8, 3.8], fov: 42 }}
      >
        <CyberVehicleScene
          vehicleId={vehicleId}
          equippedIds={equippedIds}
          products={products}
          onSelectProduct={onSelectProduct}
          hoveredProduct={hoveredProduct}
          setHoveredProduct={setHoveredProduct}
          onHotspotClick={handleHotspotClick}
        />
        <CameraController
          zoomTarget={zoomTarget}
          isZoomed={isZoomed}
        />
      </Canvas>

      {/* Floating HUD Camera Reset button when zoomed */}
      {isZoomed && (
        <button
          onClick={handleResetZoom}
          className="absolute bottom-5 right-5 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400 rounded-xl px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest text-cyan-400 shadow-lg flex items-center gap-1.5 transition-all duration-350 z-20 animate-fade-in"
        >
          <RotateCcw className="w-3 h-3" /> Reset Camera View
        </button>
      )}

    </div>
  );
}
