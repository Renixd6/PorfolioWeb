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
    backgroundColor: "#0000ff",
    xPositionTop: 0,
    xPositionBottom: 0,
  });
  const { t } = useTranslation();

  const [touchStart, setTouchStart] = useState(0);

  const handleScroll = (event: WheelEvent) => {  
    const deltaY = event.deltaY ?? 0;
    if (deltaY > 0) {
      setAnimationState({
        scale: 1.05,
        rotate: 2,
        backgroundColor: "#ff007f",
        xPositionTop: 8,
        xPositionBottom: -6,
      });
    } else {
      setAnimationState({
        scale: 1,
        rotate: 0,
        backgroundColor: "#0000ff",
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
        scale: 1.05,
        rotate: 2,
        backgroundColor: "#ff007f",
        xPositionTop: 8,
        xPositionBottom: -6,
      });
    } else if (touchDelta < 0) {
      setAnimationState({
        scale: 1,
        rotate: 0,
        backgroundColor: "#0000ff",
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
      <div className="hidden md:block w-[300px] h-[300px]"></div>

      <div className="flex flex-col justify-start items-start h-screen gap-4 pt-44 sm:pt-44 md:pt-44 lg:pt- px-8 sm:px-12 md:px-16 lg:px-72">
        <p className="text-lg text-[#c6d21e]">{t('hello')}</p>  
        <h1 className="text-3xl text-white lg:text-6xl xl:text-7xl">{t('name')}</h1>  
        <h2 className="text-2xl lg:text-4xl xl:text-5xl">{t('ido')}</h2> 
        <p className="text-lg mt-2 max-w-xl">{t('srtdesc')}</p>  {/* Aquí se establece el ancho máximo */}
        <div className="pt-4"><Button /> </div>  
      </div>

      <div className="flex flex-col justify-center items-center h-screen gap-12"> 
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 80 }}
          animate={{ opacity: 1, scale: animationState.scale, rotate: animationState.rotate, backgroundColor: animationState.backgroundColor, x: animationState.xPositionTop }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
            backgroundColor: { duration: 1, ease: "easeInOut" },  
          }}
          className="w-[80vw] h-[60vw] sm:w-[80vw] sm:h-[50vw] md:w-[70vw] md:h-[45vw] lg:w-[60vw] lg:h-[40vw] bg-blue-500 text-white flex justify-center items-center text-3xl font-bold rounded-2xl shadow-xl"
        >
          {t('greeting')}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 80 }}
          animate={{ opacity: 1, scale: animationState.scale, rotate: animationState.rotate, backgroundColor: animationState.backgroundColor, x: animationState.xPositionBottom }} 
          transition={{
            duration: 1.8,
            ease: "easeOut",
            backgroundColor: { duration: 1, ease: "easeInOut" },  
          }}
          className="w-[80vw] h-[60vw] sm:w-[80vw] sm:h-[50vw] md:w-[70vw] md:h-[45vw] lg:w-[60vw] lg:h-[40vw] bg-blue-500 text-white flex justify-center items-center text-3xl font-bold rounded-2xl shadow-xl"
        >
          {t('greeting')}
        </motion.div>
      </div>
      <div className="h-80"></div>
    </main>
  );
}
