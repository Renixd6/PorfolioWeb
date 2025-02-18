import "./globals.css";
import Navbar from "./components/Navbar";  

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar /> {/* Barra de navegación aquí */}
        {children}  {/* El contenido de cada página */}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Mi Portafolio",
  description: "Bienvenido a mi portafolio",
};
