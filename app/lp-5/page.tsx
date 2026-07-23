"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import VoiceAgent from '@/components/VoiceAgent';
import MovingGrid from '@/components/MovingGrid';
import MermaidDiagram from '@/components/MermaidDiagram';
import { X, Volume2 } from 'lucide-react';
import projectNarration from '@/data/project-narration.json';
import projectImages from '@/data/project-images.json';
import ProjectCardViewer from '@/components/ProjectCardViewer';
import BorderGlow from '@/components/BorderGlow';
import { agentStore } from '@/lib/agent-store';
import { useSyncExternalStore } from 'react';
import GradualBlur from '@/components/GradualBlur';

export default function LandingPage5() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<{mermaidCode: string, title: string} | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [micDone, setMicDone] = useState(false);
  const [volDone, setVolDone] = useState(false);
  const [agentClient, setAgentClient] = useState<{ sendText: (text: string) => void, interrupt?: (text?: string) => void } | null>(null);
  
  const isAgentSpeaking = useSyncExternalStore(agentStore.subscribe, agentStore.getSnapshot, () => false);

  const handleDragEnd = (_: any, info: any) => {
    // Swipe up ≥ 80px velocity or 100px distance triggers start
    if (!isStarted && (info.offset.y < -100 || info.velocity.y < -300)) {
      setIsStarted(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative">

      {/* Edge Blurs */}
      <GradualBlur position="top" height="8rem" zIndex={10} target="parent" curve="ease-in-out" />
      <GradualBlur position="bottom" height="8rem" zIndex={10} target="parent" curve="ease-in-out" />
      <GradualBlur position="left" width="8rem" zIndex={10} target="parent" curve="ease-in-out" />
      <GradualBlur position="right" width="8rem" zIndex={10} target="parent" curve="ease-in-out" />

      {/* Background grid */}
      <div className={`absolute inset-0 transition-all duration-[1800ms] ease-out opacity-100 scale-100`}>
        <MovingGrid />
      </div>

      {/* Top Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-8 bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-8 py-3"
      >
        <Link href="/" className="text-sm font-semibold tracking-wide text-gray-800 hover:text-black transition-colors">Home</Link>
        <Link href="/work" className="text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors">Work</Link>
        <Link href="/about" className="text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors">About Me</Link>
      </motion.div>

      {/* Hero text — visible only before start */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            key="hero-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center"
            style={{ marginTop: '-200px' }}
          >
            <h1 className="text-4xl md:text-[3.5rem] font-medium text-black leading-tight tracking-tight">
              A new kind of web experience
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mt-2 md:mt-4">
              Use your voice to start
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe hint — visible only before start */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            key="swipe-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-6 flex flex-col items-center gap-1 pointer-events-none z-10"
          >
            <span className="text-sm text-gray-900 tracking-wide font-medium relative z-50 mix-blend-color-burn">Swipe up to start</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── THE ORB (same one, always rendered) ──────────────────────────── */}
      <motion.div
          key="main-orb-agent"
          drag={!isStarted ? 'y' : true}
          dragMomentum={false}
          dragSnapToOrigin={true}
          dragConstraints={isStarted ? undefined : { top: -600, bottom: 20 }}
          onDragEnd={handleDragEnd}
          animate={{
            y: isStarted ? (activeProject ? 200 : 0) : 120,
            scale: isStarted ? (activeProject ? 0 : 1) : 1.8,
            opacity: isStarted ? (activeProject ? 0 : 1) : 1
          }}
          initial={{ y: 200, scale: 1.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.1 }}
          className={`z-20 absolute left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing ${
            isStarted ? 'top-1/2 -translate-y-1/2 mt-[-50px]' : 'bottom-20'
          } ${activeProject ? 'pointer-events-none' : ''}`}
          style={{ touchAction: 'none' }}
          whileDrag={{ scale: isStarted ? 1.02 : 1.04 }}
        >
          <div className="relative flex items-center justify-center">
            <VoiceAgent
              onShowProject={setActiveProject}
              onShowDiagram={setActiveDiagram}
              onAgentReady={setAgentClient}
              isProjectActive={!!activeProject}
            />
          </div>
        </motion.div>
      {/* Project Card Viewer */}
      {activeProject && (
        <div className="fixed inset-0 flex items-center justify-center z-[80] animate-in fade-in zoom-in-95 duration-700 pointer-events-none">
           <ProjectCardViewer 
             slug={activeProject} 
             onNarrationRequest={(t) => agentClient?.sendText(t)}
           />
           <button 
             onClick={() => {
               setActiveProject(null);
               agentClient?.interrupt?.("The user closed the project page and returned to the home screen. Acknowledge this briefly.");
             }} 
             className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-2 rounded-full transition-colors z-[100] pointer-events-auto"
           >
             <X className="text-gray-500 hover:text-gray-900" size={24} />
           </button>
        </div>
      )}



      {/* Diagram Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center transition-all duration-700 pointer-events-none ${activeDiagram ? 'opacity-100' : 'opacity-0'}`}>
        {activeDiagram && (
          <div className="w-full max-w-5xl px-8">
            <MermaidDiagram chart={activeDiagram.mermaidCode} title={activeDiagram.title} />
          </div>
        )}
      </div>
    </main>
  );
}
