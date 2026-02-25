"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [mensaje, setMensaje] = useState('Esperando respuesta...');

  useEffect(() => {
    // Aquí hacemos la petición al Backend (puerto 3000)
    fetch('http://localhost:3000')
      .then((res) => res.text())
      .then((data) => setMensaje(data))
      .catch((error) => setMensaje('Error: No se pudo conectar con el backend'));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Conexión Frontend - Backend</h1>
      <div className="p-6 border border-gray-700 rounded-xl bg-gray-900">
        <p className="text-xl">
          El servidor dice: <span className="text-green-400 font-mono font-bold">{mensaje}</span>
        </p>
      </div>
    </div>
  );
}