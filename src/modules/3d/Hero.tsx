'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Vector3, BufferGeometry, BufferAttribute } from 'three';
import * as THREE from 'three';
import { usePerformance, getQualitySettings } from '@/lib/performance';
import { useDeviceInfo } from '@/lib/device';
import { motion } from 'framer-motion';


interface Particle {
  position: Vector3;
  velocity: Vector3;
  scale: number;
  alpha: number;
  basePosition: Vector3;
}

function NeuralSwarm() {
  const meshRef = useRef<InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { qualityMode } = usePerformance();
  const { isMobile } = useDeviceInfo();
  const { mouse } = useThree();
  
  const settings = getQualitySettings(qualityMode, isMobile ? 'low' : 'medium');
  const particleCount = settings.particles;
  
  const particles = useMemo(() => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        position: new Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10
        ),
        velocity: new Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        scale: Math.random() * 0.05 + 0.02,
        alpha: Math.random() * 0.8 + 0.2,
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
    const maxDistance = 1.5;
    
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
    
    const time = state.clock.elapsedTime;
    const mouseX = mouse.x * 2;
    const mouseY = mouse.y * 2;
    
    // Update particle positions with curl noise and mouse magnetism
    particles.forEach((particle, i) => {
      // Curl noise (simplified)
      const curlX = Math.sin(time * 0.5 + particle.basePosition.y * 0.1) * 0.01;
      const curlY = Math.cos(time * 0.3 + particle.basePosition.x * 0.1) * 0.01;
      const curlZ = Math.sin(time * 0.4 + particle.basePosition.z * 0.1) * 0.005;
      
      // Mouse magnetism
      const mouseDistance = Math.sqrt(
        Math.pow(particle.position.x - mouseX * 5, 2) + 
        Math.pow(particle.position.y - mouseY * 3, 2)
      );
      const magnetStrength = Math.max(0, 1 - mouseDistance / 3) * 0.02;
      
      const toMouseX = (mouseX * 5 - particle.position.x) * magnetStrength;
      const toMouseY = (mouseY * 3 - particle.position.y) * magnetStrength;
      
      // Update position
      particle.position.x += curlX + toMouseX;
      particle.position.y += curlY + toMouseY;
      particle.position.z += curlZ;
      
      // Keep particles in bounds
      if (Math.abs(particle.position.x) > 12) particle.position.x *= 0.95;
      if (Math.abs(particle.position.y) > 8) particle.position.y *= 0.95;
      if (Math.abs(particle.position.z) > 6) particle.position.z *= 0.95;
      
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
          if (distance < 1.5) {
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
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial color="#00FFF0" transparent opacity={0.8} />
      </instancedMesh>
      
      {settings.lines && lineGeometry && (
        <lineSegments ref={linesRef} geometry={lineGeometry}>
          <lineBasicMaterial color="#8A7CFF" transparent opacity={0.3} />
        </lineSegments>
      )}
    </group>
  );
}

interface HeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function Hero({ copy }: HeroProps) {
  const { isMobile } = useDeviceInfo();
  
  if (isMobile) {
    return (
      <div className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
            Nahornyi AILab
          </h1>
          <p className="text-lg opacity-80">{copy?.hero_hardcoded.subtitle_mobile || 'AI automation that drives revenue'}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div id="hero" className="h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: '#0B0B0F' }}
      >
        <NeuralSwarm />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
      </Canvas>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
            Nahornyi AILab
          </h1>
          {copy && (
            <>
              <motion.p 
                className="text-lg text-[--foreground]/60 mb-8 max-w-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {copy.hero.subtitle}
              </motion.p>
              <motion.p 
                className="text-lg text-[--foreground]/60 mb-8 max-w-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                          >
              &ldquo;{copy.hero.slogan}&rdquo;
            </motion.p>
            </>
          )}
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="glass-intense magnetic-button ripple px-8 py-4 text-lg font-medium pulse-glow">
              {copy?.hero_hardcoded.cta_primary || 'Discuss your use case'}
            </button>
            <button className="px-8 py-4 text-lg font-medium border border-[--subtle] rounded-xl glass-hover shimmer transition-all duration-300">
              {copy?.hero_hardcoded.cta_secondary || 'What we build'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}