import "./globals.css";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor"; 
import ScrollBar from "./components/ScrollBar"; 

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className="antialiased">
        <Cursor />
        <ScrollBar />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "Mi Portafolio",
  description: "Bienvenido a mi portafolio",
};
