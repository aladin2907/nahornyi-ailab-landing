'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function N8NPipeline() {
  const meshRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  const nodes = useMemo(() => {
    const positions = [
      [-4, 0, 0], [-2, 1, 0], [0, 0, 0], [2, -1, 0], [4, 0, 0]
    ];
    const labels = ['Telegram', 'WhatsApp', 'n8n', 'AWS', 'Sheets'];
    return positions.map((pos, i) => ({ position: pos, label: labels[i] }));
  }, []);
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const progress = scroll.range(0, 1/3);
    meshRef.current.rotation.y = progress * Math.PI * 0.2;
    
    // Animate connections appearing based on progress
    // This would update line materials in a real implementation
  });
  
  return (
    <group ref={meshRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position as [number, number, number]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#00FFF0" />
        </mesh>
      ))}
    </group>
  );
}

function LLMAgents() {
  const meshRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const progress = scroll.range(1/3, 1/3);
    meshRef.current.scale.setScalar(0.5 + progress * 0.5);
    
    // Morph from cubes to "AGENTS" to "RAG"
    const phase = progress * 3;
    meshRef.current.rotation.y = phase * Math.PI * 0.5;
  });
  
  return (
    <group ref={meshRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4
          ]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color="#8A7CFF" />
        </mesh>
      ))}
    </group>
  );
}

function QAAutotests() {
  const meshRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  useFrame(() => {
    if (!meshRef.current) return;
    
    const progress = scroll.range(2/3, 1/3);
    
    // Simulate UI highlighting and glow sweep
    meshRef.current.children.forEach((child, i) => {
      const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      const delay = i * 0.1;
      const localProgress = Math.max(0, progress - delay);
      
      if (localProgress > 0.8) {
        material.color.setHex(0x00FF00); // Passed glow
      } else if (localProgress > 0.4) {
        material.color.setHex(0x00FFF0); // Testing
      } else {
        material.color.setHex(0x666666); // Idle
      }
    });
  });
  
  return (
    <group ref={meshRef}>
      {Array.from({ length: 9 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (i % 3 - 1) * 2,
            (Math.floor(i / 3) - 1) * 1.5,
            0
          ]}
        >
          <planeGeometry args={[1.5, 1]} />
          <meshBasicMaterial transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

export default function Chapters() {
  return (
    <div className="h-[300vh] relative">
      <div className="sticky top-0 h-screen">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ScrollControls pages={3} damping={0.1}>
            <N8NPipeline />
            <LLMAgents />
            <QAAutotests />
            
            <Scroll html>
              <div className="h-screen flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-center max-w-2xl"
                >
                  <h2 className="text-4xl font-bold mb-4">n8n Pipeline</h2>
                  <p className="text-lg opacity-80">
                    Live integrations between Telegram, WhatsApp, AWS, and Google Sheets
                  </p>
                </motion.div>
              </div>
              
              <div className="h-screen flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-center max-w-2xl"
                >
                  <h2 className="text-4xl font-bold mb-4">LLM Agents</h2>
                  <p className="text-lg opacity-80">
                    Smart agents that morph from simple cubes into powerful RAG systems
                  </p>
                </motion.div>
              </div>
              
              <div className="h-screen flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-center max-w-2xl"
                >
                  <h2 className="text-4xl font-bold mb-4">QA Autotests</h2>
                  <p className="text-lg opacity-80">
                    Automated testing with visual feedback and instant pass/fail results
                  </p>
                </motion.div>
              </div>
            </Scroll>
          </ScrollControls>
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
        </Canvas>
      </div>
    </div>
  );
}