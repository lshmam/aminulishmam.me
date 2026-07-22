"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoiceAgent from '@/components/VoiceAgent';
import MovingGrid from '@/components/MovingGrid';
import MermaidDiagram from '@/components/MermaidDiagram';
import { X, Volume2 } from 'lucide-react';
import projectNarration from '@/data/project-narration.json';
import projectImages from '@/data/project-images.json';
import ProjectCardViewer from '@/components/ProjectCardViewer';

export default function LandingPage5() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<{mermaidCode: string, title: string} | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [micDone, setMicDone] = useState(false);
  const [volDone, setVolDone] = useState(false);
  const [agentClient, setAgentClient] = useState<{ sendText: (text: string) => void } | null>(null);

  const handleDragEnd = (_: any, info: any) => {
    // Swipe up ≥ 80px velocity or 100px distance triggers start
    if (!isStarted && (info.offset.y < -100 || info.velocity.y < -300)) {
      setIsStarted(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative">

      {/* Floating Glass Navbar */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-xl px-2 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex items-center justify-between transition-all duration-700 border ${
          activeProject 
            ? 'bg-gradient-to-r from-orange-500 to-purple-500 border-white/40 text-white shadow-xl scale-[1.02]' 
            : 'bg-white/40 backdrop-blur-xl border-white/50 text-gray-600'
        }`}
      >
        <div className="flex items-center justify-center gap-6 text-sm font-bold tracking-widest w-full uppercase">
          <button className="hover:opacity-80 transition-opacity">Work</button>
          <button className="hover:opacity-80 transition-opacity">About</button>
          {!activeProject && (
             <button className="px-5 py-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors ml-4">Connect</button>
          )}
        </div>
      </motion.div>

      {/* Background grid — invisible until started */}
      <div className={`absolute inset-0 transition-all duration-[1800ms] ease-out ${
        isStarted
          ? activeProject
            ? 'opacity-0 scale-[0.85] blur-xl translate-y-12'
            : 'opacity-100 scale-100'
          : 'opacity-100 scale-100'
      }`}>
        <MovingGrid />
      </div>

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
              Aminul’s Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 mt-2 md:mt-4">
              Designer. Founder. Engineer.
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
          className={`z-20 flex items-center justify-center ${
            isStarted
              ? 'flex-1 relative w-full -mt-8 md:-mt-16 cursor-grab active:cursor-grabbing'
              : 'fixed bottom-12 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing'
          } ${activeProject ? 'pointer-events-none' : ''}`}
          style={{ touchAction: 'none' }}
          whileDrag={{ scale: isStarted ? 1.02 : 1.04 }}
        >
          <div className="relative flex items-center justify-center">
            <VoiceAgent
              onShowProject={setActiveProject}
              onShowDiagram={setActiveDiagram}
              onAgentReady={setAgentClient}
            />
          </div>
        </motion.div>
      {/* Project Card Viewer */}
      {activeProject && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[80] animate-in fade-in zoom-in-95 duration-700 mt-12">
           <ProjectCardViewer 
             slug={activeProject} 
             onNarrationRequest={(t) => agentClient?.sendText(t)}
           />
           <button 
             onClick={() => {
               setActiveProject(null);
               agentClient?.sendText("The user closed the project page and returned to the home screen. Stop your previous narration and acknowledge that we are back on the main menu.");
             }} 
             className="absolute -top-16 right-0 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-2 rounded-full transition-colors z-[100]"
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

      {/* Action Buttons — only after started */}
      {isStarted && !activeProject && (
        <div className="absolute bottom-12 w-full flex flex-col items-center gap-4 z-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
          {!micDone && (
            <button 
              onClick={() => setMicDone(true)}
              className="group px-8 py-3.5 bg-white text-gray-900 rounded-full font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center min-w-[240px]"
            >
              <span className="group-hover:hidden flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                Turn on Microphone
              </span>
              <span className="hidden group-hover:block tracking-wide">
                Done?
              </span>
            </button>
          )}
          
          {!volDone && (
            <button 
              onClick={() => setVolDone(true)}
              className="group px-6 py-2.5 bg-gray-50/80 backdrop-blur-md text-gray-600 rounded-full font-medium text-sm hover:bg-gray-100/90 transition-colors flex items-center justify-center min-w-[180px]"
            >
              <span className="group-hover:hidden flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
                Turn up Volume
              </span>
              <span className="hidden group-hover:block tracking-wide">
                Done?
              </span>
            </button>
          )}


        </div>
      )}
    </main>
  );
}
