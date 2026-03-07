import './globals.css';
import SmokeEffect from '../SmokeEffect'; // Importación normal, el servidor está a salvo

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <SmokeEffect>
          {children}
        </SmokeEffect>
      </body>
    </html>
  );
}