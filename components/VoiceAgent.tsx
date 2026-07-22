"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import AnomalyOrb from './AnomalyOrb';
import FluidGlassLens from './FluidGlassLens';
import TurnstileWidget from './TurnstileWidget';
import BubbleMenu, { MenuItem } from './BubbleMenu';
import BlurText from './BlurText';
import { GeminiLiveClient, AgentState } from '@/lib/gemini-live-client';
import projectNarration from '@/data/project-narration.json';
import projectImages from '@/data/project-images.json';

interface VoiceAgentProps {
  onShowProject?: (slug: string | null) => void;
  onShowImage?: (image: {path: string, description: string} | null) => void;
  onShowDiagram?: (diagram: { mermaidCode: string, title: string } | null) => void;
  onAgentReady?: (agent: { sendText: (text: string) => void }) => void;
}

export default function VoiceAgent({ 
  onShowProject,
  onShowImage,
  onShowDiagram,
  onAgentReady
}: VoiceAgentProps) {
  const [isActive, setIsActive] = useState(false);
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [audioLevel, setAudioLevel] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState<string | null>('localhost-dev-token'); // Turnstile bypassed
  const [finalTranscript, setFinalTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [sentenceId, setSentenceId] = useState(0);
  const [mounted, setMounted] = useState(false);
  const clearTranscriptRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef<boolean>(false);
  const clientRef = useRef<GeminiLiveClient | null>(null);

  const fetchProjectContext = async (slug: string) => {
    try {
      const response = await fetch(`/work/${slug}`);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      doc.querySelectorAll('script, style, noscript').forEach(s => s.remove());
      const mainContent = doc.querySelector('article, main')?.textContent || doc.body.textContent || '';
      const cleanText = mainContent.replace(/\s+/g, ' ').trim().substring(0, 3000);
      const imagesList = (projectImages as any)[slug] || (projectImages as any)['default'];
      const imagesContext = imagesList ? `\n\nAvailable Images for this project:\n` + imagesList.map((img: any, idx: number) => `Index ${idx}: ${img.description}`).join('\n') : '';

      const presentationPrompt = `
You are now in FULL PRESENTATION MODE. Give an actual, engaging pitch of this project as if you are presenting to a hiring manager. 
CRITICAL: You MUST sequence your speech with visual tool calls to create a "wow factor" continuous walkthrough. 
1. Intro: Hook the listener and immediately call show_image for the hero shot (usually Index 0).
2. Body: Narrate the core problem/architecture while calling show_image for a relevant diagram/screenshot, or scroll_to_section if applicable.
3. Outcome: Pitch the results and metrics, calling show_image for the final graphic.

IMPORTANT: When you call show_image, the image will be displayed on screen AND a video frame of it will be instantly streamed to your vision. You MUST genuinely look at the image and react to what you actually see (colors, UI elements, structure) rather than just reading canned facts!
Additionally, if the user asks how a complex pipeline or architecture works (e.g., "how does the call scoring pipeline work"), use the 'render_diagram' tool to dynamically draw it out for them on-screen using Mermaid syntax while you explain it!

Project Page Content:
${cleanText}${imagesContext}`;

      return presentationPrompt;
    } catch (err) {
      console.error("Failed to fetch project context", err);
      const fallback = (projectNarration as any)[slug] || { intro: "I don't have much info on this project." };
      const imagesList = (projectImages as any)[slug] || (projectImages as any)['default'];
      const imagesContext = imagesList ? `\n\nAvailable Images for this project (you can use the show_image tool to display them):\n` + imagesList.map((img: any, idx: number) => `Index ${idx}: ${img.description}`).join('\n') : '';
      return (typeof fallback === 'string' ? fallback : JSON.stringify(fallback)) + imagesContext;
    }
  };

  const handleUIProjectOpen = async (slug: string) => {
    if (onShowProject) onShowProject(slug);
    if (clientRef.current?.isConnected) {
      const context = await fetchProjectContext(slug);
      clientRef.current.sendText(`I just navigated to the project "${slug}". ${context}`);
    }
  };

  const startPress = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    }
    isLongPress.current = false;
    pressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setIsMenuOpen(true);
    }, 600); // 600ms for long press
  };

  const cancelPress = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
  };

  const endPress = (e: React.MouseEvent | React.TouchEvent) => {
    cancelPress();
    
    if (isLongPress.current) {
      // The user just released the long press. The bubbles will leave.
      setIsMenuOpen(false);
      
      // Try to find if they released over a project bubble
      let clientX, clientY;
      if ('changedTouches' in e && e.changedTouches.length > 0) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      if (clientX !== undefined && clientY !== undefined) {
        // Find the element at the release coordinates
        const target = document.elementFromPoint(clientX, clientY);
        const link = target?.closest('a.pill-link');
        
        if (link) {
          const slug = link.getAttribute('data-slug');
          if (slug) {
            handleUIProjectOpen(slug);
          }
        }
      }
    } else {
      // Only toggle Voice Agent if it wasn't a long press
      toggleAgent();
    }
  };

  const menuItems: MenuItem[] = [
    { label: 'Neucler', slug: 'neucler', rotation: -8, color: '#3b82f6' },
    { label: 'Faeth Studio', slug: 'faeth-studio', rotation: 8, color: '#10b981' },
    { label: 'Jim Coach', slug: 'jim-coach', rotation: -8, color: '#f59e0b' },
    { label: 'Arrive', slug: 'arrive', rotation: 8, color: '#ef4444' },
    { label: 'Mytrials', slug: 'mytrials', rotation: -8, color: '#8b5cf6' },
    { label: 'Neta Bridge', slug: 'neta-bridge', rotation: 8, color: '#06b6d4' }
  ].map(p => ({
    label: p.label,
    slug: p.slug,
    href: '#',
    rotation: p.rotation,
    hoverStyles: { bgColor: p.color, textColor: '#ffffff' },
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      handleUIProjectOpen(p.slug);
    }
  }));

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
      setFinalTranscript('');
      setInterimTranscript('');
    } else {
      // Turn on
      setIsActive(true);
      setAgentState('idle'); // Will change to listening when ready
      setFinalTranscript('');
      setInterimTranscript('');
      setSentenceId(0);

      // Fetch secure Deepgram API Key from the backend
      let dgKey = null;
      try {
        const authRes = await fetch('/api/deepgram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: turnstileToken || 'localhost-dev-token' })
        });
        const authData = await authRes.json();
        if (authRes.ok && authData.key) {
          dgKey = authData.key;
        } else {
          console.warn("Deepgram key fetch failed:", authData);
        }
      } catch (err) {
        console.error("Deepgram fetch error:", err);
      }
      
      const client = new GeminiLiveClient({
        turnstileToken: turnstileToken,
        deepgramKey: dgKey,
        systemInstruction: "You are the voice guide for Aminul's portfolio. Greet visitors, offer to show projects / talk about him / just chat. Use tools to navigate and narrate. Keep responses conversational and brief.",
        onStateChange: (state) => {
          console.log('[VoiceAgent] State change:', state);
          setAgentState(state);
        },
        onText: (text, isFinal) => {
          console.log('[VoiceAgent] onText:', JSON.stringify(text), 'isFinal:', isFinal);
          if (text) {
            if (isFinal) {
              setFinalTranscript(text);
              setInterimTranscript('');
            } else {
              setFinalTranscript(prev => {
                if (prev !== '') setSentenceId(id => id + 1);
                return '';
              });
              setInterimTranscript(text);
            }
          }
          if (isFinal) {
            // Auto-clear 4s after turn ends
            if (clearTranscriptRef.current) clearTimeout(clearTranscriptRef.current);
            clearTranscriptRef.current = setTimeout(() => {
              setFinalTranscript('');
              setInterimTranscript('');
            }, 4000);
          }
        },
        onAudioLevel: (level) => {
          // Smooth the audio level slightly
          setAudioLevel(prev => prev + (level - prev) * 0.4);
        },
        onToolCall: async (toolCall) => {
          if (toolCall.name === 'show_project') {
            const slug = (toolCall.args as any).slug;
            console.log(`Navigating to project: ${slug}`);
            if (onShowProject) onShowProject(slug);
            
            // Return context for the model to narrate
            const context = await fetchProjectContext(slug);
            return { 
              success: true, 
              page: slug,
              contextToNarrate: context 
            };
          }
          
          if (toolCall.name === 'close_project') {
            if (onShowProject) onShowProject(null);
            if (onShowImage) onShowImage(null);
            if (onShowDiagram) onShowDiagram(null);
            return { success: true, page: 'home' };
          }

          if (toolCall.name === 'show_image') {
            const { project, index } = toolCall.args as any;
            console.log(`Showing image for ${project} at index ${index}`);
            const images = (projectImages as any)[project] || (projectImages as any)['default'];
            if (images && images[index]) {
              const imgData = images[index];
              if (onShowImage) onShowImage(imgData);
              
              // Stream the image to Gemini Live Vision
              fetch(imgData.path)
                .then(res => res.blob())
                .then(blob => {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    clientRef.current?.sendImage(base64, blob.type);
                    console.log("Streamed image frame to Gemini Live Vision");
                  };
                  reader.readAsDataURL(blob);
                }).catch(err => console.error("Failed to stream image to model", err));
              
              // Auto-dismiss the image after 10 seconds
              setTimeout(() => {
                if (onShowImage) onShowImage(null);
              }, 10000);
              
              return { success: true, message: `Displayed image: ${imgData.description}` };
            }
            return { success: false, error: 'Image not found' };
          }
          
          if (toolCall.name === 'render_diagram') {
            const { mermaidCode, title } = toolCall.args as any;
            console.log(`Rendering diagram: ${title}`);
            if (onShowDiagram) {
              onShowDiagram({ mermaidCode, title });
              
              // Auto dismiss after 15 seconds
              setTimeout(() => {
                if (onShowDiagram) onShowDiagram(null);
              }, 15000);
            }
            return { success: true, message: `Displayed diagram: ${title}` };
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
        if (onAgentReady) {
          onAgentReady({
            sendText: (text) => client.sendText(text)
          });
        }
      } catch (err) {
        console.error('Failed to start Voice Agent:', err);
        setIsActive(false);
        alert('Failed to connect to Voice Proxy. Is it running on port 8080?');
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center -mb-24 md:-mb-40">
      {/* TurnstileWidget disabled for dev <TurnstileWidget onVerify={setTurnstileToken} action="voice_agent_connect" /> */}
      
      {/* Transcript Display - Portaled to body to escape transform context */}
      {mounted && (finalTranscript || interimTranscript) && isActive && createPortal(
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl text-center z-[200] pointer-events-none flex justify-center items-center">
          <div className="bg-white/70 px-8 py-4 rounded-[2rem] backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] inline-flex items-center min-h-[4rem]">
            <div className={`text-xl md:text-2xl font-medium tracking-tight flex flex-wrap justify-center gap-x-2 transition-all duration-300 ${finalTranscript ? 'text-gray-900' : 'text-gray-500 opacity-80'}`}>
              <BlurText
                key={sentenceId}
                text={finalTranscript || interimTranscript}
                delay={50}
                animateBy="words"
                direction="bottom"
                className="inline-flex flex-wrap justify-center text-center"
              />
              {!interimTranscript && agentState === 'speaking' && (
                <span className="animate-pulse inline-block text-gray-400">...</span>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Levitation Ground Shadow */}
      <div 
        className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] top-0 left-0 bg-black/40 rounded-full blur-2xl pointer-events-none"
        style={{
          transform: `translateY(160px) scaleY(0.25) scaleX(${isActive ? 1.0 + audioLevel * 0.5 : 0.8})`,
          transition: isActive ? 'none' : 'transform 0.5s ease-out'
        }}
      />

      {/* Drop shadow wrapper for the masked orb */}
      <div 
        className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px] transition-all duration-300 z-10"
        style={{
          filter: isActive 
            ? `drop-shadow(0 0 60px rgba(255, 78, 66, ${0.4 + audioLevel}))` 
            : 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.3))'
        }}
      >
        <BubbleMenu open={isMenuOpen} items={menuItems} />

        <button 
          onMouseDown={startPress}
          onMouseUp={endPress}
          onMouseLeave={cancelPress}
          onTouchStart={startPress}
          onTouchEnd={endPress}
          className="w-full h-full group focus:outline-none hover:opacity-90 transition-opacity absolute inset-0 z-[100]"
          style={{
            transform: isActive ? `scale(${1.0 + audioLevel * 0.2})` : 'scale(0.8)',
            transition: isActive ? 'none' : 'transform 0.5s ease-out'
          }}
        >
          <AnomalyOrb audioLevel={audioLevel} />
          {/* Glass overlay — same container, same size, moves together */}
          <FluidGlassLens audioLevel={audioLevel} />
          
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

        {/* Permanent Menu to the right of the orb */}
        {isActive && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-16 flex flex-col gap-3 min-w-[160px] z-[150] animate-in fade-in slide-in-from-left-4 duration-500">
            <h3 className="text-gray-500 text-xs font-bold tracking-widest uppercase mb-2 pl-2">Projects</h3>
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className="group relative flex items-center px-5 py-2.5 bg-white/40 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/80 transition-all text-gray-700 font-medium tracking-wide shadow-sm hover:shadow-md text-sm text-left w-full"
                style={{
                  transitionDelay: `${i * 50}ms`
                }}
              >
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity" 
                  style={{ backgroundColor: item.hoverStyles?.bgColor }} 
                />
                <div 
                  className="w-2 h-2 rounded-full mr-3" 
                  style={{ backgroundColor: item.hoverStyles?.bgColor }} 
                />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
