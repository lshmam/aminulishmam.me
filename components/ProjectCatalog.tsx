"use client";

import React from "react";

const catalogItems = [
  { 
    id: 1, 
    title: "Polar Bear Run", 
    subtitle: "Endless runner mobile game", 
    year: "2019",
    description: "A fast-paced endless runner built for mobile devices, focusing on addictive gameplay loops and simple swipe controls.",
    learned: "Mastered basic game loop mechanics, asset optimization for mobile, and touch-based control systems."
  },
  { 
    id: 2, 
    title: "FoodShare", 
    subtitle: "Community food surplus sharing platform", 
    year: "2019",
    description: "A localized platform connecting individuals and businesses with surplus food to those in need to reduce waste.",
    learned: "Learned the intricacies of building a two-sided marketplace and managing location-based data."
  },
  { 
    id: 3, 
    title: "Ouroboros", 
    subtitle: "Wrist based Oxygen monitor for patients with Covid", 
    year: "2020", 
    link: "https://devpost.com/software/ouroboros-fynt7u", 
    youtube: "https://www.youtube.com/embed/6Q2t_e_E-7U?si=K5vV53Rzsm2dK6Gp",
    description: "A hardware-software integrated wearable designed to monitor blood oxygen levels remotely during the pandemic.",
    learned: "Gained hands-on experience with hardware prototyping, sensor data processing, and real-time alerts."
  },
  { 
    id: 4, 
    title: "FloFinder", 
    subtitle: "Attention management for people with ADHD", 
    year: "2021", 
    link: "https://drive.google.com/file/d/1OpYwh1S-USPLY5Ow20hwGp5815dt58Tr/view?usp=sharing", 
    image: "/BMEG 401 Group 1_page-0001.jpg",
    description: "A digital tool designed to help users with ADHD manage their focus and tasks through structured workflows.",
    learned: "Deepened my understanding of accessible UI design and cognitive load management."
  },
  { 
    id: 5, 
    title: "Aero Fridge", 
    subtitle: "Smart refrigerator for Covid vaccines", 
    year: "2021", 
    image: "/assemblyexploded.PNG",
    description: "An IoT-enabled refrigeration unit ensuring vaccines remain at precise temperatures during transport and storage.",
    learned: "Navigated the complexities of IoT integration and strict regulatory compliance for medical devices."
  },
  { 
    id: 6, 
    title: "Simply Balanced", 
    subtitle: "Tool to track sinus rinses", 
    year: "2022", 
    embed: "https://drive.google.com/file/d/10H6maqXwvUWtRK97kz35E6cylCe6yBgO/preview",
    description: "A specialized health tracker app that helps users maintain consistency with their sinus care routines.",
    learned: "Focused on user retention strategies and building intuitive daily logging interfaces."
  },
  { 
    id: 7, 
    title: "MyTrials", 
    subtitle: "Clinical trial patient matching system", 
    year: "2023", 
    link: "/work/mytrials",
    description: "An AI-driven platform that matches patients to relevant clinical trials based on their medical history.",
    learned: "Tackled complex healthcare data structures and implemented matching algorithms using patient criteria."
  },
  { 
    id: 8, 
    title: "Faeth Studio", 
    subtitle: "Creative design agency portfolio", 
    year: "2024", 
    link: "/work/faeth-studio",
    description: "A visually striking portfolio website designed to showcase a creative agency's high-end projects.",
    learned: "Pushed the boundaries of creative web development, focusing on animations and advanced typography."
  },
  { 
    id: 9, 
    title: "Jim Coach", 
    subtitle: "AI-powered personal fitness trainer", 
    year: "2025", 
    link: "/work/jim-coach",
    description: "An intelligent fitness application that generates dynamic workout plans and provides real-time coaching.",
    learned: "Integrated LLMs for personalized generation and built complex state management for workout tracking."
  },
  { 
    id: 10, 
    title: "Neucler", 
    subtitle: "Sales Copilot for Receptionists", 
    year: "2025 - Present", 
    link: "/work/neucler",
    description: "A specialized CRM and live coaching tool that assists med spa receptionists in closing more bookings.",
    learned: "Learned to build low-latency real-time data pipelines and designed interfaces for high-pressure environments."
  },
  { 
    id: 11, 
    title: "Arrive", 
    subtitle: "AirBnB for parking", 
    year: "2026",
    description: "A marketplace allowing homeowners to rent out their unused driveways and parking spots.",
    learned: "Managed complex booking states, payment gateways, and dual-sided user acquisition strategies."
  },
  { 
    id: 12, 
    title: "Netabridge", 
    subtitle: "B2B Trade Network Marketplace", 
    year: "2026 - Present", 
    link: "/work/neta-bridge",
    description: "A comprehensive platform connecting businesses for wholesale trading and supply chain management.",
    learned: "Architected scalable backend systems capable of handling complex B2B transactions and inventory syncing."
  },
];

