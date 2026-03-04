"use client";
import { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid-enhanced';

export default function SmokeEffect({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // @ts-ignore
    webGLFluidEnhanced.simulation(canvasRef.current, {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      DENSITY_DISSIPATION: 0.96,
      VELOCITY_DISSIPATION: 0.98,
      PRESSURE: 0.8,
      CURL: 25,
      SPLAT_RADIUS: 0.4,
      SPLAT_FORCE: 6000,
      SHADING: true,
      COLORFUL: false,
      TRANSPARENT: true,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      TRIGGER: 'hover'
    });

    const fireInterval = setInterval(() => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      
      const x = rect.width;
      const y = rect.height / 2 + (Math.random() * 400 - 200); 
      const dx = -1500;
      const dy = Math.random() * 600 - 300; 

      // @ts-ignore
      webGLFluidEnhanced.splat(x, y, dx, dy, '#ffffff'); 
      // @ts-ignore
      webGLFluidEnhanced.splat(x - 50, y, dx, dy, '#78beff'); 
    }, 150);

    return () => clearInterval(fireInterval);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#020611' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'auto'
        }}
      />
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}