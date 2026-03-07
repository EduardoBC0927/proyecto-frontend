"use client";
import { useEffect, useRef } from 'react';

export default function SmokeEffect({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Inicializamos con null y un tipo más descriptivo si es posible
    let fluidInstance: any = null;
    let fireInterval: NodeJS.Timeout | null = null;

    // ... (resto del código igual)
    const start = async () => {
      try {
        // 1. Forzamos el tipo a 'any' aquí para evitar que TS se queje de los .default
        const module: any = await import('webgl-fluid-enhanced');
        
        // 2. Ahora esto no marcará error
        const FluidClass = module.default?.default || module.default || module;
        
        if (containerRef.current) {
// ... (sigue el código)
          fluidInstance = new FluidClass(containerRef.current);

          fluidInstance.setConfig({
            simResolution: 128,
            dyeResolution: 1024,
            densityDissipation: 0.97,
            velocityDissipation: 0.98,
            curl: 30,
            splatRadius: 0.35,
            transparent: true,
            hover: true,
            brightness: 1.0
          });

          fluidInstance.start();

          // 2. Iniciamos el intervalo solo después de que fluidInstance existe
          fireInterval = setInterval(() => {
            if (fluidInstance && typeof fluidInstance.splatAtLocation === 'function') {
              fluidInstance.splatAtLocation(
                window.innerWidth, 
                window.innerHeight / 2, 
                -1000, 
                0, 
                '#ffffff'
              );
            }
          }, 150);
        }
      } catch (e) { 
        console.error("Error visual:", e); 
      }
    };

    start();

    return () => {
      // 3. Limpieza segura
      if (fireInterval) clearInterval(fireInterval);
      if (fluidInstance && typeof fluidInstance.stop === 'function') {
        fluidInstance.stop();
      }
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#020611', zIndex: 0 }}>
      {/* CAPA 1: EL HUMO */}
      <div 
        ref={containerRef} 
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'auto' }} 
      />
      {/* CAPA 2: CONTENIDO */}
      <div style={{ position: 'relative', zIndex: 2, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}