"use client";

import React, { useState } from 'react';
import VoiceAgent from '@/components/VoiceAgent';
import MovingGrid from '@/components/MovingGrid';
import MermaidDiagram from '@/components/MermaidDiagram';
import { X } from 'lucide-react';

export default function LandingPage5() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<{path: string, description: string} | null>(null);
  const [activeDiagram, setActiveDiagram] = useState<{mermaidCode: string, title: string} | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    // Add a slight delay for the splash effect so the grid renders first
    const timer = setTimeout(() => setIsLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative py-12">
      <MovingGrid />
      
      {/* Embedded Project Iframe */}
      {activeProject && (
        <div className="absolute inset-0 z-50 bg-white animate-in slide-in-from-bottom-8 duration-500">
          {/* Top Navbar */}
          <div className="absolute top-0 left-0 right-0 h-16 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-200/50 flex items-center justify-between px-6 shadow-sm">
            <span className="font-medium text-gray-800 capitalize tracking-wide text-sm">
              {activeProject.replace('-', ' ')}
            </span>
            <button 
              onClick={() => setActiveProject(null)}
              className="bg-black/5 hover:bg-black/10 text-gray-700 p-2 rounded-full transition-colors"
              aria-label="Close project"
            >
              <X size={20} />
            </button>
          </div>
          <div className="w-full h-full pt-16">
            <iframe 
              src={`/work/${activeProject}`} 
              className="w-full h-full border-0" 
              title={`Project ${activeProject}`}
            />
          </div>
        </div>
      )}

      {/* Main Agent UI */}
      <div 
        className={`transition-all duration-[1200ms] ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-50'} ${
          activeProject 
            ? 'fixed max-md:bottom-2 max-md:left-1/2 max-md:-translate-x-1/2 md:bottom-6 md:left-6 z-[60] scale-[0.35] max-md:origin-bottom md:origin-bottom-left' 
            : 'flex-1 flex flex-col items-center justify-center relative w-full z-20 -mt-8 md:-mt-16 ease-[cubic-bezier(0.34,1.56,0.64,1)]'
        }`}
      >
        <VoiceAgent onShowProject={setActiveProject} onShowImage={setActiveImage} onShowDiagram={setActiveDiagram} />
      </div>

      {/* Image Lightbox Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center transition-all duration-700 pointer-events-none ${
          activeImage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeImage && (
          <div className="relative w-full max-w-5xl px-8 flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={activeImage.path} 
              alt={activeImage.description}
              className={`max-h-[75vh] object-contain rounded-2xl shadow-2xl transition-transform duration-700 delay-100 ${
                activeImage ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
              }`}
            />
            <p className="text-white/90 mt-6 text-xl tracking-wide font-medium bg-black/40 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
              {activeImage.description}
            </p>
          </div>
        )}
      </div>

      {/* Diagram Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center transition-all duration-700 pointer-events-none ${
          activeDiagram ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {activeDiagram && (
          <div className={`w-full max-w-5xl px-8 transition-transform duration-700 delay-100 ${activeDiagram ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
            <MermaidDiagram chart={activeDiagram.mermaidCode} title={activeDiagram.title} />
          </div>
        )}
      </div>

      {/* Accessibility Fallback */}
      <div className={`absolute bottom-8 w-full max-w-lg mx-4 flex flex-col items-center z-20 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4 transition-colors font-medium relative z-20 bg-white/50 px-3 py-1 rounded-full"
        >
          {showTextInput ? "Close text input" : "Prefer to type?"}
        </button>

        {showTextInput && (
          <div className="mt-4 w-full bg-white rounded-2xl shadow-xl p-4 border border-gray-200 animate-in fade-in slide-in-from-top-4 duration-300 relative z-20">
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4e42] resize-none text-gray-800 placeholder:text-gray-400"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => {
                  alert("Message saved!");
                  setTextMessage("");
                  setShowTextInput(false);
                }}
                className="px-4 py-2 bg-[#ff4e42] text-white rounded-lg font-medium hover:bg-[#c2362f] transition-colors shadow-sm"
              >
                Save Message
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
