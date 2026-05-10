import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { REALMS, REALM_1, FULL_SEQUENCE } from './constants';
import { Realm } from './components/Realm';
import { Character } from './components/Character';
import { Character3 } from './components/Character3';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

export default function App() {
  const [characterX, setCharacterX] = useState(100);
  const [depthZ, setDepthZ] = useState(0); 
  const [currentRealmIndex, setCurrentRealmIndex] = useState(0); 
  const [unlockedRealms, setUnlockedRealms] = useState<number[]>([10]);
  const [isFinished, setIsFinished] = useState(false);
  const [showRealm1, setShowRealm1] = useState(false);
  const [pullingBack, setPullingBack] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [facing, setFacing] = useState<1 | -1>(1); // 1 = Right, -1 = Left
  
  const worldRef = useRef<HTMLDivElement>(null);
  const moveInterval = useRef<NodeJS.Timeout | null>(null);

  // Constants for navigation
  const REALM_WIDTH = window.innerWidth;
  const REALM_DEPTH = 2000; 
  const TOTAL_REALMS = REALMS.length; 
  const MAX_Z = (TOTAL_REALMS + 1) * REALM_DEPTH;
  const TOTAL_REALMS_BEFORE_REVEAL = REALMS.length;

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (pullingBack) return;
      
      const step = 50; 
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setIsMoving(true);
        setFacing(1);
        move(step);
      }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setIsMoving(true);
        setFacing(-1);
        move(-step);
      }
    };

    const handleKeyUp = () => {
      setIsMoving(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [depthZ, pullingBack]);

  const move = (amount: number) => {
    setCharacterX((prev) => {
      const next = Math.max(0, prev + amount);
      
      const currentIdx = Math.floor(next / REALM_WIDTH);
      
      if (currentIdx < REALMS.length) {
        const realmId = REALMS[currentIdx].id;
        if (!unlockedRealms.includes(realmId)) {
          setUnlockedRealms(prev => [...prev, realmId]);
        }
        setCurrentRealmIndex(currentIdx);
      }

      // If passing through the last realm portal
      if (currentIdx === TOTAL_REALMS - 1 && next > (TOTAL_REALMS - 1) * REALM_WIDTH + REALM_WIDTH * 0.8) {
         if (!isFinished) {
            handleReachEnd();
         }
      }
      return next;
    });
  };

  const startMoving = (amount: number) => {
    if (pullingBack) return;
    setIsMoving(true);
    setFacing(amount > 0 ? 1 : -1);
    stopMoving();
    move(amount);
    moveInterval.current = setInterval(() => move(amount), 30);
  };

  const stopMoving = () => {
    setIsMoving(false);
    if (moveInterval.current) {
      clearInterval(moveInterval.current);
      moveInterval.current = null;
    }
  };

  const handleReachEnd = async () => {
    setIsFinished(true);
    // Move character to exact starting position of Realm 2 relationship
    setCharacterX((TOTAL_REALMS_BEFORE_REVEAL - 1) * REALM_WIDTH + REALM_WIDTH * 0.5);
    
    // Reveal Realm 1
    await new Promise(r => setTimeout(r, 1000));
    setShowRealm1(true);
    setUnlockedRealms(prev => [...prev, 1]);

    // Dramatic pause before pullback
    await new Promise(r => setTimeout(r, 3000));
    setPullingBack(true);
  };

  const renderHUD = () => (
    <AnimatePresence>
      {!pullingBack && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-start z-[100] pointer-events-none"
        >
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-white/80">The Walk of One</h1>
            <p className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.2em]">Current: Realm {REALMS[currentRealmIndex]?.id || '?'}</p>
          </div>
          
          <div className="flex flex-col items-end gap-2 md:gap-4">
             <div className="flex gap-1 md:gap-2">
               {REALMS.map((r) => (
                 <div 
                   key={r.id} 
                   className={`h-1 w-4 md:w-8 transition-all ${unlockedRealms.includes(r.id) ? 'bg-white' : 'bg-white/20'}`} 
                 />
               ))}
               <div className={`h-1 w-4 md:w-8 transition-all ${showRealm1 ? 'bg-white' : 'bg-white/20'}`} />
             </div>
             <p className="text-[8px] md:text-[10px] font-mono text-white/30 uppercase">
               {isMobile ? 'Hold Left/Right to Walk' : 'Use Arrows or WASD to Walk'}
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderMobileControls = () => (
    <AnimatePresence>
      {isMobile && !pullingBack && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-0 left-0 w-full h-32 flex justify-between px-6 pb-6 z-[150] pointer-events-none"
        >
          <button 
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={() => startMoving(-50)}
            onTouchEnd={stopMoving}
            className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center pointer-events-auto active:scale-95 active:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button 
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={() => startMoving(50)}
            onTouchEnd={stopMoving}
            className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center pointer-events-auto active:scale-95 active:bg-white/20 transition-all"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black font-sans">
      <AnimatePresence>
        {showTitle && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-10"
          >
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="flex flex-col items-center gap-4"
             >
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-[1em] uppercase ml-[1em] drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                  PILGRIMAGE
                </h1>
                <div className="h-px w-32 bg-white/20" />
                <span className="text-[10px] md:text-sm font-mono text-white/30 tracking-[0.5em] uppercase">
                  A Cinematic Odyssey through Numbers
                </span>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {renderHUD()}
      {renderMobileControls()}

      {/* Main World Container */}
      <motion.div
        ref={worldRef}
        className="flex h-full items-center min-w-full"
        animate={{ 
          x: pullingBack ? 0 : -Math.max(0, characterX - window.innerWidth / 2.5),
          scale: pullingBack ? (isMobile ? 0.25 : 0.35) : 1,
        }}
        transition={{ 
          type: 'spring', 
          damping: 25, 
          stiffness: 120,
          scale: { duration: 2, ease: "easeInOut" }
        }}
        style={{ 
          transformOrigin: 'center center',
          width: pullingBack ? '100%' : 'auto',
          justifyContent: pullingBack ? 'center' : 'flex-start',
          position: 'absolute',
          left: 0,
          top: 0,
          right: pullingBack ? 0 : 'auto'
        }}
      >
        {pullingBack ? (
          // Final Pullback Sequence
          <div className="flex flex-row items-center gap-2">
            {[REALM_1, ...[...REALMS].reverse()].map((realm) => (
              <motion.div 
                key={realm.id} 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (realm.id === 1 ? 0 : (11 - realm.id) * 0.1) }}
              >
                <Realm
                  id={realm.id}
                  number={realm.number}
                  style={realm.style}
                  isUnlocked={true}
                  width={140}
                />
                {realm.id === 2 && (
                  <div className="absolute inset-x-0 bottom-1/4 flex items-center justify-center pointer-events-none scale-[0.4] origin-bottom">
                    <Character x={0} isStatic={false} />
                  </div>
                )}
                {realm.id === 1 && (
                  <div className="absolute inset-x-0 bottom-1/4 flex items-center justify-center pointer-events-none scale-[0.4] origin-bottom translate-x-12">
                     <div className="relative scale-150">
                        <Character3 />
                     </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          // Walking Phase
          <>
            {REALMS.map((realm) => (
              <Realm
                key={realm.id}
                id={realm.id}
                number={realm.number}
                style={realm.style}
                isUnlocked={unlockedRealms.includes(realm.id)}
                width={REALM_WIDTH}
              />
            ))}

            <AnimatePresence>
              {showRealm1 && (
                <motion.div
                  key="realm1"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: REALM_WIDTH, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="relative h-full overflow-hidden shrink-0 border-l border-white/20"
                >
                  <Character3 />
                  <Realm
                    id={REALM_1.id}
                    number={REALM_1.number}
                    style={REALM_1.style}
                    isUnlocked={unlockedRealms.includes(1)}
                    width={REALM_WIDTH}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Character x={characterX} isMoving={isMoving} facing={facing} />
          </>
        )}
      </motion.div>

      {/* Final Sequence Text */}
      <AnimatePresence>
        {pullingBack && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="fixed bottom-8 md:bottom-12 left-0 w-full flex flex-col items-center justify-center z-[200] gap-2 md:gap-4 px-4 text-center"
          >
             <div className="flex items-center gap-2 md:gap-4 text-white/50 font-mono tracking-widest uppercase text-[10px] md:text-sm">
                <span>Transcendence</span>
                <div className="h-[1px] w-8 md:w-12 bg-white/20" />
                <span>π</span>
             </div>
             <motion.div 
               animate={{ scale: [1, 1.02, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="text-[15vw] md:text-[12vw] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.4)]"
             >
               3.141592653
             </motion.div>
             <button 
               onClick={() => window.location.reload()}
               className="mt-4 md:mt-8 px-6 py-2 border border-white/20 rounded-full text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black active:bg-white active:text-black transition-all"
             >
               Restart Pilgrimage
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.8)_100%)] z-[10]" />
        <div className="absolute top-0 left-0 w-full h-[10%] bg-black z-[20] transition-all" style={{ opacity: pullingBack ? 0 : 0.8 }} />
        <div className="absolute bottom-0 left-0 w-full h-[10%] bg-black z-[20] transition-all" style={{ opacity: pullingBack ? 0 : 0.8 }} />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
}

