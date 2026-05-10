
import React from 'react';
import { motion } from 'motion/react';

interface CharacterProps {
  x: number;
  isMoving?: boolean;
  facing?: 1 | -1;
  isStatic?: boolean;
}

export const Character: React.FC<CharacterProps> = ({ x, isMoving, facing = 1, isStatic }) => {
  if (isStatic) {
    return (
      <div className="flex flex-col items-center opacity-0">
        <span className="text-7xl font-bold">1</span>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute bottom-1/4 left-0 -ml-8 z-50 flex flex-col items-center"
      animate={{ 
        x,
        y: isMoving ? [0, -20, 0] : [0, -10, 0],
        rotateY: facing === 1 ? 0 : 180,
        rotateZ: isMoving ? (facing === 1 ? [0, 8, -4, 0] : [0, -8, 4, 0]) : 0,
        scaleX: isMoving ? [1, 1.15, 0.85, 1] : [1, 1.04, 1],
        scaleY: isMoving ? [1, 0.85, 1.15, 1] : [1, 0.96, 1],
      }}
      transition={{ 
        x: { type: 'spring', damping: 25, stiffness: 120 },
        y: { repeat: Infinity, duration: isMoving ? 0.35 : 3.5, ease: "easeInOut" },
        rotateY: { duration: 0.5, ease: "circOut" },
        rotateZ: { repeat: Infinity, duration: 0.35, ease: "easeInOut" },
        scaleX: { repeat: Infinity, duration: isMoving ? 0.35 : 3.5 },
        scaleY: { repeat: Infinity, duration: isMoving ? 0.35 : 3.5 },
      }}
    >
      <div className="relative group [perspective:1000px]">
        {/* Dynamic Cinematic Trail */}
        {isMoving && (
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.2 + i * 0.1, 
                  x: facing === 1 ? -40 - i * 20 : 40 + i * 20,
                  filter: `blur(${4 + i * 4}px)`
                }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.12,
                  ease: "easeOut"
                }}
                className="absolute inset-0 text-8xl md:text-9xl font-black text-blue-400 font-mono pointer-events-none select-none"
              >
                1
              </motion.div>
            ))}
          </div>
        )}

        {/* Core Mythic Glow */}
        <motion.div 
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 -m-10 bg-blue-500 blur-3xl rounded-full" 
        />
        
        {/* Floating Particles Around Character */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -60, 0], 
              x: [(i % 2 === 0 ? 30 : -30), (i % 2 === 0 ? -10 : 10), (i % 2 === 0 ? 30 : -30)],
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity, 
              delay: i * 0.3 
            }}
            className="absolute w-1 h-1 bg-white rounded-full bg-blue-100 shadow-[0_0_10px_white]"
          />
        ))}

        {/* The Animated "1" Persona */}
        <div className="relative">
          <motion.span 
            animate={{ skewX: isMoving ? [0, -3, 3, 0] : 0 }}
            transition={{ duration: 0.45, repeat: Infinity }}
            className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,1)] font-mono selection:bg-none"
          >
            1
          </motion.span>
          
          {/* Energy Surge */}
          <motion.div 
            animate={{ 
              height: ['0%', '120%', '0%'], 
              top: ['110%', '-10%', '110%'],
              opacity: [0, 0.8, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "circIn" }}
            className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-t from-transparent via-blue-100 to-transparent blur-[1px]"
          />
        </div>

        {/* Cinematic Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-px bg-white/10 blur-[2px] rotate-45" />
      </div>
      
      {/* Ground Contact / Shadow */}
      <motion.div 
        animate={{ 
          scaleX: isMoving ? [0.7, 1.3, 0.7] : [1, 1.1, 1], 
          opacity: isMoving ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1],
          filter: isMoving ? "blur(4px)" : "blur(12px)"
        }}
        transition={{ duration: isMoving ? 0.35 : 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 w-24 h-3 bg-blue-600 rounded-full shadow-[0_0_30px_blue]" 
      />
    </motion.div>
  );
};
