"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "./components/Button";

import '../../i18n';

export default function Home() {
  const [animationState, setAnimationState] = useState({
    scale: 1,
    rotate: 0,
    backgroundColor: "#101c34",
    xPositionTop: 0,
    xPositionBottom: 0,
  });
  const { t } = useTranslation();

  const [touchStart, setTouchStart] = useState(0);

  const handleScroll = (event: WheelEvent) => {
    const deltaY = event.deltaY ?? 0;
    if (deltaY > 0) {
      setAnimationState({
        scale: 1.1,
        rotate: 2,
        backgroundColor: "#ff007f",
        xPositionTop: 5,
        xPositionBottom: -5,
      });
    } else {
      setAnimationState({
        scale: 1,
        rotate: 0,
        backgroundColor: "#101c34",
        xPositionTop: 0,
        xPositionBottom: 0,
      });
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touchEnd = event.changedTouches[0].clientY;
    const touchDelta = touchStart - touchEnd;
    if (touchDelta > 0) {
      setAnimationState({
        scale: 1.1,
        rotate: 5,
        backgroundColor: "#ff007f",
        xPositionTop: 10,
        xPositionBottom: -10,
      });
    } else if (touchDelta < 0) {
      setAnimationState({
        scale: 1,
        rotate: 0,
        backgroundColor: "#101c34",
        xPositionTop: 0,
        xPositionBottom: 0,
      });
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    setTouchStart(event.touches[0].clientY);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll as EventListener);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll as EventListener);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [touchStart]);

  return (
    <main>
      <div className="flex flex-col justify-center items-start min-h-screen gap-4 px-8 sm:px-12 md:px-16 lg:px-72">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-[#c6d21e]"
        >
          {t('hello')}
        </motion.p>
  
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl text-white lg:text-6xl xl:text-7xl"
        >
          {t('name')}
        </motion.h1>
  
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-2xl lg:text-4xl xl:text-5xl"
        >
          {t('ido')}
        </motion.h2>
  
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg mt-2 max-w-xl"
        >
          {t('srtdesc')}
        </motion.p>
  
        <div className="pt-4"></div>
  
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button />
        </motion.div>
      </div>
  
      <div className="flex flex-col justify-center items-center gap-12 pt-2 pb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 80 }}
          animate={{
            opacity: 1,
            scale: animationState.scale * 1.1,
            rotate: animationState.rotate,
            backgroundColor: animationState.backgroundColor,
            x: animationState.xPositionTop,
          }}
          transition={{
            duration: 1.8,
            ease: 'easeOut',
            backgroundColor: { duration: 1, ease: 'easeInOut' },
          }}
          className="w-[70%] h-[50vh] min-h-[300px] max-h-[600px] text-white flex justify-center items-center text-3xl font-bold rounded-2xl shadow-xl"
        >
          {t('about')}
        </motion.div>
      </div>
      <div className="h-80"></div>
    </main>
  );
  
}