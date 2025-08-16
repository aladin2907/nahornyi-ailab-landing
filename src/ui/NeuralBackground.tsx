'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Vector3, BufferGeometry, BufferAttribute } from 'three';
import * as THREE from 'three';
import { usePerformance, getQualitySettings } from '@/lib/performance';
import { useDeviceInfo } from '@/lib/device';

interface Particle {
  position: Vector3;
  velocity: Vector3;
  scale: number;
  alpha: number;
  basePosition: Vector3;
}

interface NeuralBackgroundProps {
  fixed?: boolean;
  opacity?: number;
  className?: string;
}

function NeuralSwarm({ opacity = 0.4 }: { opacity?: number }) {
  const meshRef = useRef<InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { qualityMode } = usePerformance();
  const { isMobile } = useDeviceInfo();
  const { mouse } = useThree();
  
  const settings = getQualitySettings(qualityMode, isMobile ? 'low' : 'medium');
  const particleCount = Math.min(settings.particles, isMobile ? 30 : 60); // Reduce for background
  
  const particles = useMemo(() => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        position: new Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        scale: Math.random() * 0.03 + 0.01,
        alpha: Math.random() * 0.6 + 0.2,
        basePosition: new Vector3()
      };
      
      particle.basePosition.copy(particle.position);
      particles.push(particle);
    }
    
    return particles;
  }, [particleCount]);
  
  
  const lineGeometry = useMemo(() => {
    if (!settings.lines) return null;
    
    const geometry = new BufferGeometry();
    const positions: number[] = [];
    const maxDistance = 2;
    
    // Create connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = particles[i].position.distanceTo(particles[j].position);
        if (distance < maxDistance) {
          positions.push(
            particles[i].position.x, particles[i].position.y, particles[i].position.z,
            particles[j].position.x, particles[j].position.y, particles[j].position.z
          );
        }
      }
    }
    
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [particles, settings.lines]);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime * 0.3; // Slower for background
    const mouseX = mouse.x * 1;
    const mouseY = mouse.y * 1;
    
    // Update particle positions with curl noise and subtle mouse interaction
    particles.forEach((particle, i) => {
      // Curl noise (simplified and slower)
      const curlX = Math.sin(time + particle.basePosition.y * 0.05) * 0.005;
      const curlY = Math.cos(time + particle.basePosition.x * 0.05) * 0.005;
      const curlZ = Math.sin(time + particle.basePosition.z * 0.05) * 0.003;
      
      // Subtle mouse magnetism
      const mouseDistance = Math.sqrt(
        Math.pow(particle.position.x - mouseX * 3, 2) + 
        Math.pow(particle.position.y - mouseY * 2, 2)
      );
      const magnetStrength = Math.max(0, 1 - mouseDistance / 5) * 0.01;
      
      const toMouseX = (mouseX * 3 - particle.position.x) * magnetStrength;
      const toMouseY = (mouseY * 2 - particle.position.y) * magnetStrength;
      
      // Update position
      particle.position.x += curlX + toMouseX;
      particle.position.y += curlY + toMouseY;
      particle.position.z += curlZ;
      
      // Keep particles in bounds
      if (Math.abs(particle.position.x) > 18) particle.position.x *= 0.95;
      if (Math.abs(particle.position.y) > 12) particle.position.y *= 0.95;
      if (Math.abs(particle.position.z) > 8) particle.position.z *= 0.95;
      
      // Update instance matrix
      const matrix = new THREE.Matrix4();
      matrix.setPosition(particle.position);
      matrix.scale(new Vector3(particle.scale, particle.scale, particle.scale));
      meshRef.current!.setMatrixAt(i, matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Update line connections if enabled
    if (linesRef.current && settings.lines) {
      const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
      let posIndex = 0;
      
      for (let i = 0; i < particles.length && posIndex < positions.length; i++) {
        for (let j = i + 1; j < particles.length && posIndex < positions.length; j++) {
          const distance = particles[i].position.distanceTo(particles[j].position);
          if (distance < 2) {
            positions[posIndex++] = particles[i].position.x;
            positions[posIndex++] = particles[i].position.y;
            positions[posIndex++] = particles[i].position.z;
            positions[posIndex++] = particles[j].position.x;
            positions[posIndex++] = particles[j].position.y;
            positions[posIndex++] = particles[j].position.z;
          }
        }
      }
      
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
        <sphereGeometry args={[1, 6, 4]} />
        <meshBasicMaterial color="#00FFF0" transparent opacity={opacity * 0.6} />
      </instancedMesh>
      
      {settings.lines && lineGeometry && (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
          <lineBasicMaterial color="#8A7CFF" transparent opacity={opacity * 0.2} />
        </lineSegments>
      )}
    </group>
  );
}

export default function NeuralBackground({ 
  fixed = true, 
  opacity = 0.3, 
  className = "" 
}: NeuralBackgroundProps) {
  const { isMobile } = useDeviceInfo();
  
  // Don't render on mobile for performance
  if (isMobile) {
    return null;
  }
  
  return (
    <div className={`${fixed ? 'fixed' : 'absolute'} inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ 
          background: 'transparent',
          pointerEvents: 'none' 
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
      >
        <NeuralSwarm opacity={opacity} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  );
}