export default function ProjectCatalog() {
  return (
    <div className="mt-16 pt-10 border-t border-foreground/10">
      <div className="relative pr-2 sm:pr-4">
        <div className="absolute left-[13px] top-2 bottom-4 w-[1px] bg-foreground/20" />

        <div className="space-y-12 relative pb-4">
          {catalogItems.map((item: any) => (
            <div key={item.id} className="relative pl-12">
              <div
                className="absolute left-[0px] top-[8px] sm:top-[10px] bg-foreground px-2 py-0.5 z-10 shadow-sm rounded"
              >
                <span className="text-[12px] font-bold text-background leading-none block">
                  {item.id}
                </span>
              </div>

              <div className="flex flex-col group cursor-default">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-3">
                  <h3 
                    className="text-foreground text-[22px] sm:text-[26px] font-medium group-hover:text-foreground/80 transition-colors"
                    style={{ fontFamily: "var(--font-tiempos), Georgia, serif" }}
                  >
                    {item.title}
                  </h3>
                  <span className="text-[13px] text-foreground/50 tracking-wider">
                    {item.year}
                  </span>
                </div>
                
                <p className="text-foreground/90 font-medium text-[15px] mb-2 uppercase tracking-wide text-xs">
                  {item.subtitle}
                </p>
                
                <p className="text-foreground/70 text-[15px] leading-[1.7] mb-3 max-w-2xl">
                  {item.description}
                </p>
                
                <div className="bg-foreground/[0.03] border border-foreground/10 p-4 rounded-md mt-2 mb-4 max-w-2xl">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/40 font-medium mb-1.5">What I Learned</p>
                  <p className="text-foreground/70 text-[14px] leading-relaxed">
                    {item.learned}
                  </p>
                </div>

                {item.image && (
                  <div className="mt-2 mb-2 w-full max-w-sm border border-foreground/10 p-1 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply sm:mix-blend-normal bg-white/5 rounded">
                    <img 
                      src={item.image} 
                      alt={`${item.title} Preview`} 
                      className="w-full h-auto grayscale-[15%] rounded-sm"
                    />
                  </div>
                )}

                {item.youtube && (
                  <div className="mt-2 mb-2 w-full max-w-sm aspect-video border border-foreground/10 p-1 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply sm:mix-blend-normal bg-white/5 rounded">
                    <iframe 
                      src={item.youtube} 
                      title={`${item.title} Video`} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      className="w-full h-full grayscale-[15%] rounded-sm"
                    />
                  </div>
                )}

                {item.embed && (
                  <div className="mt-2 mb-2 w-full max-w-sm aspect-video border border-foreground/10 p-1 opacity-90 transition-opacity hover:opacity-100 mix-blend-multiply sm:mix-blend-normal bg-white/5 overflow-hidden rounded">
                    <iframe 
                      src={item.embed} 
                      title={`${item.title} Embed`} 
                      width="100%" 
                      height="100%" 
                      className="w-full h-full grayscale-[15%] pointer-events-none rounded-sm"
                    />
                  </div>
                )}

                {(item.link || item.gbp) && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {item.link && (
                      item.link.startsWith('/work/') ? (
                        <a 
                          href={item.link} 
                          className="inline-flex items-center gap-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 px-4 py-2 text-[12px] font-medium text-foreground transition-all hover:gap-3 group/btn rounded-md"
                        >
                          View Project
                          <span className="text-[14px] leading-none text-foreground/40 group-hover/btn:text-foreground">→</span>
                        </a>
                      ) : (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground text-[13px] underline underline-offset-2 inline-block w-fit mt-2">
                          View project source
                        </a>
                      )
                    )}
                    {item.gbp && (
                      <a href={item.gbp} target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground text-[13px] underline underline-offset-2 inline-block w-fit mt-2">
                        View Google Business Profile
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
