"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [mensaje, setMensaje] = useState('Esperando respuesta...');

  useEffect(() => {
    // Leemos la variable de entorno configurada en el archivo .env
    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!apiUrl) {
      setMensaje('Error: La URL del backend no está configurada en las variables de entorno.');
      return;
    }

    fetch(apiUrl)
      .then((res) => res.text())
      .then((data) => setMensaje(data))
      .catch((error) => setMensaje('Error: No se pudo conectar con el servidor externo'));
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