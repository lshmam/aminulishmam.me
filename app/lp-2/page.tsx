"use client";

import React from 'react';
import InfiniteMenu from '@/components/InfiniteMenu';
import CardSwap, { Card } from '@/components/CardSwap';
import Dock from '@/components/Dock';
import GradualBlur from '@/components/GradualBlur';
import { Globe } from '@/components/ui/globe';
import { Home, Archive, User, Settings } from 'lucide-react';
import { projects } from '@/lib/projects';

// Map our projects into the format expected by InfiniteMenu, removing title/description
const items = projects.map(p => {
  let video;
  if (p.title === "Jim Coach") video = "/jim-box.mp4";
  if (p.title === "MyTrials") video = "/MyTrials.ai Commercial.mp4";

  return {
    image: p.title === "Neucler" ? "/Frame 79.png" : p.image,
    video,
    link: p.href,
    title: p.title,
    description: ''
  };
});

export default function LandingPage2() {
  const dockItems = [
    { icon: <Home size={18} className="text-white" />, label: 'Home', onClick: () => console.log('Home') },
    { icon: <Archive size={18} className="text-white" />, label: 'Archive', onClick: () => console.log('Archive') },
    { icon: <User size={18} className="text-white" />, label: 'Profile', onClick: () => console.log('Profile') },
    { icon: <Settings size={18} className="text-white" />, label: 'Settings', onClick: () => console.log('Settings') },
  ];

  return (
    <main className="min-h-screen bg-black overflow-x-hidden relative">
      <div className="flex flex-col items-center justify-start pt-24 min-h-screen">
        {/* InfiniteMenu container */}
        <div style={{ height: '600px', width: '100%', position: 'relative' }}>
          <InfiniteMenu items={items} />
        </div>

        {/* CardSwap container */}
        <div className="w-full mt-32 mb-48 flex justify-center relative">
          <CardSwap
            width={400}
            height={300}
            cardDistance={60}
            verticalDistance={70}
            delay={3000}
            pauseOnHover={true}
          >
            {items.map((item, idx) => (
              <Card key={idx} className="overflow-hidden group">
                {item.video ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.image || ''}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold text-white text-center drop-shadow-md">{item.title}</h3>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

        {/* Globe container */}
        <div className="w-full mt-32 mb-48 flex justify-center relative">
          <div className="bg-transparent relative flex w-full h-full max-w-lg items-center justify-center overflow-hidden rounded-lg border px-40 pt-8 pb-40 md:pb-60">
            <span className="pointer-events-none bg-gradient-to-b from-white to-gray-400 bg-clip-text text-center text-8xl leading-none font-semibold whitespace-pre-wrap text-transparent">
              Global
            </span>
            <Globe className="top-28" />
            <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
          </div>
        </div>
      </div>

      <GradualBlur target="page" position="bottom" height="10rem" preset="smooth" zIndex={10} />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]">
        <Dock items={dockItems} />
      </div>
    </main>
  );
}
