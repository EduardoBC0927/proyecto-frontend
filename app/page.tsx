"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [mensaje, setMensaje] = useState('Esperando respuesta...');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    if (!apiUrl) {
      setMensaje('Error: La URL del backend no está configurada.');
      return;
    }

    fetch(apiUrl)
      .then((res) => res.text())
      .then((data) => setMensaje(data))
      .catch((error) => setMensaje('Error: No se pudo conectar con el servidor'));
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white relative z-10">
      <h1 className="text-4xl font-bold mb-8 drop-shadow-md">Conexión Frontend - Backend</h1>
      <div className="p-6 border border-gray-700 rounded-xl bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-2xl">
        <p className="text-xl">
          El servidor dice: <span className="text-green-400 font-mono font-bold">{mensaje}</span>
        </p>
      </div>
    </div>
  );
}