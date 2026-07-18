"use client";

import React from 'react';
import Link from 'next/link';

export default function TheWall() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 tracking-tight">
          The Wall
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
          Leave your mark on the digital wall. Take a picture, write a message, and pin your postcard for everyone to see.
        </p>
        
        <Link 
          href="/postcard" 
          className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center gap-3">
            <span className="text-xl">📷</span> Leave a Postcard
          </span>
        </Link>

        <div className="mt-8 text-sm text-gray-400">
          Join the collection of digital memories
        </div>
      </div>
    </main>
  );
}
