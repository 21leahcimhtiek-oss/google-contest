import React from 'react';
import { motion } from 'motion/react';

export const Character3: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="absolute bottom-1/4 right-1/2 translate-x-1/2 flex flex-col items-center z-50 origin-bottom"
    >
      <div className="relative group">
        {/* Divine Aura */}
        <motion.div 
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 -m-20 bg-amber-500 blur-[80px] rounded-full" 
        />

        {/* The Animated "3" Persona */}
        <motion.span 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative text-9xl md:text-[12rem] font-black text-white/95 drop-shadow-[0_0_50px_rgba(255,215,0,0.9)] font-mono select-none"
        >
          3
        </motion.span>

        {/* Divine Beams */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, delay: i * 0.7, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-[200%] bg-amber-200/30 blur-sm"
            style={{ rotate: `${i * 45}deg` }}
          />
        ))}

        {/* Energy Embers */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, -200], 
              x: [(i % 2 === 0 ? 50 : -50), (i % 2 === 0 ? 100 : -100)],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 4 + Math.random() * 2, 
              repeat: Infinity, 
              delay: i * 0.4 
            }}
            className="absolute w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_15px_orange]"
          />
        ))}
      </div>

      {/* Divine Ground Shadow */}
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mt-12 w-48 h-4 bg-amber-600/40 blur-2xl rounded-full" 
      />
    </motion.div>
  );
};
