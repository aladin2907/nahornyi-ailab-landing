'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Vector3, BufferGeometry, BufferAttribute } from 'three';
import * as THREE from 'three';
import { usePerformance, getQualitySettings } from '@/lib/performance';
import { useDeviceInfo } from '@/lib/device';
import { motion, useScroll, useTransform } from 'framer-motion';


interface Particle {
  position: Vector3;
  velocity: Vector3;
  scale: number;
  alpha: number;
  basePosition: Vector3;
}

function NeuralSwarm() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const meshRef = useRef<InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { qualityMode } = usePerformance();
  const { isMobile } = useDeviceInfo();
  const { mouse } = useThree();
  
  // Mobile-optimized settings - same as desktop but optimized for mobile
  const settings = useMemo(() => {
    if (isMobile) {
      return {
        particles: 200, // Optimized for mobile performance
        lines: true,
        postprocessing: false, // Disable for mobile performance
        shadows: false // Disable for mobile performance
      };
    }
    return getQualitySettings(qualityMode, 'medium');
  }, [qualityMode, isMobile]);
  
  // Create particles
  const particleCount = settings.particles;
  
  // Initialize particles
  useMemo(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        position: new Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8
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
      newParticles.push(particle);
    }
    setParticles(newParticles);
  }, [particleCount, settings]);
  
  
  const lineGeometry = useMemo(() => {
    if (!settings.lines) return null;
    
    const geometry = new BufferGeometry();
    const positions: number[] = [];
    const maxDistance = 1.5; // Standard distance for connections
    
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
      const maxDistance = 1.5; // Standard distance for connections
      
      for (let i = 0; i < particles.length && posIndex < positions.length; i++) {
        for (let j = i + 1; j < particles.length && posIndex < positions.length; j++) {
          const distance = particles[i].position.distanceTo(particles[j].position);
          if (distance < maxDistance) {
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
          <lineBasicMaterial 
            color="#8A7CFF" 
            transparent 
            opacity={0.3} 
          />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  
  if (isMobile) {
    return (
      <div id="hero" ref={containerRef} className="h-screen relative">
        {/* Mobile Three.js Canvas with neural network */}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{ background: '#0B0B0F' }}
          onCreated={({ gl }) => {
            // Better WebGL support for Safari
            gl.setClearColor('#0B0B0F', 1);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
          fallback={
            <div className="h-full w-full bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
                  Nahornyi AILab
                </div>
                {copy && (
                  <>
                    <p className="text-lg sm:text-xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-6 max-w-sm mx-auto">
                      &ldquo;{copy.hero.slogan}&rdquo;
                    </p>
                    <p className="text-base text-[--foreground]/70 max-w-sm mx-auto">
                      {copy?.hero.subtitle || 'AI automation that drives revenue'}
                    </p>
                  </>
                )}
              </div>
            </div>
          }
        >
          <NeuralSwarm />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
        </Canvas>
        
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl px-4">
            <div className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
              Nahornyi AILab
            </div>
            {copy && (
              <>
                <motion.p 
                  className="text-lg sm:text-xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-4 max-w-sm mx-auto"
                  style={{ fontFamily: 'Georgia, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  &ldquo;{copy.hero.slogan}&rdquo;
                </motion.p>
                <motion.p 
                  className="text-base sm:text-lg text-[--foreground]/70 max-w-sm mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {copy?.hero.subtitle || 'AI automation that drives revenue'}
                </motion.p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div id="hero" ref={containerRef} className="h-screen relative">
      {/* Fallback for browsers that don't support Three.js well */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: '#0B0B0F' }}
        onCreated={({ gl }) => {
          // Better WebGL support for Safari
          gl.setClearColor('#0B0B0F', 1);
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
        fallback={
          <div className="h-full w-full bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
                Nahornyi AILab
              </div>
              {copy && (
                <>
                  <p className="text-xl md:text-2xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-6 max-w-2xl text-center">
                    &ldquo;{copy.hero.slogan}&rdquo;
                  </p>
                  <p className="text-lg text-[--foreground]/60 mb-8 max-w-2xl text-center">
                    {copy.hero.subtitle}
                  </p>
                </>
              )}
            </div>
          </div>
        }
      >
        <NeuralSwarm />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
      </Canvas>
      
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
            Nahornyi AILab
          </h1>
          {copy && (
            <>
              <motion.p 
                className="text-xl md:text-2xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-6 max-w-2xl text-center"
                style={{ fontFamily: 'Georgia, serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                &ldquo;{copy.hero.slogan}&rdquo;
              </motion.p>
              <motion.p 
                className="text-lg text-[--foreground]/60 mb-8 max-w-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {copy.hero.subtitle}
              </motion.p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}