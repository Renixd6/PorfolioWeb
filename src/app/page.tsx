"use client"; 

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; 
import '../../i18n'; 

export default function Home() {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#0000ff");
  const [xPositionTop, setXPositionTop] = useState(0); 
  const [xPositionBottom, setXPositionBottom] = useState(0); 
  const { t, i18n } = useTranslation();  


  const [touchStart, setTouchStart] = useState(0);

 
  const handleScroll = (event: WheelEvent) => {  
    const deltaY = event.deltaY ?? 0;
    if (deltaY > 0) {
      setScale(1.1);
      setRotate(2);
      setBackgroundColor("#ff007f");
      setXPositionTop(8);
      setXPositionBottom(-6);
    } else {
      setScale(1);
      setRotate(0);
      setBackgroundColor("#0000ff");
      setXPositionTop(0);
      setXPositionBottom(0);
    }
  };


  const handleTouchMove = (event: TouchEvent) => {
    const touchEnd = event.changedTouches[0].clientY;
    const touchDelta = touchStart - touchEnd;
    if (touchDelta > 0) {
      setScale(1.1);
      setRotate(2);
      setBackgroundColor("#ff007f");
      setXPositionTop(8);
      setXPositionBottom(-6);
    } else if (touchDelta < 0) {
      setScale(1);
      setRotate(0);
      setBackgroundColor("#0000ff");
      setXPositionTop(0);
      setXPositionBottom(0);
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
      <div className="flex flex-col justify-center items-center h-screen gap-12 pt-44"> 
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 80 }}
          animate={{ opacity: 1, scale, rotate, backgroundColor, x: xPositionTop }}
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
          animate={{ opacity: 1, scale, rotate, backgroundColor, x: xPositionBottom }} 
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
