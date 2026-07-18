"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import localFont from 'next/font/local';
import { projects } from '@/lib/projects';
import { User, Archive } from 'lucide-react';
import { useRouter } from 'next/navigation';

const neue = localFont({ src: '../../public/NeueMontreal-Medium.otf' });

const orbitItems = [
  ...projects.slice(0, 5).map(p => ({
    id: p.title,
    title: p.title,
    image: p.image,
    link: p.href
  })),
  { id: 'about', title: 'About Me', icon: User, link: '/about' },
  { id: 'archive', title: 'Archive', icon: Archive, link: '/archive' }
];

const Eye = ({ mouseX, mouseY, offsetX, isBlinking }: { mouseX: any, mouseY: any, offsetX: number, isBlinking: boolean }) => {
  const pupilX = useTransform(mouseX, (x: number) => {
    if (typeof window === 'undefined') return 0;
    const centerX = window.innerWidth / 2 + offsetX;
    const delta = x - centerX;
    return Math.max(-16, Math.min(16, delta * 0.04));
  });
  
  const pupilY = useTransform(mouseY, (y: number) => {
    if (typeof window === 'undefined') return 0;
    const centerY = window.innerHeight / 2;
    const delta = y - centerY;
    return Math.max(-16, Math.min(16, delta * 0.04));
  });

  const smoothX = useSpring(pupilX, { stiffness: 400, damping: 25 });
  const smoothY = useSpring(pupilY, { stiffness: 400, damping: 25 });

  return (
    <motion.div 
      animate={{ scaleY: isBlinking ? 0.05 : 1 }}
      transition={{ duration: 0.1 }}
      className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full shadow-[inset_0_-4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center relative border-4 border-gray-100 overflow-hidden"
    >
      <motion.div 
        style={{ x: smoothX, y: smoothY }}
        className="w-8 h-8 md:w-12 md:h-12 bg-[#1a1a1a] rounded-full relative shadow-inner"
      >
        {/* Eye highlight */}
        <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-80" />
      </motion.div>
    </motion.div>
  );
};

const AnimatedEyes = ({ swallowing, isDraggingAny }: { swallowing: boolean, isDraggingAny: boolean }) => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center gap-4 md:gap-6 z-20 pointer-events-none drop-shadow-xl"
      animate={swallowing ? { scale: [1, 1.5, 0.8, 1.2, 1], rotate: [0, -5, 5, -5, 0] } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="flex gap-4 md:gap-6">
        <Eye mouseX={mouseX} mouseY={mouseY} offsetX={-45} isBlinking={isBlinking} />
        <Eye mouseX={mouseX} mouseY={mouseY} offsetX={45} isBlinking={isBlinking} />
      </div>
      
      {/* Animated Mouth */}
      <motion.div 
        className="bg-white shadow-[inset_0_-4px_12px_rgba(0,0,0,0.15)] border-4 border-gray-100 flex items-center justify-center overflow-hidden"
        initial={{ width: 40, height: 12, borderRadius: "50px" }}
        animate={swallowing 
          ? { 
              width: [40, 100, 60, 80, 40], 
              height: [12, 80, 30, 60, 12], 
              borderRadius: ["50px", "40px", "50px", "40px", "50px"] 
            } 
          : isDraggingAny
          ? { width: 60, height: 40, borderRadius: "50px" }
          : { width: 40, height: 12, borderRadius: "50px" }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div 
          className="bg-[#1a1a1a] rounded-full shadow-inner"
          animate={swallowing 
            ? { width: '80%', height: '80%' } 
            : isDraggingAny 
            ? { width: '70%', height: '70%' } 
            : { width: '60%', height: '60%' }
          }
        />
      </motion.div>
    </motion.div>
  );
};

export default function LandingPage3() {
  const [textState, setTextState] = useState<'hidden' | 'visible'>('hidden');
  const [swallowing, setSwallowing] = useState(false);
  const [isDraggingAny, setIsDraggingAny] = useState(false);
  const router = useRouter();

  const orbitRadius = 260; 
  const angleOffset = useRef(0);
  const isDraggingGlobal = useRef(false);
  
  const itemXs = useRef(orbitItems.map(() => useMotionValue(0))).current;
  const itemYs = useRef(orbitItems.map(() => useMotionValue(0))).current;
  const itemDragging = useRef(orbitItems.map(() => false)).current;

  // Auto show/hide text loop since we removed the video
  useEffect(() => {
    const showTextTimeout = setTimeout(() => setTextState('visible'), 2000);
    const hideTextTimeout = setTimeout(() => setTextState('hidden'), 8000);
    return () => {
      clearTimeout(showTextTimeout);
      clearTimeout(hideTextTimeout);
    };
  }, []);

  useAnimationFrame((time, delta) => {
    if (isDraggingGlobal.current) return;
    
    angleOffset.current += delta * 0.0003; 
    
    orbitItems.forEach((_, i) => {
      if (itemDragging[i]) return;
      
      const angle = (i / orbitItems.length) * 2 * Math.PI + angleOffset.current;
      itemXs[i].set(Math.cos(angle) * orbitRadius);
      itemYs[i].set(Math.sin(angle) * orbitRadius);
    });
  });

  const handleDragStart = (i: number) => {
    isDraggingGlobal.current = true;
    itemDragging[i] = true;
    setIsDraggingAny(true);
  };

  const handleDragEnd = async (i: number, item: typeof orbitItems[0]) => {
    isDraggingGlobal.current = false;
    itemDragging[i] = false;
    setIsDraggingAny(false);
    
    const currentX = itemXs[i].get();
    const currentY = itemYs[i].get();
    const distanceToCenter = Math.sqrt(currentX * currentX + currentY * currentY);

    if (distanceToCenter < 120) {
      setSwallowing(true);
      
      // Wait for swallowing animation
      setTimeout(() => {
        router.push(item.link);
      }, 600);
    }
  };

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative" 
      style={{ backgroundColor: '#FFD392' }}
    >
      <AnimatePresence>
        {textState === 'visible' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1 }}
            className={`absolute top-1/4 md:top-32 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4 ${neue.className}`}
          >
            <h1 className="text-3xl md:text-5xl text-gray-900 tracking-tight leading-tight">
              hi im aminul, a product designer,
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex items-center justify-center w-full h-[600px]">
        {orbitItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute flex items-center justify-center z-30 cursor-grab active:cursor-grabbing"
            style={{ x: itemXs[i], y: itemYs[i] }}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            onDragStart={() => handleDragStart(i)}
            onDragEnd={() => handleDragEnd(i, item)}
            whileHover={{ scale: 1.1 }}
            whileDrag={{ scale: 1.2, zIndex: 50 }}
            initial={false}
          >
            <div className="relative flex flex-col items-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/50 backdrop-blur-md shadow-lg border border-white/40 flex items-center justify-center overflow-hidden transition-colors group-hover:bg-white/80">
                {'image' in item && item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover pointer-events-none" />
                ) : 'icon' in item && item.icon ? (
                  <item.icon className="w-8 h-8 text-gray-700 pointer-events-none" />
                ) : null}
              </div>
              <div className={`absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded-md pointer-events-none ${neue.className}`}>
                {item.title}
              </div>
            </div>
          </motion.div>
        ))}

        <AnimatedEyes swallowing={swallowing} isDraggingAny={isDraggingAny} />
      </div>

      <AnimatePresence>
        {textState === 'visible' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1 }}
            className={`absolute bottom-1/4 md:bottom-32 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4 ${neue.className}`}
          >
            <p className="text-xl md:text-3xl text-gray-800">
              welcome to my corner of the internet
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
