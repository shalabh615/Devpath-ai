import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars, Sparkles } from '@react-three/drei';

function Rocket() {
  const groupRef = useRef();
  const fireRef = useRef();

  useFrame((state) => {
    // Read the actual DOM scroll
    const scrollY = window.scrollY;
    // Map scroll progress (assuming max scroll is roughly 2000px, but it dynamically adjusts)
    // We'll just map scroll directly to Y position. 100px scroll = +1 Y
    const normalizedScroll = scrollY * 0.015;
    
    // Animate rocket launching up based on scroll
    if (groupRef.current) {
      groupRef.current.position.y = -3 + normalizedScroll;
      // Slight tilt as it launches
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05 - (normalizedScroll * 0.02);
    }

    // Flicker the fire if we are scrolling (launching)
    if (fireRef.current) {
      const isLaunching = normalizedScroll > 0.5;
      const flicker = isLaunching ? Math.random() * 0.5 + 0.8 : 0.3;
      fireRef.current.scale.y = flicker;
      fireRef.current.scale.x = flicker * 0.8;
      fireRef.current.scale.z = flicker * 0.8;
    }
  });

  return (
    <group ref={groupRef} position={[3, -3, 0]} rotation={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          {/* Main Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 3, 32]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.4} roughness={0.2} />
          </mesh>

          {/* Nose Cone */}
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[0.6, 1.2, 32]} />
            <meshStandardMaterial color="#4f46e5" metalness={0.6} roughness={0.2} />
          </mesh>

          {/* Window */}
          <mesh position={[0, 0.5, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
            <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.5} roughness={0.3} />
          </mesh>

          {/* Fins */}
          <mesh position={[0.7, -1, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <coneGeometry args={[0.1, 1.2, 32]} />
            <meshStandardMaterial color="#ef4444" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[-0.7, -1, 0]} rotation={[0, 0, Math.PI / 6]}>
            <coneGeometry args={[0.1, 1.2, 32]} />
            <meshStandardMaterial color="#ef4444" metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, -1, 0.7]} rotation={[Math.PI / 6, 0, 0]}>
            <coneGeometry args={[0.1, 1.2, 32]} />
            <meshStandardMaterial color="#ef4444" metalness={0.4} roughness={0.3} />
          </mesh>

          {/* Thruster */}
          <mesh position={[0, -1.6, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 0.4, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.2} />
          </mesh>

          {/* Fire */}
          <group position={[0, -2.4, 0]}>
            <mesh ref={fireRef}>
              <coneGeometry args={[0.35, 1.5, 16]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.8} />
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <coneGeometry args={[0.2, 1, 16]} />
              <meshBasicMaterial color="#ef4444" transparent opacity={0.9} />
            </mesh>
          </group>
        </group>
      </Float>
    </group>
  );
}

export default function RocketBackground() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
        
        {/* Environment - Makes materials shiny like silver/glass */}
        <Environment preset="city" />

        {/* Soft floating stars/particles filling the background */}
        <Sparkles count={150} scale={15} size={2} speed={0.4} opacity={0.2} color="#4f46e5" />
        
        <Rocket />
      </Canvas>
    </div>
  );
}
