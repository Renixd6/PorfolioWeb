'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const getColor = () => {
    if (scrollProgress < 30) return "#c6d21e";
    if (scrollProgress < 70) return "#c6c21e";
    return "#c6a21e"; 
  };
  
  return (
    <div
      className="fixed top-0 right-0 h-full w-2 bg-gray-800 rounded-full shadow-lg transition-all duration-300 hover:w-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute bottom-0 w-full rounded-full"
        style={{ background: getColor(), height: `${scrollProgress}%` }}
        initial={{ height: 0 }}
        animate={{ height: `${scrollProgress}%` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      {hovered && (
        <motion.div
          className="absolute inset-0 w-6 bg-gray-900/30 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {hovered && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm font-bold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
      <motion.div
        className="absolute bottom-0 w-full h-2 bg-white/30 rounded-full blur-sm"
        style={{ y: `${100 - scrollProgress}%` }}
        initial={{ y: "100%" }}
        animate={{ y: `${100 - scrollProgress}%` }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 w-full h-full rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)" }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
    </div>
  );
}
