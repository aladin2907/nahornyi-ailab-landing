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
      <div className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center relative overflow-hidden">
        {/* Beautiful floating background elements */}
        <div className="absolute inset-0">
          {/* Floating orbs with glow effects */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] rounded-full blur-sm"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-6 h-6 bg-gradient-to-r from-[#8A7CFF] to-[#00FFF0] rounded-full blur-sm"
            animate={{ 
              y: [0, 15, 0],
              x: [0, -15, 0],
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] rounded-full blur-sm"
            animate={{ 
              y: [0, -25, 0],
              x: [0, 20, 0],
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Animated gradient lines */}
          <motion.div 
            className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#00FFF0] to-transparent"
            animate={{ 
              x: [-128, "100vw"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute bottom-1/2 right-0 w-32 h-px bg-gradient-to-l from-transparent via-[#8A7CFF] to-transparent"
            animate={{ 
              x: ["100vw", -128],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          
          {/* Floating particles with trails */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#00FFF0] rounded-full"
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-[#8A7CFF] rounded-full"
            animate={{ 
              y: [0, 25, 0],
              x: [0, -15, 0],
              scale: [1, 1.8, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>
        
        <div className="text-center px-6 relative z-10">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
          >
            Nahornyi AILab
          </motion.h1>
          
          {copy && (
            <motion.p
              className="text-lg sm:text-xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-4 max-w-sm mx-auto"
              style={{ fontFamily: 'Georgia, serif' }}
              initial={{ opacity: 0, y: 20, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 1.4, 
                delay: 0.3,
                ease: "easeOut"
              }}
            >
              &ldquo;{copy.hero.slogan}&rdquo;
            </motion.p>
          )}
          
          <motion.p 
            className="text-base sm:text-lg text-[--foreground]/70 max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6,
              ease: "easeOut"
            }}
          >
            {copy?.hero.subtitle || 'AI automation that drives revenue'}
          </motion.p>
        </div>
      </div>
    );
  }
  
  return (
    <div id="hero" className="h-screen relative">
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
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
                Nahornyi AILab
              </h1>
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
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
      </div>
    </div>
  );
}