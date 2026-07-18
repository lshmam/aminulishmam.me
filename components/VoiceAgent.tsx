"use client";

import React, { useState, useEffect, useRef } from 'react';
import AnomalyOrb from './AnomalyOrb';
import { GeminiLiveClient, AgentState } from '@/lib/gemini-live-client';
import projectNarration from '@/data/project-narration.json';

export default function VoiceAgent() {
  const [isActive, setIsActive] = useState(false);
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  
  const clientRef = useRef<GeminiLiveClient | null>(null);

  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.stop();
      }
    };
  }, []);

  const toggleAgent = async () => {
    if (isActive) {
      // Turn off
      if (clientRef.current) {
        clientRef.current.stop();
        clientRef.current = null;
      }
      setIsActive(false);
      setAgentState('idle');
      setAudioLevel(0);
    } else {
      // Turn on
      setIsActive(true);
      setAgentState('idle'); // Will change to listening when ready
      
      const client = new GeminiLiveClient({
        systemInstruction: "You are the voice guide for Aminul's portfolio. Greet visitors, offer to show projects / talk about him / just chat. Use tools to navigate and narrate. Keep responses conversational and brief.",
        onStateChange: (state) => {
          setAgentState(state);
        },
        onAudioLevel: (level) => {
          // Smooth the audio level slightly
          setAudioLevel(prev => prev + (level - prev) * 0.4);
        },
        onToolCall: async (toolCall) => {
          if (toolCall.name === 'show_project') {
            const slug = (toolCall.args as any).slug;
            console.log(`Navigating to project: ${slug}`);
            // In a real app, you would use next/navigation router.push(\`/work/\${slug}\`)
            
            // Return context for the model to narrate
            const context = (projectNarration as any)[slug] || { intro: "I don't have much info on this project." };
            return { 
              success: true, 
              page: slug,
              contextToNarrate: context 
            };
          }
          
          if (toolCall.name === 'show_about') {
            console.log('Navigating to about page');
            return { success: true, page: 'about' };
          }
          
          if (toolCall.name === 'scroll_to_section') {
            const selector = (toolCall.args as any).selector;
            console.log(`Scrolling to section: ${selector}`);
            const el = document.querySelector(selector);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              return { success: true };
            }
            return { success: false, error: 'Section not found' };
          }
          
          return { success: false, error: 'Unknown tool' };
        }
      });
      
      clientRef.current = client;

      try {
        await client.connect();
        await client.startRecording();
      } catch (err) {
        console.error('Failed to start Voice Agent:', err);
        setIsActive(false);
        alert('Failed to connect to Voice Proxy. Is it running on port 8080?');
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center -mb-24 md:-mb-40">
      
      {/* Levitation Ground Shadow */}
      <div 
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] top-0 left-0 bg-black/40 rounded-full blur-2xl pointer-events-none"
        style={{
          transform: `translateY(160px) scaleY(0.25) scaleX(${isActive ? 1.0 + audioLevel * 0.5 : 0.8})`,
          transition: isActive ? 'none' : 'transform 0.5s ease-out'
        }}
      />

      {/* Drop shadow wrapper for the masked orb */}
      <div 
        className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] transition-all duration-300 z-10"
        style={{
          filter: isActive 
            ? `drop-shadow(0 0 60px rgba(255, 78, 66, ${0.4 + audioLevel}))` 
            : 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3))'
        }}
      >
        <button 
          onClick={toggleAgent}
          className="w-full h-full group focus:outline-none hover:opacity-90 transition-opacity absolute inset-0"
          style={{
            transform: isActive ? `scale(${1.0 + audioLevel * 0.2})` : 'scale(0.8)',
            transition: isActive ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          <AnomalyOrb audioLevel={audioLevel} />
          
          {/* Hover instruction overlay */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-[2px] transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
            <span className="text-white font-bold tracking-widest uppercase text-sm drop-shadow-md">
              Click to {isActive ? 'Stop' : 'Start Voice Agent'}
            </span>
          </div>
          
          {/* Agent State Indicator */}
          {isActive && (
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-50">
              <div className={`w-2 h-2 rounded-full ${agentState === 'speaking' ? 'bg-[#ff4e42] animate-pulse' : 'bg-green-400'}`} />
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                {agentState === 'speaking' ? 'Agent Speaking' : 'Listening...'}
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
