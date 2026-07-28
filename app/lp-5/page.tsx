"use client";

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
// import VoiceAgent from '@/components/VoiceAgent';
import MovingGrid from '@/components/MovingGrid';
import MermaidDiagram from '@/components/MermaidDiagram';
import { X, Volume2 } from 'lucide-react';
import projectNarration from '@/data/project-narration.json';
import projectImages from '@/data/project-images.json';
import ProjectCardViewer from '@/components/ProjectCardViewer';
import BorderGlow from '@/components/BorderGlow';
import { agentStore } from '@/lib/agent-store';
import GradualBlur from '@/components/GradualBlur';
import Grainient from '@/components/Grainient';

export default function LandingPage5() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<{mermaidCode: string, title: string} | null>(null);
  const [agentClient, setAgentClient] = useState<{ sendText: (text: string) => void, interrupt?: (text?: string) => void } | null>(null);

  const isAgentSpeaking = useSyncExternalStore(agentStore.subscribe, agentStore.getSnapshot, () => false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative">

      {/* Edge Blurs */}
      <GradualBlur position="top" height="8rem" zIndex={10} target="parent" curve="ease-in-out" />
      <GradualBlur position="bottom" height="8rem" zIndex={10} target="parent" curve="ease-in-out" />
      <GradualBlur position="left" width="8rem" zIndex={10} target="parent" curve="ease-in-out" />
      <GradualBlur position="right" width="8rem" zIndex={10} target="parent" curve="ease-in-out" />

      {/* Grainient Background (bottom half) */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] opacity-70 z-[5]">
        <Grainient 
          color1="#93c5fd" 
          color2="#a855f7" 
          color3="#e879f9" 
          warpAmplitude={40} 
          warpFrequency={2}
          noiseScale={3.5}
        />
        {/* Soft fade-out to white at the top edge of the gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none" />
      </div>

      {/* Background grid */}
      {/* <div className={`absolute inset-0 transition-all duration-[1800ms] ease-out opacity-100 scale-100 z-0`}>
        <MovingGrid />
      </div> */}

      {/* Bottom Navbar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-8 bg-white/50 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-8 py-3"
      >
        <Link href="/" className="text-sm font-semibold tracking-wide text-gray-800 hover:text-black transition-colors">Home</Link>
        <Link href="/work" className="text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors">Work</Link>
        <Link href="/about" className="text-sm font-medium tracking-wide text-gray-500 hover:text-black transition-colors">About Me</Link>
      </motion.div>

      {/* Hero text */}
      <AnimatePresence>
        <motion.div
          key="hero-text"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center w-full px-4"
          style={{ marginTop: '-200px' }}
        >
          <h1 className="text-4xl md:text-[3.5rem] font-medium text-black leading-tight tracking-tight">
            A new kind of web experience
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mt-2 md:mt-4">
            Hello! I am Aminul's AI. How can I help you today?
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Voice Agent UI */}
      {/* <div className="absolute inset-0 pointer-events-none z-50">
        <VoiceAgent
          onShowProject={setActiveProject}
          onShowDiagram={setActiveDiagram}
          onAgentReady={setAgentClient}
          isProjectActive={!!activeProject}
        />
      </div> */}
      {/* Project Card Viewer */}
      {activeProject && (
        <div className="fixed inset-0 flex items-center justify-center z-[80] animate-in fade-in zoom-in-95 duration-700 pointer-events-none">
           <ProjectCardViewer 
             slug={activeProject} 
             onNarrationRequest={(t) => agentClient?.sendText(t)}
             onClose={() => {
               setActiveProject(null);
               agentClient?.interrupt?.("The user closed the project page and returned to the home screen. Acknowledge this briefly.");
             }}
           />
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
