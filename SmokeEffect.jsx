"use client";
import { useState, useRef } from 'react';
import styles from './SmokeEffect.module.css';

export default function SmokeEffect({ text = "" }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculamos la posición del ratón en porcentajes
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
    >
      {/* Capas de humo originales */}
      <div className={styles.glowBurst}></div>
      <div className={styles.smokeLayer}></div>
      <div className={`${styles.smokeLayer} ${styles.smokeLayerDelayed}`}></div>
      <div className={styles.extraSmoke}></div>

      {/* Capa interactiva: "borra" el humo imitando el color del fondo oscuro */}
      <div
        className={styles.cursorInteract}
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #000000 0%, transparent 15vw)`
        }}
      />

      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
}