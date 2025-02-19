'use client';

import { useEffect, useState } from 'react';

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(300); // Tamaño inicial

  useEffect(() => {
    let lastTime = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 16) return; // Limitar a ~60 FPS
      lastTime = now;

      const { clientX: x, clientY: y } = event;
      setCursorPosition({ x, y });

      // Calcular la velocidad del movimiento
      const deltaX = x - cursorPosition.x;
      const deltaY = y - cursorPosition.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Ajustar el tamaño del círculo basado en la velocidad
      const newSize = Math.max(150, 300 - speed * 0.3); // Tamaño mínimo de 150px
      setCursorSize(newSize);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorPosition]);

  return (
    <div
      style={{
        position: 'fixed',
        left: cursorPosition.x + 'px',
        top: cursorPosition.y + 'px',
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        borderRadius: '50%', // Mantiene el borde circular
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, rgba(0, 173, 255, 0.2) 0%, rgba(0, 29, 55, 0.3) 90%)`, // Gradiente más suave de azul claro a oscuro
        transition: 'width 0.3s ease, height 0.3s ease, transform 0.3s ease', // Transición suave
        boxShadow: `0 0 150px rgba(0, 173, 255, 0.15)`, // Sombra más suave
        filter: `blur(${cursorSize / 250}px)`, // Desenfoque suave
      }}
    />
  );
};

export default Cursor;
