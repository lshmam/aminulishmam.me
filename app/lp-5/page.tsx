"use client";

import React, { useState } from 'react';
import VoiceAgent from '@/components/VoiceAgent';

export default function LandingPage5() {
  const [showTextInput, setShowTextInput] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 overflow-hidden relative py-12">
      <div className="flex-1 flex flex-col items-center justify-center relative w-full z-20 -mt-8 md:-mt-16">
        <VoiceAgent />
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
