
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RealmStyle } from '../types';

interface RealmProps {
  id: number;
  number: number;
  style: RealmStyle;
  isUnlocked: boolean;
  width: number;
}

export const Realm: React.FC<RealmProps> = ({ id, number, style, isUnlocked, width }) => {
  const [phase, setPhase] = useState<'idle' | 'destabilizing' | 'stabilizing' | 'stable'>('idle');
  const isSmall = width < 500; // Threshold for pullback view

  useEffect(() => {
    if (isUnlocked && phase === 'idle') {
      triggerSequence();
    }
  }, [isUnlocked]);

  const triggerSequence = async () => {
    setPhase('destabilizing');
    await new Promise((r) => setTimeout(r, 1000));
    setPhase('stabilizing');
    await new Promise((r) => setTimeout(r, 1500));
    setPhase('stable');
  };

  const textClass = isSmall ? "text-6xl" : "text-9xl md:text-[15vw]";
  const largeTextClass = isSmall ? "text-7xl" : "text-9xl md:text-[20vw]";

  const renderGround = () => {
    switch (style) {
      case 'cosmic_starfield':
        return (
          <div className="absolute inset-x-0 bottom-0 h-32">
            <div className="absolute top-0 left-0 w-full h-px bg-white/20 blur-sm" />
            <motion.div 
               animate={{ opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" 
            />
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: Math.random() * 100 + "%", y: 20 + Math.random() * 60 }}
                animate={{ y: [0, -10, 0], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
                className="absolute w-1 h-1 bg-blue-200 rounded-full blur-[1px]"
              />
            ))}
          </div>
        );
      case 'holographic_reactor':
        return (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-neutral-900 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-cyan-400 shadow-[0_0_15px_cyan]" />
            <div className="grid grid-cols-6 h-full opacity-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border-r border-cyan-500 transform skew-x-12" />
              ))}
            </div>
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-32 h-px bg-cyan-300 blur-sm"
            />
          </div>
        );
      case 'waveform_synth':
        return (
          <div className="absolute inset-x-0 bottom-0 h-40 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-pink-500/30 blur-md" />
            <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-end gap-1 px-4">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['20%', (Math.random() * 80 + 20) + '%', '20%'] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                  className="flex-1 bg-pink-500/20"
                />
              ))}
            </div>
          </div>
        );
      case 'fluid_simulation':
        return (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-sky-950/20 backdrop-blur-3xl overflow-hidden">
            <motion.div 
              animate={{ x: ['-20%', '0%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:40px_40px]"
            />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" />
          </div>
        );
      case 'catch_number':
        return (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-neutral-900 flex items-end justify-center [perspective:1000px]">
             <div className="w-full h-full bg-neutral-950 transform rotateX-45 border-t border-white/10 shadow-[0_-20px_50px_rgba(255,255,255,0.05)]" />
             <div className="absolute inset-0 flex justify-around items-center px-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                    className="w-12 h-12 border border-white/20 rotate-45 shrink-0" 
                  />
                ))}
             </div>
          </div>
        );
      case 'procedural_creature':
        return (
          <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden bg-neutral-950">
             <motion.div 
               animate={{ x: [0, -400] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="flex h-full w-[200%] gap-4 p-4"
             >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-16 h-full bg-white/5 rounded-full blur-xl border border-white/10" />
                ))}
             </motion.div>
             <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
          </div>
        );
      case 'brushstroke_painter':
        return (
          <div className="absolute inset-x-0 bottom-0 h-32">
            <div className="absolute top-0 left-0 w-full h-4 bg-neutral-100/5 blur-xl" />
            <div className="absolute inset-0 bg-neutral-900 border-t-8 border-neutral-800 transform -skew-y-3 translate-y-4" />
          </div>
        );
      case 'mood_crystal':
        return (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-neutral-900">
             <div className="absolute inset-0 bg-emerald-950/20 [clip-path:polygon(0%_100%,_10%_0%,_30%_80%,_50%_20%,_70%_90%,_90%_10%,_100%_100%)] opacity-30" />
             <div className="absolute top-0 left-0 w-full h-px bg-emerald-400/40 shadow-[0_0_20px_emerald]" />
          </div>
        );
      case 'quantum_dice':
        return (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-black border-t border-white/10">
             <div className="flex h-full opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ backgroundColor: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0)'] }}
                    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() }}
                    className="flex-1 border-r border-white/5" 
                  />
                ))}
             </div>
          </div>
        );
      case 'emotion_gauge':
        return (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-neutral-900">
             <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40" />
             <div className="flex h-full items-center justify-around px-12 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-px h-full bg-white" />
                ))}
             </div>
          </div>
        );
      default:
        return <div className="absolute inset-x-0 bottom-0 h-8 bg-white/5" />;
    }
  };

  const renderEnvironment = () => {
    switch (style) {
      case 'cosmic_starfield':
        return (
          <div className="absolute inset-0 overflow-hidden bg-black">
             {/* Nebula effect */}
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
               transition={{ duration: 15, repeat: Infinity }}
               className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,_#3b82f6_0%,_transparent_50%)]" 
             />
             <div className="absolute inset-0 space-y-12 py-20 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 5 + i, repeat: Infinity, repeatType: "reverse" }}
                    className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                  />
                ))}
             </div>
          </div>
        );
      case 'holographic_reactor':
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[150%] h-[150%] border-cyan-500/20 border-[80px] rounded-full animate-spin [animation-duration:40s]" />
            <div className="absolute w-[120%] h-[120%] border-white/5 border-[1px] rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse]" />
          </div>
        );
      case 'waveform_synth':
        return (
          <div className="absolute inset-0 opacity-10">
             {Array.from({ length: 8 }).map((_, i) => (
               <motion.div 
                 key={i}
                 animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                 transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                 className="absolute inset-0 border-[2px] border-pink-500 rounded-full"
                 style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 40%' }}
               />
             ))}
          </div>
        );
      case 'fluid_simulation':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <motion.div 
               animate={{ 
                 borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%", "60% 40% 40% 60% / 60% 60% 40% 40%", "40% 60% 60% 40% / 40% 40% 60% 60%"],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-[100%] h-[100%] bg-blue-500/5 blur-[80px]"
             />
          </div>
        );
      default:
        return null;
    }
  };
  const renderStyleContent = () => {
    const isFinal = phase === 'stable';

    switch (style) {
      case 'emotion_gauge':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative ${isSmall ? 'w-20 h-20' : 'w-64 h-64'} border-2 border-white/10 rounded-full flex items-center justify-center`}>
               <motion.div 
                 animate={isFinal ? { scale: 1, opacity: 1 } : { scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className={`relative ${isSmall ? 'w-10 h-16' : 'w-32 h-48'} flex flex-col justify-between items-center opacity-30`}>
                    <div className="w-12 h-12 border-t-4 border-r-4 border-white/50 rounded-tr-full" />
                    <div className="w-12 h-4 border-r-4 border-white/50" />
                    <div className="w-12 h-12 border-b-4 border-r-4 border-white/50 rounded-br-full" />
                 </div>
               </motion.div>
               <motion.span 
                 initial={{ opacity: 0 }}
                 animate={isFinal ? { opacity: 1 } : {}}
                 className={`${textClass} font-bold text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
               >
                 {number}
               </motion.span>
            </div>
          </div>
        );
      case 'holographic_reactor':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute w-full h-full bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] bg-[length:100%_4px]" />
             <motion.div 
               animate={{ opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 0.1, repeat: Infinity }}
               className={`${textClass} font-mono text-cyan-400 opacity-20 filter blur-sm select-none`}
             >
               {isFinal ? number : '8'}
             </motion.div>
             <motion.span 
               animate={isFinal ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0], scale: 1.1 }}
               transition={isFinal ? {} : { duration: 0.5, repeat: Infinity }}
               className={`absolute ${textClass} font-bold text-cyan-500 drop-shadow-[0_0_15px_cyan]`}
             >
               {number}
             </motion.span>
          </div>
        );
      case 'cosmic_starfield':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: isSmall ? 10 : 50 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: Math.random() * width, y: Math.random() * 500 }}
                    animate={isFinal ? { 
                      x: (width / 2) + Math.cos(i * 0.5) * (isSmall ? 20 : 100), 
                      y: (250) + Math.sin(i * 0.5) * (isSmall ? 20 : 100),
                      scale: 1
                    } : {
                      scale: [0, 1, 0],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ duration: isFinal ? 1 : 2 + Math.random() * 3, repeat: isFinal ? 0 : Infinity }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                  />
                ))}
             </div>
             <motion.span 
               animate={isFinal ? { opacity: 1, scale: 1 } : { opacity: 0 }}
               className={`${isSmall ? 'text-7xl' : 'text-[22vw]'} font-black text-white/80 drop-shadow-[0_0_30px_white]`}
             >
               {number}
             </motion.span>
          </div>
        );
      case 'waveform_synth':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute bottom-1/2 w-full h-[1px] bg-white/20" />
             <div className="flex items-center gap-1">
                {Array.from({ length: isSmall ? 8 : 20 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={isFinal && i === (isSmall ? 4 : 10) ? { height: isSmall ? 80 : 300 } : { height: [20, 60, 20] }}
                    transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                    className={`w-1 bg-white ${isFinal && i === (isSmall ? 4 : 10) ? 'opacity-100' : 'opacity-20'}`}
                  />
                ))}
             </div>
             <motion.span 
               initial={{ opacity: 0, x: -50 }}
               animate={isFinal ? { opacity: 1, x: 0 } : {}}
               className={`absolute ${textClass} font-bold text-white tracking-widest`}
             >
               {number}
             </motion.span>
          </div>
        );
      case 'fluid_simulation':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
               transition={{ duration: 10, repeat: Infinity }}
               className={`absolute ${isSmall ? 'w-24 h-24' : 'w-[70%] h-[70%]'} bg-blue-900/10 rounded-full blur-[50px]`}
             />
             <motion.span 
               initial={{ opacity: 0 }}
               animate={isFinal ? { opacity: 1 } : { opacity: [0, 0.1, 0] }}
               transition={isFinal ? {} : { duration: 3, repeat: Infinity }}
               className={`${isSmall ? 'text-7xl' : 'text-[22vw]'} font-bold text-blue-200 drop-shadow-[0_0_40px_rgba(191,219,254,0.4)]`}
             >
               {number}
             </motion.span>
          </div>
        );
      case 'catch_number':
        return (
          <motion.span 
            initial={{ scale: 0, rotate: -180 }}
            animate={isFinal ? { scale: 1, rotate: 0 } : {}}
            className={`${textClass} font-bold text-white tracking-widest`}
          >
            {number}
          </motion.span>
        );
      case 'procedural_creature':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className={`absolute ${isSmall ? 'w-24 h-24' : 'w-[60%] h-[60%]'} border-4 border-dashed border-white/5 rounded-full`}
             />
             <motion.span 
               initial={{ opacity: 0, scale: 2 }}
               animate={isFinal ? { opacity: 1, scale: 1 } : {}}
               className={`${isSmall ? 'text-6xl' : 'text-[18vw]'} font-black text-white/90 drop-shadow-2xl`}
             >
               {number}
             </motion.span>
          </div>
        );
      case 'brushstroke_painter':
        return (
          <div className="absolute inset-0 flex items-center justify-center text-white">
             <motion.span 
               initial={{ opacity: 0, filter: 'blur(20px)' }}
               animate={isFinal ? { opacity: 1, filter: 'blur(0px)' } : {}}
               className={`${textClass} font-serif italic text-white drop-shadow-[5px_5px_0_#444]`}
             >
               {number}
             </motion.span>
          </div>
        );
      case 'mood_crystal':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className={`${isSmall ? 'w-24 h-40' : 'w-64 h-96'} bg-white/5 backdrop-blur-xl border border-white/10 [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
                <motion.span 
                  animate={isFinal ? { opacity: 1 } : { opacity: [0.1, 0.2, 0.1] }}
                  className={`${textClass} font-light text-white`}
                >
                  {number}
                </motion.span>
             </div>
          </div>
        );
       case 'quantum_dice':
        return (
          <motion.span 
             initial={{ opacity: 0, scale: 0.5 }}
             animate={isFinal ? { opacity: 1, scale: 1 } : {}}
             className={`${largeTextClass} font-black text-white drop-shadow-[0_0_60px_white]`}
           >
             {number}
           </motion.span>
        );
      default:
        return null;
    }
  };


  return (
    <motion.div 
      className="relative h-full border-r border-white/5 overflow-hidden shrink-0"
      style={{ width }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Realm ID Label */}
      <div className="absolute top-8 left-8 z-20 font-mono text-white/30 text-xs tracking-widest uppercase">
        Realm {id}
      </div>

      <AnimatePresence mode="wait">
        {isUnlocked ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full relative"
          >
            {/* World Environment Layer */}
            <div className="absolute inset-0 z-0">
               {renderEnvironment()}
            </div>

            {/* Central Number (The Goal) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {renderStyleContent()}
            </div>

            {/* Ground / Path Layer */}
            <div className="absolute bottom-0 left-0 w-full h-1/4 z-20">
               {renderGround()}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="lock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            className="w-full h-full flex items-center justify-center bg-black/90 backdrop-blur-xl relative"
          >
            {/* Grid background for locked realms */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]" />
            
            <div className="flex flex-col items-center gap-6 relative z-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-white/5 rounded-full flex items-center justify-center"
              >
                 <div className="w-12 h-12 border-t-2 border-white/20 rounded-full" />
              </motion.div>
              <div className="flex flex-col items-center gap-2">
                 <span className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase">Realm Restricted</span>
                 <span className="text-[8px] font-mono tracking-[0.2em] text-white/10 uppercase italic">Awaiting One's Progress</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};



