'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type QualityMode = 'ultra' | 'high' | 'balanced' | 'lite';

interface PerformanceState {
  qualityMode: QualityMode;
  fps: number;
  deviceTier: 'high' | 'medium' | 'low';
  setQualityMode: (mode: QualityMode) => void;
  updateFps: (fps: number) => void;
  autoDowngrade: boolean;
}

export const usePerformance = create<PerformanceState>()(
  persist(
    (set, get) => ({
      qualityMode: 'balanced',
      fps: 60,
      deviceTier: 'medium',
      autoDowngrade: true,
      setQualityMode: (mode) => set({ qualityMode: mode }),
      updateFps: (fps) => {
        set({ fps });
        
        // Auto-downgrade if fps < 50 for 3+ seconds
        const state = get();
        if (state.autoDowngrade && fps < 50 && state.qualityMode !== 'lite') {
          setTimeout(() => {
            const currentFps = get().fps;
            if (currentFps < 50) {
              const modes: QualityMode[] = ['ultra', 'high', 'balanced', 'lite'];
              const currentIndex = modes.indexOf(state.qualityMode);
              if (currentIndex < modes.length - 1) {
                set({ qualityMode: modes[currentIndex + 1] });
              }
            }
          }, 3000);
        }
      }
    }),
    {
      name: 'nahornyi-performance',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ qualityMode: state.qualityMode })
    }
  )
);

export function detectDeviceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';
  
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  if (!gl) return 'low';
  
  const renderer = gl.getParameter(gl.RENDERER);
  
  // Check for high-end GPUs
  if (renderer.includes('Apple M') || renderer.includes('RTX') || renderer.includes('Radeon RX')) {
    return 'high';
  }
  
  // Check for integrated graphics
  if (renderer.includes('Intel') || renderer.includes('UHD') || renderer.includes('Iris')) {
    return 'low';
  }
  
  return 'medium';
}

export function getQualitySettings(mode: QualityMode, deviceTier: 'high' | 'medium' | 'low') {
  const base = {
    ultra: { particles: 6000, lines: true, postprocessing: true, shadows: true },
    high: { particles: 4000, lines: true, postprocessing: true, shadows: false },
    balanced: { particles: 3000, lines: true, postprocessing: false, shadows: false },
    lite: { particles: 1000, lines: false, postprocessing: false, shadows: false }
  };
  
  // Reduce further on low-end devices
  if (deviceTier === 'low') {
    return {
      ...base[mode],
      particles: Math.floor(base[mode].particles * 0.3),
      lines: false,
      postprocessing: false
    };
  }
  
  return base[mode];
}

class FPSMonitor {
  private frames: number[] = [];
  private lastTime = 0;
  
  update() {
    const now = performance.now();
    if (this.lastTime) {
      const fps = 1000 / (now - this.lastTime);
      this.frames.push(fps);
      
      // Keep only last 60 frames (1 second at 60fps)
      if (this.frames.length > 60) {
        this.frames.shift();
      }
    }
    this.lastTime = now;
  }
  
  getAverageFPS() {
    if (this.frames.length === 0) return 60;
    return this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
  }
}

export const fpsMonitor = new FPSMonitor();