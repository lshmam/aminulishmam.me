"use client";

import React, { useState } from 'react';
import ReflectiveCard from '@/components/ReflectiveCard';
import { Camera, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function PostcardPage() {
  const [captured, setCaptured] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#111111] overflow-hidden relative p-8">
      
      {/* Header / Nav */}
      <div className="absolute top-8 left-8">
        <Link href="/lp-4" className="text-gray-400 hover:text-white transition-colors border border-gray-700 bg-black/50 px-4 py-2 rounded-lg text-sm font-medium">
          ← Back to Audio Orb
        </Link>
      </div>

      <div className="text-center mb-12 max-w-lg z-20">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Leave a Postcard</h1>
        <p className="text-gray-400 text-lg">Take a picture and leave it on the wall for others to discover.</p>
      </div>

      {/* The Webcam Card */}
      <div className="relative group z-10">
        <ReflectiveCard
          overlayColor="rgba(0, 0, 0, 0.2)"
          blurStrength={10}
          glassDistortion={15}
          metalness={0.8}
          roughness={0.5}
          displacementStrength={25}
          noiseScale={1.5}
          specularConstant={2.0}
          grayscale={0.5}
          color="#ffffff"
        />
        
        {/* Interaction overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-sm transition-all duration-300 rounded-[20px]">
          <button 
            onClick={() => setCaptured(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-transform active:scale-95 shadow-xl"
          >
            <Camera className="w-5 h-5" /> 
            {captured ? "Retake Picture" : "Capture Moment"}
          </button>
          
          {captured && (
            <button className="mt-4 flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-transform active:scale-95 shadow-xl">
              <ImageIcon className="w-5 h-5" /> Pin to Wall
            </button>
          )}
        </div>
      </div>
      
      {/* Decorative wall text */}
      <div className="absolute bottom-8 text-gray-700 text-sm font-mono tracking-widest uppercase">
        Digital Guestbook — Active
      </div>

    </main>
  );
}
