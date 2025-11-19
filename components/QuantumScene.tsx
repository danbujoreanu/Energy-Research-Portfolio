/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- CITY / ENERGY SCENE ---

interface BuildingProps {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  speed: number;
}

const Building: React.FC<BuildingProps> = ({ position, scale, color, speed }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       // Oscillate height to represent energy demand
       const t = state.clock.getElapsedTime();
       const y = scale[1] + Math.sin(t * speed + position[0]) * (scale[1] * 0.2);
       ref.current.scale.set(scale[0], y, scale[2]);
       ref.current.position.y = y / 2; // Keep bottom grounded
    }
  });

  return (
     <group position={[position[0], 0, position[2]]}>
        <mesh ref={ref}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} transparent opacity={0.9} metalness={0.1} roughness={0.2} />
        </mesh>
        {/* Reflection/Shadow fake */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[1.2, 1.2]} />
            <meshBasicMaterial color="#000" transparent opacity={0.1} />
        </mesh>
     </group>
  );
};

const GridCity = () => {
    // Generate a grid of buildings
    const buildings = useMemo(() => {
        const items: { position: [number, number, number]; height: number; color: string; speed: number }[] = [];
        const size = 6;
        const gap = 1.5;
        for(let x = -size; x <= size; x++) {
            for(let z = -size; z <= size; z++) {
                // Random height
                const height = Math.random() * 3 + 0.5;
                // Color based on "Type"
                const isSpecial = Math.random() > 0.8;
                const color = isSpecial ? "#10B981" : "#CBD5E1"; // Emerald vs Slate
                const speed = Math.random() * 2 + 0.5;
                
                if (Math.random() > 0.3) { // Sparsity
                    items.push({ position: [x * gap, 0, z * gap], height, color, speed });
                }
            }
        }
        return items;
    }, []);

    return (
        <group rotation={[0, Math.PI / 4, 0]}>
            {buildings.map((b, i) => (
                <Building 
                    key={i} 
                    position={b.position} 
                    scale={[1, b.height, 1]} 
                    color={b.color} 
                    speed={b.speed}
                />
            ))}
        </group>
    );
}

export const CityScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [10, 10, 10], fov: 35 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[-5, 10, 5]} intensity={1} castShadow />
        <pointLight position={[10, 5, 10]} intensity={0.5} color="#10B981" />
        
        <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.2}>
             <GridCity />
        </Float>

        <Environment preset="city" />
        {/* Floor fade */}
        <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial color="#F8FAFC" transparent opacity={0.8} />
        </mesh>
        
        <fog attach="fog" args={['#F8FAFC', 10, 35]} />
      </Canvas>
    </div>
  );
};

// Retain export for compatibility if needed, though we use CityScene now
export const HeroScene = CityScene;
export const QuantumComputerScene = CityScene;