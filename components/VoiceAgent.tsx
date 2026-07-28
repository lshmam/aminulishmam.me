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
import { agentStore } from '@/lib/agent-store';

interface VoiceAgentProps {
  onShowProject?: (slug: string | null) => void;
  onShowImage?: (image: {path: string, description: string} | null) => void;
  onShowDiagram?: (diagram: { mermaidCode: string, title: string } | null) => void;
  onAgentReady?: (agent: { sendText: (text: string) => void; interrupt?: (text?: string) => void }) => void;
  isProjectActive?: boolean;
  initialGreetingPrompt?: string;
}

export default function VoiceAgent({ 
  onShowProject,
  onShowImage,
  onShowDiagram,
  onAgentReady,
  isProjectActive,
  initialGreetingPrompt
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
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('agent-transcript', { 
      detail: { finalTranscript, interimTranscript, agentState } 
    }));
  }, [finalTranscript, interimTranscript, agentState]);

  useEffect(() => { setMounted(true); }, []);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [finalTranscript, interimTranscript]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [textInput, setTextInput] = useState('');
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
      
      const fallback = (projectNarration as any)[slug];
      const narrationScript = fallback ? `\nLoose script for reference:\n${typeof fallback === 'string' ? fallback : JSON.stringify(fallback)}` : '';
      
      // If we failed to extract meaningful text from the client component and have no script, stop hallucination.
      if (cleanText.length < 100 && !narrationScript) {
        return `CRITICAL RULE: The content for ${slug} is currently unavailable. You MUST say exactly: "I'm sorry, but I don't have the script or data for this project yet." Do not make anything up. Do not apologize profusely.`;
      }

      return `
Here is the accurate content for the project ${slug}:
"${cleanText}"${narrationScript}
CRITICAL RULE: Do NOT make up information. Do NOT give a full presentation or monologue. Read the content above and provide ONLY a 1-2 sentence hook, then ask if the user wants to hear more.`;
    } catch (err) {
      console.error("Failed to fetch project context", err);
      return `CRITICAL RULE: Just say you don't have much info on ${slug} and ask what they want to do next. Keep it under 2 sentences.`;
    }
  };

  const handleUIProjectOpen = async (slug: string) => {
    if (onShowProject) onShowProject(slug);
    if (clientRef.current?.isConnected) {
      const context = await fetchProjectContext(slug);
      clientRef.current.interrupt(`I just opened the project page for ${slug}. ${context} Please provide a brief overview of it.`);
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

  useEffect(() => {
    const handleStop = () => {
      if (isActive) {
        // Toggle agent off if it's currently active
        if (clientRef.current) {
          clientRef.current.stop();
          clientRef.current = null;
        }
        setIsActive(false);
        setAgentState('idle');
        setAudioLevel(0);
      }
    };
    return agentStore.onStop(handleStop);
  }, [isActive]);

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
      
      // Play chime FX
      const fx = new Audio('/soundshelfstudio-ui-chime-confirm-567486.mp3');
      fx.volume = 0.6;
      fx.play().catch(err => console.log('Chime fx failed', err));

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
        turnstileToken: turnstileToken || "",
        deepgramKey: dgKey,
        initialGreetingPrompt: initialGreetingPrompt,
        systemInstruction: "You are the voice guide for Aminul's portfolio. You MUST maintain a serious, professional, and formal tone at all times. Greet visitors, offer to show projects / talk about him / just chat. Use tools to navigate and narrate. Keep responses concise, composed, and highly professional.",
        onStateChange: (state) => {
          console.log('[VoiceAgent] State change:', state);
          setAgentState(state);
          agentStore.setSpeaking(state === 'speaking');
        },
        onText: (text, isFinal) => {
          console.log('[VoiceAgent] onText:', JSON.stringify(text), 'isFinal:', isFinal);
          if (text) {
            if (isFinal) {
              setFinalTranscript(prev => prev + (prev ? " " : "") + text);
              setInterimTranscript('');
            } else {
              setInterimTranscript(text);
            }
          }
          if (isFinal) {
            // No auto-clear so the user can scroll through history
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
            console.log(`Closing project page`);
            if (onShowProject) onShowProject(null);
            if (onShowImage) onShowImage(null);
            if (onShowDiagram) onShowDiagram(null);
            return { success: true, page: 'home' };
          } else if (toolCall.name === 'change_project_view') {
            const { sectionIndex, imageIndex } = toolCall.args as any;
            console.log(`Changing project view to section ${sectionIndex}, image ${imageIndex}`);
            window.dispatchEvent(new CustomEvent('project-action', { detail: { sectionIndex, imageIndex } }));
            return { status: "Project view changed." };
          } else if (toolCall.name === 'show_image') {
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
            sendText: (text) => client.sendText(text),
            interrupt: (text) => client.interrupt(text)
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
      
      {/* Removed large portal transcript */}

      {/* Mic Input Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] w-full max-w-md px-6 pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/60 p-2 flex items-center justify-between transition-transform duration-300 hover:scale-[1.02]">
          
          <div className="relative flex-1 h-full flex items-center overflow-hidden">
            {/* Transcript Overlay */}
            {!textInput && (interimTranscript || finalTranscript) && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-end overflow-hidden pl-4 pr-3 mask-image-left">
                 <span className="whitespace-nowrap text-gray-800 font-medium text-right">
                   {interimTranscript || finalTranscript}
                 </span>
              </div>
            )}
            
            <input 
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && textInput.trim()) {
                  const text = textInput.trim();
                  setTextInput(''); // Clear immediately for snappy UI
                  if (!isActive) {
                    await toggleAgent();
                    setTimeout(() => {
                      clientRef.current?.sendText(text);
                    }, 1000);
                  } else {
                    clientRef.current?.sendText(text);
                  }
                }
              }}
              placeholder={isActive ? (agentState === 'speaking' ? 'Agent is speaking...' : 'Listening... or type here') : 'Got Questions...'}
              className={`bg-transparent border-none outline-none text-gray-700 pl-4 pr-2 font-medium flex-1 w-full truncate placeholder:text-gray-400 ${
                !textInput && (interimTranscript || finalTranscript) ? 'text-transparent placeholder:text-transparent' : ''
              }`}
            />
          </div>

          <button 
            onClick={toggleAgent}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
            }`}
          >
            {isActive ? (
              <div className="w-4 h-4 rounded-sm bg-white" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Permanent Menu to the right (if active) */}
      {isActive && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 flex gap-3 min-w-[300px] z-[150] animate-in fade-in slide-in-from-bottom-4 duration-500 flex-wrap justify-center pointer-events-auto">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="group relative flex items-center px-4 py-2 bg-white/80 backdrop-blur-md border border-white/40 rounded-full hover:bg-white transition-all text-gray-700 font-medium tracking-wide shadow-sm hover:shadow-md text-sm"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div 
                className="w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: item.hoverStyles?.bgColor }} 
              />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
