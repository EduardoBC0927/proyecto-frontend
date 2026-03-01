"use client"; // Esto siempre debe ir en la primera línea
import { useState, useEffect } from 'react';
import SmokeEffect from '../SmokeEffect';

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
    /* Agregué 'relative' y 'overflow-hidden' al contenedor principal */
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* Contenedor del humo (en el fondo) */}
      <div className="absolute inset-0 z-0">
        <SmokeEffect text="" /> {/* Dejo el texto vacío para que no estorbe tu título */}
      </div>

      {/* Tu contenido original (traído al frente con z-10) */}
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">Conexión Frontend - Backend</h1>
        <div className="p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-2xl backdrop-blur-sm bg-opacity-80">
          <p className="text-xl">
            El servidor dice: <span className="text-green-400 font-mono font-bold">{mensaje}</span>
          </p>
        </div>
      </div>

    </div>
  );
}