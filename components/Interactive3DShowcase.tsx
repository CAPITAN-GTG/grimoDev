"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";

function Laptop() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Base / Keyboard */}
      <RoundedBox args={[3, 0.15, 2]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Trackpad */}
      <RoundedBox args={[0.8, 0.01, 0.5]} radius={0.02} position={[0, 0.08, 0.4]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.3} />
      </RoundedBox>

      {/* Keyboard area */}
      <RoundedBox args={[2.4, 0.01, 0.8]} radius={0.02} position={[0, 0.08, -0.25]}>
        <meshStandardMaterial color="#252525" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* Screen (lid) — tilted back */}
      <group position={[0, 1.15, -0.95]} rotation={[-0.25, 0, 0]}>
        {/* Screen frame */}
        <RoundedBox args={[3, 2, 0.08]} radius={0.04}>
          <meshStandardMaterial
            color="#111111"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Screen display */}
        <mesh position={[0, 0.05, 0.045]}>
          <planeGeometry args={[2.7, 1.7]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive="#0a0a2e"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Code lines on screen */}
        <CodeOnScreen />
      </group>
    </group>
  );
}

function CodeOnScreen() {
  const codeLines = [
    { text: "const grimodev = {", color: "#c792ea", x: -1.1 },
    { text: '  name: "Grimo Dev",', color: "#82aaff", x: -0.95 },
    { text: "  services: [", color: "#c3e88d", x: -0.95 },
    { text: '    "Websites",', color: "#f78c6c", x: -0.8 },
    { text: '    "Mobile Apps",', color: "#f78c6c", x: -0.8 },
    { text: '    "SEO & GEO",', color: "#f78c6c", x: -0.8 },
    { text: "  ],", color: "#c3e88d", x: -0.95 },
    { text: "  deliver: () =>", color: "#89ddff", x: -0.95 },
    { text: '    "Excellence"', color: "#c3e88d", x: -0.8 },
    { text: "};", color: "#c792ea", x: -1.1 },
  ];

  return (
    <group position={[0, 0.05, 0.06]}>
      {codeLines.map((line, i) => (
        <Text
          key={i}
          position={[line.x, 0.65 - i * 0.155, 0]}
          fontSize={0.09}
          color={line.color}
          anchorX="left"
          anchorY="middle"
          font="/fonts/JetBrainsMono-Regular.ttf"
          characters={'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:!?-_()[]{}\"\'=></ '}
        >
          {line.text}
        </Text>
      ))}
    </group>
  );
}

function FloatingIcon({
  position,
  color,
  label,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial
            color={color}
            metalness={0.3}
            roughness={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function FloatingCodeBrackets() {
  const leftRef = useRef<THREE.Group>(null);
  const rightRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftRef.current) {
      leftRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      leftRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    }
    if (rightRef.current) {
      rightRef.current.position.y = Math.sin(t * 0.8 + Math.PI) * 0.15;
      rightRef.current.rotation.z = Math.sin(t * 0.5 + Math.PI) * 0.1;
    }
  });

  return (
    <>
      <group ref={leftRef} position={[-2.5, 1, 0.5]}>
        <Text fontSize={0.6} color="#fef3c7" anchorX="center" anchorY="middle">
          {"<"}
        </Text>
      </group>
      <group ref={rightRef} position={[2.5, 1, 0.5]}>
        <Text fontSize={0.6} color="#fef3c7" anchorX="center" anchorY="middle">
          {"/>"}
        </Text>
      </group>
    </>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#fef3c7" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight
        position={[-3, 3, -3]}
        intensity={0.3}
        color="#fef3c7"
      />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#89ddff" />

      <Laptop />

      <FloatingIcon
        position={[-2.2, 1.8, -0.5]}
        color="#82aaff"
        label="Web"
        speed={1.2}
      />
      <FloatingIcon
        position={[2.2, 1.5, -0.3]}
        color="#c3e88d"
        label="Mobile"
        speed={0.8}
      />
      <FloatingIcon
        position={[2.5, -0.3, 1]}
        color="#f78c6c"
        label="SEO"
        speed={1.0}
      />
      <FloatingIcon
        position={[-2.4, -0.2, 0.8]}
        color="#c792ea"
        label="GEO"
        speed={0.9}
      />

      <FloatingCodeBrackets />
      <ParticleField />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-yellow-200 border-t-transparent rounded-full animate-spin" />
        <span className="text-white/60 text-sm tracking-widest uppercase font-normal">
          Loading 3D Scene...
        </span>
      </div>
    </div>
  );
}

export default function Interactive3DShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="showcase" className="py-20 md:py-28 bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: "url(/pattern8.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center space-x-3 border border-white/20 px-5 sm:px-6 py-1.5 sm:py-2 text-white/70 text-xs sm:text-sm font-normal tracking-widest mb-5 sm:mb-6 backdrop-blur-sm">
            <span>INTERACTIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-white mb-4 sm:mb-6 tracking-tight">
            EXPLORE OUR CRAFT
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto tracking-wide leading-relaxed font-normal px-4">
            Drag to interact with our digital workspace. We bring ideas to life
            with modern web technologies.
          </p>
        </div>

        <div
          className={`relative w-full aspect-[16/10] md:aspect-[16/9] max-w-4xl mx-auto rounded-2xl overflow-hidden border transition-all duration-500 ${
            isHovered
              ? "border-yellow-200/40 shadow-[0_0_60px_rgba(254,243,199,0.15)]"
              : "border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 pointer-events-none z-10" />

          <Suspense fallback={<LoadingFallback />}>
            <Canvas
              camera={{ position: [0, 1.5, 5], fov: 45 }}
              style={{ background: "transparent" }}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={["#050510"]} />
              <fog attach="fog" args={["#050510", 8, 15]} />
              <Scene />
            </Canvas>
          </Suspense>
        </div>

        <div className="text-center mt-6 md:mt-8">
          <p className="text-white/40 text-xs sm:text-sm tracking-wider uppercase font-normal">
            Click and drag to rotate &bull; Built with Three.js &amp; React
          </p>
        </div>
      </div>
    </section>
  );
}
