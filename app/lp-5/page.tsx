"use client";

import React, { useState } from 'react';
import VoiceAgent from '@/components/VoiceAgent';
import { X } from 'lucide-react';

export default function LandingPage5() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 overflow-hidden relative py-12">
      
      {/* Embedded Project Iframe */}
      {activeProject && (
        <div className="absolute inset-0 z-50 bg-white animate-in slide-in-from-bottom-8 duration-500">
          <button 
            onClick={() => setActiveProject(null)}
            className="absolute top-6 right-6 z-[60] bg-black/50 hover:bg-black text-white p-3 rounded-full backdrop-blur transition-colors shadow-lg"
          >
            <X size={24} />
          </button>
          <iframe 
            src={`/work/${activeProject}`} 
            className="w-full h-full border-0" 
            title={`Project ${activeProject}`}
          />
        </div>
      )}

      {/* Main Agent UI */}
      <div className={`flex-1 flex flex-col items-center justify-center relative w-full z-20 -mt-8 md:-mt-16 transition-all duration-700 ease-in-out ${activeProject ? 'scale-75 opacity-30 blur-sm pointer-events-none translate-y-[-10%]' : ''}`}>
        <VoiceAgent onShowProject={setActiveProject} />
      </div>

      {/* Accessibility Fallback */}
      <div className="absolute bottom-8 w-full max-w-lg mx-4 flex flex-col items-center z-20">
        <button
          onClick={() => setShowTextInput(!showTextInput)}
          className="text-sm text-gray-500 hover:text-gray-300 underline underline-offset-4 transition-colors"
        >
          {showTextInput ? "Close text input" : "Prefer to type?"}
        </button>

        {showTextInput && (
          <div className="mt-4 w-full bg-gray-900 rounded-2xl shadow-2xl p-4 border border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 p-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4e42] resize-none text-gray-100 placeholder:text-gray-600"
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
