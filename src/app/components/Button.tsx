'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = () => {
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileHover={{
        scale: 1.15,
        boxShadow: '0px 12px 40px rgba(198, 210, 30, 0.7)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{
        background: hover
          ? 'linear-gradient(145deg, #e0ff52, #a7b51a)'
          : 'linear-gradient(145deg, #c6d21e, #889812)',
        border: 'none',
        padding: '15px 30px',
        fontSize: '18px',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        borderRadius: '10px',
        outline: 'none',
        position: 'relative',
        transition: 'all 0.15s ease-in-out',
        textTransform: 'uppercase',
        overflow: 'hidden',
      }}
    >
      ¡Haz clic!
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{
          opacity: hover ? 1 : 0,
          scale: hover ? 1.4 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }} 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          background: 'radial-gradient(circle, rgba(198, 210, 30, 0.4) 10%, transparent 80%)',
          top: 0,
          left: 0,
          zIndex: -1,
          pointerEvents: 'none', 
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: hover ? 0.6 : 0,
          scale: hover ? 1.8 : 0.5,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }} 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          background: 'radial-gradient(circle, rgba(198, 210, 30, 0.3) 20%, transparent 70%)',
          top: 0,
          left: 0,
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />
    </motion.button>
  );
};

export default AnimatedButton;